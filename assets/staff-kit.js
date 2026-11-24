/* =========================================================
   TRY SHOPPY — staff-kit.js  (يتحمّل قبل staff-auth.js)
   ---------------------------------------------------------
   1) جلسة واحدة لأدوات الموظفين: الدخول مرة واحدة يفتح أدوات
      الطلبات و RAMA مع بعض، والخروج من أي أداة = خروج من الكل.
   2) إشعار داخل الصفحة بدل نافذة alert بتاعة المتصفح.

   مفيش أي نداء للسيرفر هنا ولا أي تغيير في التحقق: التوكن هو
   نفس التوكن اللي السيرفر مدّيه، والسيرفر هو اللي بيقبله أو
   يرفضه في كل طلب زي ما هو. الملف ده لو اتشال كل حاجة ترجع
   تشتغل بالطريقة القديمة (دخول لكل أداة + alert).
   ========================================================= */
(function () {
  "use strict";

  /* ───────────── 1) الجلسة الموحّدة ─────────────
     تلات مجموعات مفاتيح كانت منفصلة في المتصفح:
       الطلبات:        staffToken / loginTime / currentUser / currentUserLabel / isAdmin
       RAMA:           rmaStaffToken / rmaLoginTime / rmaStaffUser
       مرجع العملاء:    crefStaffToken / crefLoginTime / crefUser / crefUserLabel
     بناخد أحدث جلسة صالحة وننسخها لمفاتيح الطلبات و RAMA.
     ⚠️ مرجع العملاء مابننسخلوش جلسة من برّه: دخوله فيه تحقق تاني
     (صلاحية المارت) ولازم يفضل زي ما هو. لكن اللي يدخل منه
     يبقى داخل باقي الأدوات. إدارة المارت برضه بدخولها الخاص. */
  try {
    var LS = window.localStorage, DAY = 24 * 60 * 60 * 1000, now = Date.now();
    var rawRemove = Storage.prototype.removeItem;
    var g = function (k) { return LS.getItem(k) || ""; };
    var live = function (s) { var t = +s.t || 0; return !!(s.tok && s.u && t > 0 && now - t < DAY); };

    var main = { tok: g("staffToken"), t: g("loginTime"), u: g("currentUser"), l: g("currentUserLabel") };
    var rma  = { tok: g("rmaStaffToken"), t: g("rmaLoginTime"), u: g("rmaStaffUser"), l: "" };
    var cref = { tok: g("crefStaffToken"), t: g("crefLoginTime"), u: g("crefUser"), l: g("crefUserLabel") };

    var best = [main, rma, cref].filter(live).sort(function (a, b) { return (+b.t) - (+a.t); })[0];
    if (best) {
      var user = String(best.u).toLowerCase();
      var label = best.l || (String(main.u).toLowerCase() === user && main.l) || (String(cref.u).toLowerCase() === user && cref.l) || best.u;
      if (main.tok !== best.tok) {
        LS.setItem("staffToken", best.tok);
        LS.setItem("loginTime", String(best.t));
        LS.setItem("currentUser", user);
        LS.setItem("currentUserLabel", label);
        /* الأدمن بيتقري من التوكن الموقّع نفسه (زي بوابة الأدوات) — مش تخمين */
        var admin = "0";
        try {
          var p = JSON.parse(atob(best.tok.split(".")[0].replace(/-/g, "+").replace(/_/g, "/")));
          if (p && p.admin) admin = "1";
        } catch (e) {}
        LS.setItem("isAdmin", admin);
      }
      if (rma.tok !== best.tok) {
        LS.setItem("rmaStaffToken", best.tok);
        LS.setItem("rmaLoginTime", String(best.t));
        LS.setItem("rmaStaffUser", user);
      }
    }

    /* الخروج من أي أداة = خروج من الكل (وإلا الجلسة هترجع تتنسخ تاني) */
    var TOKENS = ["staffToken", "rmaStaffToken", "crefStaffToken"];
    var ALL = ["staffToken", "loginTime", "currentUser", "currentUserLabel", "isAdmin",
               "rmaStaffToken", "rmaLoginTime", "rmaStaffUser",
               "crefStaffToken", "crefLoginTime", "crefUser", "crefUserLabel"];
    Storage.prototype.removeItem = function (k) {
      rawRemove.call(this, k);
      if (this === LS && TOKENS.indexOf(k) !== -1) {
        for (var i = 0; i < ALL.length; i++) { try { rawRemove.call(LS, ALL[i]); } catch (e) {} }
      }
    };
  } catch (e) { /* التخزين مقفول (وضع خاص مثلاً) — كل أداة تطلب دخولها زي الأول */ }

  /* ───────────── 2) إشعار بدل alert ─────────────
     ✅ نجاح: يختفي بعد 4 ثواني.  غير كده: يفضل لحد ما يتقفل (زي
     alert كان لازم تدوس OK)، بس من غير ما يوقف الصفحة.
     لو الصفحة اتحمّلت تاني بعد الرسالة على طول (خروج/تحديث)
     الرسالة بتظهر تاني بعد التحميل عشان ماتضيعش.
     confirm و prompt زي ما هم — دول محتاجين رد قبل ما الكود يكمل. */
  var KEY = "ts_last_notice";
  function box() {
    var b = document.getElementById("tsNotices");
    if (!b) {
      b = document.createElement("div");
      b.id = "tsNotices";
      b.setAttribute("dir", "rtl");
      b.setAttribute("role", "status");
      b.setAttribute("aria-live", "polite");
      /* تحت الشاشة — عشان ماتغطيش الشريط العلوي وأزرار الفلاتر */
      b.style.cssText = "position:fixed;bottom:14px;left:12px;right:12px;z-index:100000;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none";
      (document.body || document.documentElement).appendChild(b);
    }
    return b;
  }
  function show(msg) {
    msg = String(msg == null ? "" : msg);
    var ok = /^\s*(✅|🎉|✔)/.test(msg);
    var bad = /❌|⛔|🚫|خطأ|تعذ|فشل/.test(msg);   /* ⚠️ و🔒 تنبيه (ذهبي) — الأحمر للخطأ بس */
    var el = document.createElement("div");
    el.style.cssText = "pointer-events:auto;max-width:520px;width:100%;display:flex;gap:10px;align-items:flex-start;" +
      "background:#fff;color:#101B33;border-radius:14px;padding:12px 14px;" +
      "font-family:Cairo,Tahoma,sans-serif;font-size:14.5px;font-weight:700;line-height:1.7;" +
      "box-shadow:0 12px 34px rgba(16,27,51,.22);border:1px solid #DCE2EE;border-inline-start:6px solid " +
      (ok ? "#087F58" : bad ? "#C81E1E" : "#F5B820");
    var t = document.createElement("div");
    t.style.cssText = "flex:1;min-width:0;white-space:pre-wrap;overflow-wrap:anywhere;max-height:38vh;overflow:auto";
    t.textContent = msg;
    var x = document.createElement("button");
    x.type = "button";
    x.setAttribute("aria-label", "إغلاق");
    x.textContent = "✕";
    x.style.cssText = "flex:none;width:36px;height:36px;min-height:36px;border:0;border-radius:10px;background:#EEF2F8;color:#101B33;" +
      "font-size:15px;font-weight:900;cursor:pointer;padding:0";
    var close = function () { if (el.parentNode) el.parentNode.removeChild(el); };
    x.onclick = close;
    el.appendChild(t); el.appendChild(x);
    var b = box();
    while (b.children.length >= 3) b.removeChild(b.firstChild);
    b.appendChild(el);
    if (ok) setTimeout(close, 4000);
  }
  function notify(msg) {
    try { sessionStorage.setItem(KEY, JSON.stringify({ m: String(msg), t: Date.now() })); } catch (e) {}
    if (document.body) show(msg);
    else document.addEventListener("DOMContentLoaded", function () { show(msg); });
  }
  window.tsNotify = notify;
  window.alert = notify;

  /* رسالة اتعرضت والصفحة اتحمّلت بعدها في أقل من 3 ثواني → نعرضها تاني مرة واحدة */
  try {
    var last = JSON.parse(sessionStorage.getItem(KEY) || "null");
    sessionStorage.removeItem(KEY);
    if (last && last.m && Date.now() - last.t < 3000) {
      var again = function () { show(last.m); };
      if (document.body) again(); else document.addEventListener("DOMContentLoaded", again);
    }
  } catch (e) {}
})();
