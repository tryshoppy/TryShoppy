/* ============================================================
   TRY SHOPPY — staff-auth.js  (secure replacement for users.js)
   ------------------------------------------------------------
   OLD behaviour (removed): fetched EVERY staff member's PLAINTEXT
   password into the browser on page load — before anyone even
   attempted to log in. Anyone who opened the dashboard, or anyone
   who called the old Apps Script URL directly, could read every
   staff password in clear text.

   NEW behaviour: the browser only ever sends a username + password
   guess and gets back { success, label } — nothing else. The actual
   password list never leaves the Google Apps Script backend. Login
   is verified server-side with a salted SHA-256 hash, exactly like
   customer login on the main site (backend/Users_Code.gs), plus a
   brute-force lockout after repeated failed attempts.

   See backend/Staff_Code.gs + backend/STAFF_SETUP.md.
   ============================================================ */

// ⚠️ Paste your Staff Apps Script /exec URL here after deploying
// backend/Staff_Code.gs as its own Web App (see STAFF_SETUP.md).
const STAFF_API_URL = "https://script.google.com/macros/s/AKfycbz613_2eEW_pWZStczWC-wKAzVXBzvTbUWGpHyb-I3bWhqrf4JEojwTWuljHJk2mdfKZg/exec";

function tsStaffApi(payload) {
  return fetch(STAFF_API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  }).then(res => res.json());
}

/**
 * Verifies a username + password against the server.
 * Resolves to { success:true, label } on success, or
 * { success:false, message, code? } on failure.
 * Never resolves with any password/hash data.
 */
function tsStaffLogin(username, password) {
  return tsStaffApi({ action: "login", username, password }).then(res => {
    // 🔑 الأدوات المسموحة بتتحفظ مع الجلسة — كل صفحة بتتأكد منها قبل
    // ما تفتح (tsGateTool تحت). الحماية الحقيقية في السيرفر: التوكن
    // نفسه فيه نفس القايمة موقّعة، والسيرفر بيرفض أي نداء برّاها.
    if (res && res.success) {
      try { localStorage.setItem("staffTools", JSON.stringify(res.tools || [])); } catch (e) {}
    } else if (res && res.code === "noTools") {
      // الباسورد صح بس الحساب مالوش ولا أداة — الصفحات بتعرض "باسورد غلط"
      // لأي فشل، فبنوضح السبب الحقيقي هنا مرة واحدة
      alert("🔒 " + res.message);
    }
    return res;
  });
}

/* ═══════════════════════════════════════════════════════════
   🔑 صلاحيات الأدوات — نفس مفاتيح TOOLS في Staff_Code.gs
   ═══════════════════════════════════════════════════════════ */
const TS_TOOL_NAMES = {
  dash945: "لوحة الطلبات والحسابات (945)", dashMob: "لوحة الطلبات (موبايل)",
  quickOrder: "إضافة أوردر لعميل سابق", directOrder: "تسجيل طلب مباشر",
  customerRef: "مرجع طلبات العملاء", courier: "أداة المندوب",
  calculatorOP: "حاسبة التشغيل", rama: "RAMA", mart: "إدارة المارت",
  expenses: "المصروفات (OPEX)"
};

function tsStaffTools() {
  try { return JSON.parse(localStorage.getItem("staffTools") || "[]"); } catch (e) { return []; }
}
function tsHasTool(key) { return tsStaffTools().indexOf(key) !== -1; }

/** بتتنادى أول ما الصفحة تتأكد إن فيه جلسة. لو الموظف مالوش الأداة دي،
 *  بتغطي الصفحة برسالة واضحة (بدل ما تفتح وكل حاجة تفشل) وترجع true.
 *  جلسة قديمة من قبل نظام الصلاحيات (مفيش staffTools خالص) → بنطلب
 *  دخول تاني عشان ياخد توكن جديد بصلاحياته. */
