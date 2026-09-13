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
const STAFF_API_URL = "https://script.google.com/macros/s/AKfycbw6OmnaJswT0CM1b8DcZ7pHuQefCIc-XT7y5mS8B7Sn19DjYOm4VRvc7Wl1-GsB9VhUpQ/exec";

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
  return tsStaffApi({ action: "login", username, password });
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