function tsGateTool(key) {
  if (localStorage.getItem("staffToken") && localStorage.getItem("staffTools") === null) {
    ["currentUser", "currentUserLabel", "loginTime", "staffToken", "isAdmin"].forEach(k => localStorage.removeItem(k));
    location.reload();
    return true;
  }
  if (tsHasTool(key)) return false;
  const old = document.getElementById("tsNoToolGate");
  if (old) old.remove();
  const mine = tsStaffTools().map(k => TS_TOOL_NAMES[k]).filter(Boolean);
  const box = document.createElement("div");
  box.id = "tsNoToolGate";
  box.setAttribute("dir", "rtl");
  box.style.cssText = "position:fixed;inset:0;z-index:99999;background:#101B33;display:flex;align-items:center;justify-content:center;padding:20px;font-family:Cairo,Tahoma,sans-serif";
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  box.innerHTML =
    '<div style="background:#fff;border-radius:20px;padding:28px 22px;max-width:400px;width:100%;text-align:center">' +
      '<div style="font-size:44px">🔒</div>' +
      '<div style="font-size:19px;font-weight:900;color:#101B33;margin-top:8px">مالكش صلاحية على الأداة دي</div>' +
      '<div style="font-size:14px;color:#5A6885;margin-top:6px;line-height:1.7">«' + esc(TS_TOOL_NAMES[key] || key) + '» مش مفتوحة لحسابك (' +
        esc(localStorage.getItem("currentUserLabel") || "") + '). لو محتاجها، الأدمن يحط ✓ قدام اسمك في شيت الموظفين.</div>' +
      (mine.length ? '<div style="font-size:12.5px;color:#5A6885;background:#F4F6FB;border-radius:12px;padding:10px;margin-top:14px;line-height:1.8"><b style="color:#101B33">أدواتك:</b> ' + mine.map(esc).join(" · ") + '</div>' : '') +
      '<div style="display:grid;gap:8px;margin-top:18px">' +
        '<a href="Operation.html" style="background:#F5B820;color:#101B33;border-radius:12px;padding:12px;font-weight:900;text-decoration:none">← رجوع للأدوات</a>' +
        '<button id="tsGateOut" style="background:#EEF2F8;color:#5A6885;border:0;border-radius:12px;padding:12px;font:inherit;font-weight:800;cursor:pointer">دخول بحساب تاني</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(box);
  document.getElementById("tsGateOut").onclick = () => {
    ["currentUser", "currentUserLabel", "loginTime", "staffToken", "isAdmin", "staffTools"].forEach(k => localStorage.removeItem(k));
    location.reload();
  };
  return true;
}

/**
 * Safe staff directory — usernames + display names ONLY, no
 * credentials. Used to populate "responsible employee" dropdowns
 * and the "hide order from employee" list.
 * Resolves to an array like [{ username, label }, ...].
 *
 * 🐛→✅ كانت بتتعمل بـ POST، وردود الـ POST في Apps Script بتعدي على
 * ريديركت لدومين تاني (googleusercontent/echo) — بطيء جدًا وأحيانًا
 * بيرجع 404، فكانت القائمة بتفضل "جاري التحميل..." وقت طويل أو تفضل
 * فاضية خالص. دلوقتي:
 *   1) GET بدل POST (بيرجع 200 مباشرة وأسرع بكتير)
 *   2) كاش في localStorage لمدة 12 ساعة — يعني بعد أول تحميل، القائمة
 *      بتظهر **فورًا** من غير أي انتظار شبكة، وبتتحدّث في الخلفية.
 * قايمة أسماء الموظفين مش بيانات حساسة ولا بتتغيّر كل شوية، فالكاش
 * هنا آمن تمامًا (مفيش أي باسورد أو صلاحيات جواها).
 */
const TS_STAFF_CACHE_KEY = "ts_staff_dir";
const TS_STAFF_CACHE_TTL = 12 * 60 * 60 * 1000; // 12 ساعة

function tsReadStaffCache() {
  try {
    const raw = localStorage.getItem(TS_STAFF_CACHE_KEY);
    if (!raw) return null;
    const cached = JSON.parse(raw);
    if (!cached || !Array.isArray(cached.staff)) return null;
    if (Date.now() - (cached.at || 0) > TS_STAFF_CACHE_TTL) return null;
    return cached.staff;
  } catch (e) { return null; }
}

function tsCacheStaff(staff) {
  if (staff && staff.length) {
    try {
      localStorage.setItem(TS_STAFF_CACHE_KEY, JSON.stringify({ at: Date.now(), staff: staff }));
    } catch (e) { /* localStorage مليان أو متعطل — مش مشكلة، هنجيبها من الشبكة تاني */ }
  }
  return staff || [];
}

function tsFetchStaffFromServer() {
  return fetch(STAFF_API_URL + "?action=listStaff")
    .then(res => res.json())
    .then(res => {
      const staff = (res && res.staff) || [];
      // 🛟 لو السيرفر لسه بالنسخة القديمة (قبل ما تعيد نشر Staff_Code.gs
      // بدعم GET)، الـ GET هيرجع {status:"ok"} من غير staff — وقتها
      // بنرجع للطريقة القديمة (POST) عشان القائمة متفضلش فاضية.
      if (!staff.length) {
        return tsStaffApi({ action: "listStaff" }).then(r => tsCacheStaff((r && r.staff) || []));
      }
      return tsCacheStaff(staff);
    });
}

function tsListStaff() {
  const cached = tsReadStaffCache();
  if (cached) {
    // تحديث صامت في الخلفية عشان أي موظف جديد يبان في المرة الجاية،
    // من غير ما نأخّر المستخدم دلوقتي خالص
    tsFetchStaffFromServer().catch(() => {});
    return Promise.resolve(cached);
  }
  return tsFetchStaffFromServer().catch(() => []);
}
