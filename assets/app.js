/* =========================================================
   TRY SHOPPY — shared app logic
   ========================================================= */

/* ---------- 🔒 حماية الأزرار من الضغط المزدوج ----------
   أي زرار بينتظر رد من السيرفر (Place Order, تسجيل دخول,
   تحديث حالة, حفظ, حذف...) لازم يستخدم الزوج ده:
     tsSetBtnLoading(btn, 'جاري التأكيد...')   ← أول ما تبدأ العملية
     tsClearBtnLoading(btn)                     ← في finally بعد ما تخلص
   بيقفل الزرار فعليًا (disabled) عشان مستحيل يتضغط تاني، وبيورّي
   دايرة بتلف + نص مناسب للموقف، ويرجّع شكله الأصلي تلقائيًا. */
function tsSetBtnLoading(btn, loadingText){
  if(!btn || btn.dataset.tsLoading === '1') return;
  btn.dataset.tsLoading = '1';
  btn.dataset.tsOriginalHtml = btn.innerHTML;
  if(btn.offsetWidth) btn.style.minWidth = btn.offsetWidth + 'px'; // يمنع تقلّص عرض الزرار وقفزه
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');
  btn.innerHTML = '<span class="ts-spinner"></span><span>' + (loadingText || 'جاري المعالجة...') + '</span>';
}
function tsClearBtnLoading(btn){
  if(!btn || btn.dataset.tsLoading !== '1') return;
  btn.disabled = false;
  btn.removeAttribute('aria-busy');
  btn.innerHTML = btn.dataset.tsOriginalHtml || btn.innerHTML;
  btn.style.minWidth = '';
  delete btn.dataset.tsLoading;
  delete btn.dataset.tsOriginalHtml;
}
/* حقن CSS الدايرة الدوّارة مرة واحدة بس — بيشتغل في أي صفحة بغض
   النظر عن الـ stylesheet بتاعها، ولونه بياخد currentColor عشان
   يتماشى تلقائيًا مع أي زرار (خلفية غامقة أو فاتحة). */
(function tsInjectSpinnerCss(){
  if(document.getElementById('ts-spinner-css')) return;
  const s = document.createElement('style');
  s.id = 'ts-spinner-css';
  s.textContent =
    '.ts-spinner{display:inline-block;width:13px;height:13px;border:2.5px solid currentColor;' +
    'border-top-color:transparent;border-radius:50%;opacity:.85;animation:ts-spin .7s linear infinite;' +
    'vertical-align:middle;margin-left:7px;margin-right:2px;}' +
    '@keyframes ts-spin{to{transform:rotate(360deg);}}' +
    'button:disabled,.btn:disabled{cursor:not-allowed;opacity:.85;}';
  document.head.appendChild(s);
})();

/* ---------- 🔒 تنضيف نص قبل حقنه في innerHTML ----------
   أي بيانات جاية من طلب/عميل (اسم، رابط منتج، عنوان...) بتتخزن
   في الشيت زي ما العميل كتبها بالظبط — لو حد كتب فيها HTML/JS
   بالغلط أو عمدًا، وصفحة زي track.html أو الداشبوردات بتحقنها
   في innerHTML من غير تنضيف، ده بيفتح باب XSS (كود بيتنفذ في
   متصفح أي حد يشوف الطلب ده، حتى لو مش مسجل دخول). استخدم الدالة
   دي على أي قيمة نصية جاية من السيرفر قبل ما تدخل innerHTML. */
function tsEscapeHtml(v){
  return String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
}
/* رابط منتج آمن للاستخدام في href — بيرفض أي حاجة غير http(s)
   (زي javascript: أو data:) عشان الضغط على "رابط المنتج" ميقدرش
   ينفّذ كود، ويهرب أي quotes جوه الرابط نفسه. */
function tsSafeHref(url){
  const u = String(url || '').trim();
  return /^https?:\/\//i.test(u) ? tsEscapeHtml(u) : '#';
}
/* 🔒 نفس فكرة tsEscapeHtml، بس مخصصة للقيم اللي بتتحط جوه
   onclick="fn('${value}')" (زي printLabel(phone, order) في
   Dashboard945/DashboardMob2) — سياق مزدوج: نص JS جوه quotes
   واحدة، والكل ده جوه attribute بـ quotes مزدوجة. من غير الهروب
   الصحيح هنا، رقم موبايل أو رقم طلب فيه ' يقدر يكسر الـ onclick
   ويحقن جافاسكريبت تعسفي في متصفح الموظف (ولو التوكن بتاعه في
   localStorage وقتها، يبقى ممكن يتسرق). بنهرب الـ JS string الأول
   (backslash وquote مفردة)، وبعدين نهرب الـ HTML attribute. */
function tsJsAttr(v){
  const s = String(v == null ? '' : v).replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/[\r\n]/g, '');
  return tsEscapeHtml(s);
}

/* 🖨️ فتح صفحة HTML جاهزة (بوليصة/فاتورة) في تاب جديد — بديل
   window.open('', '_blank') + document.write(). النمط القديم ده
   بيفشل بـ"Unsafe attempt to load URL ... file: URLs are treated
   as unique security origins" لو الموقع اتفتح كملف محلي (file://)
   بدل سيرفر حقيقي: window.open('', ...) بيتحل كـ"نفس رابط الصفحة
   الحالية" (نص فاضي = بدون تغيير في الـURL)، فمتصفح Chrome بيرفضه
   كمحاولة تحميل غير آمنة. رابط Blob بيشتغل بنفس الشكل تمامًا على
   السيرفر الحقيقي وعلى file:// كمان، فمفيش داعي نغيّر سلوك حقيقي
   عشان نصلّح مشكلة اختبار محلي بس. */
function tsOpenHtmlDoc(html){
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if(win){
    win.addEventListener('load', () => URL.revokeObjectURL(url));
  } else {
    URL.revokeObjectURL(url); // اتحجب (popup blocker) — مفيش داعي نسيب الـ blob في الذاكرة
  }
  return win;
}

/* ═══════════════════════════════════════════════════════════
   📱 رسائل واتساب — قالب موحّد لكل الموقع
   ═══════════════════════════════════════════════════════════
   كانت فيه 9 رسائل واتساب متفرقة في 5 ملفات، كل واحدة بشكل
   وترتيب مختلف — بعضها إنجليزي وبعضها عربي، وبعضها ناقصه سعر
   القطعة أو المواصفات أو موعد الوصول. العميل ممكن يستقبل رسالتين
   من موظفين مختلفين فيبانوا كأنهم من شركتين.

   كل الرسائل دلوقتي بتتبني من هنا، فأي تعديل في الشكل بيطبق على
   التسعة مرة واحدة ومستحيل يختلفوا تاني.

   كل صنف بيعرض دايمًا: رقم الطلب · المنتج · العدد · سعر القطعة ·
   إجمالي القطعة · موعد الوصول. والمواصفات والحالة بيظهروا لو
   ليهم قيمة بس.

   التنسيق بـ *نجمة* = خط عريض في واتساب. الإيموجي محصور في
   العناوين والمراسي بس، مش على كل سطر — عشان الرسالة تفضل
   مقروءة ومريحة للعين مهما كان عدد الأصناف.
   ═══════════════════════════════════════════════════════════ */

const TS_TRACK_URL = 'https://try-shoppy.com/track.html';
const TS_WA_RULE = '━━━━━━━━━━━━━━━';

/* 🌐 لغة رسالة الواتساب
   ---------------------------------------------------------------
   🐛→✅ كل الرسائل كانت عربي بس — العميل اللي بيتعامل إنجليزي كان بيبعت
   للشركة رسالة عربي متجهزة باسمه، وبيستقبل من المندوب والموظفين عربي.
   دلوقتي كل رسالة ليها lang:
     • رسايل العميل من الموقع  → لغة الموقع وقتها (TS_LANG)
     • رسايل الموظفين للعميل   → لغة العميل المتسجلة مع طلبه (عمود lang)
   tsWaLang بيوحّد أي قيمة لـ 'en' أو 'ar' (الفاضي = عربي). */
function tsWaLang(v){ return String(v || '').trim().toLowerCase() === 'en' ? 'en' : 'ar'; }
const TS_WA_TXT = {
  ar: { item:'منتج', product:'الصنف', qty:'العدد', unit:'سعر القطعة', line:'إجمالي القطعة', specs:'المواصفات',
        arrival:'موعد الوصول', arrivalTbd:'يتم تحديده بعد تأكيد الطلب', status:'الحالة', total:'الإجمالي الكلي',
        paid:'المدفوع مقدمًا', due:'المطلوب عند الاستلام', name:'الاسم', phone:'الموبايل', gov:'المحافظة', addr:'العنوان',
        hiCust:n => 'السلام عليكم ' + (n ? 'أ/ ' + n : 'حضرتك') + ' 👋', registered:'تم تسجيل طلبك في Try Shoppy ✅',
        newOrder:'🛒 طلب جديد — Try Shoppy', track:'تابع طلبك في أي وقت من هنا:', anyQ:'لأي استفسار إحنا معاك 🙏',
        waiting:'مستني تأكيدكم 🙏', cur:' ج.م' },
  en: { item:'Item', product:'Product', qty:'Qty', unit:'Unit price', line:'Line total', specs:'Details',
        arrival:'Expected arrival', arrivalTbd:'set once the order is confirmed', status:'Status', total:'Grand total',
        paid:'Paid in advance', due:'Due on delivery', name:'Name', phone:'Phone', gov:'Governorate', addr:'Address',
        hiCust:n => 'Hi ' + (n || 'there') + ' 👋', registered:'Your Try Shoppy order has been registered ✅',
        newOrder:'🛒 New order — Try Shoppy', track:'Track your order anytime here:', anyQ:"We're here if you have any questions 🙏",
        waiting:'Looking forward to your confirmation 🙏', cur:' EGP' }
};
function tsWaT(lang){ return TS_WA_TXT[tsWaLang(lang)]; }

/* رقم بصيغة العملة المصرية (ج.م بالعربي / EGP بالإنجليزي) */
function tsWaMoney(v, lang){
  const n = parseFloat(v) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + tsWaT(lang).cur;
}

/* موعد الوصول بيتقرا من الشيت (عمود arrivaldate). وقت إنشاء الطلب
   الموعد لسه مش موجود — الطلب بيبقى "قيد المراجعة" — فبنكتب
   للعميل الحقيقة بدل ما نسيب السطر فاضي أو نخترع تاريخ.
   🆕 بيتكتب بشكل مفهوم (27 سبتمبر 2026 / 27 Sep 2026) مش O-27SEP2026 */
function tsWaArrival(date, lang){
  const d = String(date == null ? '' : date).trim();
  return d ? tsFormatArrival(d, tsWaLang(lang)) : tsWaT(lang).arrivalTbd;
}

/* 🚦 حالة الطلب بالعربي.
   ---------------------------------------------------------------
   نفس الصياغة المستخدمة في صفحة التتبع (track.html) بالحرف —
   العميل بيشوف نفس الكلام في رسالة الواتساب وفي الصفحة لما يتابع
   بالرقم، فمايحصلش لخبطة إن "Placed" في مكان و"تم الطلب" في مكان
   تاني. أي حالة مش في القائمة بتتعرض زي ما هي من غير ما تختفي. */
const TS_STATUS_AR = {
  'Pending Review':   'قيد المراجعة',
  'Confirmed Via Try':'تم التأكيد',
  'Processing':       'جاري التجهيز',
  'Placed':           'تم الطلب',
  'Arrived USA HUB':  'وصل مخزن أمريكا',
  'In transit':       'في الشحن الدولي',
  'Arrived Cairo HUB':'وصل القاهرة',
  'Shipped To You':   'في الطريق إليك',
  'Delivered':        'تم التسليم',
  'On Hold':          'معلّق مؤقتًا',
  'Delayed':          'متأخر',
  'Canceled':         'ملغي',
  'Returned':         'مرتجع',
  'Lost':             'مفقود'
};
/* نفس الحالات بصياغة إنجليزي مفهومة للعميل (مش أسماء الشيت الداخلية) */
const TS_STATUS_EN = {
  'Pending Review':'Under review', 'Confirmed Via Try':'Confirmed', 'Processing':'Processing',
  'Placed':'Purchased from the store', 'Arrived USA HUB':'At our USA hub', 'In transit':'On its way to Egypt',
  'Arrived Cairo HUB':'Arrived in Cairo', 'Shipped To You':'Out for delivery', 'Delivered':'Delivered',
  'On Hold':'On hold', 'Delayed':'Delayed', 'Canceled':'Canceled', 'Returned':'Returned', 'Lost':'Lost'
};
function tsStatusLabel(s, lang){
  const k = String(s == null ? '' : s).trim();
  if(!k) return '';
  if(tsWaLang(lang) === 'en') return TS_STATUS_EN[k] || k;
  return TS_STATUS_AR[k] || k;
}

/* ═══════════════════════════════════════════════════════════
   📋 قائمة الحالات الرسمية — مصدر واحد لكل قوائم الحالات
   ═══════════════════════════════════════════════════════════
   ⚠️ لازم تطابق قائمة الـ dropdown في Sheet2 في شيت الطلبات
   **حرف بحرف** (In transit بحرف t صغير، On Hold بـ H كبير) —
   الكود بيقارن النص بالظبط.

   الترتيب = مسار الطلب الطبيعي، وبعده حالات الاستثناء.

   🐛 ليه مصدر واحد؟ قوائم الحالات كانت مكتوبة بإيد في كل داشبورد،
   وأي حالة مش في القائمة كانت بتخلّي الـ <select> يختار أول اختيار
   (Pending Review) تلقائيًا — فلو الموظف داس "حفظ" على الكارت
   (حتى عشان يغيّر موعد الوصول بس) الحالة كانت بتترجع Pending Review
   في الشيت من غير ما ياخد باله. tsStatusOptionsHtml تحت بتمنع ده. */
const TS_STATUSES = [
  'Pending Review', 'Confirmed Via Try', 'Processing', 'Placed',
  'Arrived USA HUB', 'In transit', 'Arrived Cairo HUB', 'Shipped To You', 'Delivered',
  'On Hold', 'Delayed', 'Canceled', 'Returned', 'Lost'
];

/* الحالات "المقفولة" — الطلب خلص (اتسلّم أو مش هيكمل). بتتستبعد من
   ملخص الطلبات غير المستلمة ومن "طلباتك المفتوحة" في التتبع.
   On Hold و Delayed **مش** منها — الطلب لسه شغال، بس متعطّل. */
const TS_CLOSED_STATUSES = ['Delivered', 'Canceled', 'Returned', 'Lost'];
function tsIsClosedStatus(s){ return TS_CLOSED_STATUSES.indexOf(String(s == null ? '' : s).trim()) !== -1; }

/* ═══════════════════════════════════════════════════════════
   📝 ملاحظة الحالة (عمود statusNote) — للمعلّق والمفقود
   ═══════════════════════════════════════════════════════════
   لما الموظف يحوّل طلب لـ On Hold أو Lost، بتظهر ويندو يكتب فيها
   السبب أو المطلوب من العميل. الملاحظة بتظهر للعميل في صفحة التتبع
   (والإيميل في حالة On Hold)، وفي التقرير اليومي للفريق.

   الملاحظة بتفضل في العمود بعد ما الطلب يكمل، فبتتعرض **بس** مع
   الحالتين دول (نفس STATUS_NOTE_STATUSES في Orders_Code.gs). */
const TS_NOTE_STATUSES = ['On Hold', 'Lost'];

/** محتاج نسأل؟ بس لما الحالة **بتتحوّل** لواحدة منهم — لو الطلب أصلاً
 *  On Hold والموظف بيحفظ الكارت عشان يغيّر موعد الوصول، مانزعجوش. */
function tsNeedsStatusNote(newStatus, oldStatus){
  return TS_NOTE_STATUSES.indexOf(newStatus) !== -1 && String(newStatus) !== String(oldStatus || '');
}

const TS_NOTE_SUGGESTIONS = {
  'On Hold': ['محتاجين تأكيد المقاس أو اللون قبل الشراء', 'محتاجين تحويل العربون عشان نكمل الطلب',
              'المنتج مش متاح حاليًا في المتجر — بنشوف بديل', 'محتاجين تأكيد العنوان أو رقم التواصل'],
  'Lost':    ['شركة الشحن بلّغت إن الطرد مفقود وبنتابع معاهم', 'الشحنة متأخرة عند شركة الشحن وبنتابعها']
};

/** بتفتح الويندو وترجّع Promise: النص اللي اتكتب، أو null لو الموظف لغى
 *  (وساعتها الحفظ كله بيتلغي — مفيش طلب يتحوّل معلّق من غير سبب). */
function tsAskStatusNote(status, current, label, suggestions){
  return new Promise(resolve => {
    const isLost = status === 'Lost';
    const wrap = document.createElement('div');
    wrap.setAttribute('dir', 'rtl');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(16,27,51,.55);display:flex;align-items:center;justify-content:center;padding:16px;font-family:Cairo,Tahoma,sans-serif';
    // suggestions اختياري — أداة المندوب بتبعت أسباب خاصة بالتوصيل
    const chips = (suggestions || TS_NOTE_SUGGESTIONS[status] || []).map(s =>
      '<button type="button" data-s="' + tsEscapeHtml(s) + '" style="border:1px solid #E3E8F2;background:#F8FAFC;color:#334155;border-radius:999px;padding:6px 11px;font:inherit;font-size:12px;font-weight:700;cursor:pointer;margin:0 0 6px 6px">' + tsEscapeHtml(s) + '</button>').join('');
    wrap.innerHTML =
      '<div style="background:#fff;border-radius:16px;max-width:460px;width:100%;box-shadow:0 20px 50px rgba(0,0,0,.3);overflow:hidden">' +
        '<div style="padding:16px 18px;border-bottom:4px solid ' + (isLost ? '#D93A3A' : '#7E22CE') + ';background:' + (isLost ? '#FDECEC' : '#F3EEFF') + '">' +
          '<div style="font-size:16px;font-weight:900;color:#101B33">' + (isLost ? '⚠️ تحويل الطلب لـ Lost' : '⏸️ تحويل الطلب لـ On Hold') + '</div>' +
          (label ? '<div style="font-size:12px;color:#5A6885;margin-top:2px;font-family:monospace" dir="ltr">' + tsEscapeHtml(label) + '</div>' : '') +
        '</div>' +
        '<div style="padding:16px 18px">' +
          '<label style="display:block;font-size:13px;font-weight:800;color:#101B33;margin-bottom:6px">' +
            (isLost ? 'إيه اللي حصل؟' : 'السبب أو المطلوب من العميل') + ' *</label>' +
          '<textarea maxlength="300" rows="3" style="width:100%;box-sizing:border-box;border:1.5px solid #E3E8F2;border-radius:10px;padding:10px 12px;font:inherit;font-size:14px;resize:vertical;outline:none"></textarea>' +
          '<div style="margin-top:8px">' + chips + '</div>' +
          '<div style="font-size:11.5px;color:#5A6885;background:#FFF8E6;border-radius:8px;padding:8px 10px;margin-top:6px;line-height:1.6">📢 الملاحظة دي <b>هتظهر للعميل</b> في صفحة التتبع' +
            (isLost ? ' (مفيش إيميل أوتوماتيك للمفقود — كلّم العميل بنفسك)' : ' وفي الإيميل اللي بيوصله') + '. اكتبها بلغة لطيفة.</div>' +
          '<div class="tsn-err" style="color:#D93A3A;font-size:12.5px;font-weight:800;margin-top:8px;display:none">اكتب السبب الأول (3 حروف على الأقل)</div>' +
        '</div>' +
        '<div style="display:flex;gap:8px;justify-content:flex-start;padding:12px 18px;border-top:1px solid #EEF2F8">' +
          '<button type="button" class="tsn-ok" style="background:#F5B820;color:#101B33;border:0;border-radius:10px;padding:10px 20px;font:inherit;font-weight:900;cursor:pointer">حفظ</button>' +
          '<button type="button" class="tsn-no" style="background:#EEF2F8;color:#5A6885;border:0;border-radius:10px;padding:10px 16px;font:inherit;font-weight:800;cursor:pointer">إلغاء</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrap);
    const ta = wrap.querySelector('textarea');
    ta.value = current || '';
    setTimeout(() => ta.focus(), 30);
    const done = v => { wrap.remove(); document.removeEventListener('keydown', onKey); resolve(v); };
    const ok = () => {
      const v = ta.value.trim();
      if(v.length < 3){ wrap.querySelector('.tsn-err').style.display = 'block'; ta.style.borderColor = '#D93A3A'; ta.focus(); return; }
      done(v);
    };
    const onKey = e => { if(e.key === 'Escape') done(null); };
    document.addEventListener('keydown', onKey);
    wrap.querySelector('.tsn-ok').onclick = ok;
    wrap.querySelector('.tsn-no').onclick = () => done(null);
    wrap.addEventListener('click', e => {
      const s = e.target.getAttribute && e.target.getAttribute('data-s');
      if(s){ ta.value = s; ta.focus(); }
      else if(e.target === wrap) done(null);
    });
  });
}

/** <option>s لقائمة حالات. opts.withAr: يكتب العربي جنب الإنجليزي.
 *  opts.placeholder: أول اختيار فاضي (للفلاتر والتعديل الجماعي).
 *  لو الحالة الحالية مش في القائمة الرسمية، بتتضاف هي كمان ومختارة —
 *  عشان الحفظ مايغيّرهاش من غير قصد. */
function tsStatusOptionsHtml(current, opts){
  opts = opts || {};
  const cur = String(current == null ? '' : current).trim();
  const list = TS_STATUSES.slice();
  if(cur && list.indexOf(cur) === -1) list.push(cur);
  const label = s => opts.withAr && TS_STATUS_AR[s] ? (s + ' — ' + TS_STATUS_AR[s]) : s;
  return (opts.placeholder != null ? '<option value="">' + tsEscapeHtml(opts.placeholder) + '</option>' : '') +
    list.map(s => '<option value="' + tsEscapeHtml(s) + '"' + (s === cur ? ' selected' : '') + '>' +
      tsEscapeHtml(label(s)) + '</option>').join('');
}

/* 🏷️ الأصناف — نفس قيم حاسبة الموقع بالظبط (calculator.html)، لأنها
   مفاتيح التسعير. أي شاشة موظفين بتطلب صنف بتستخدم القائمة دي. */
const TS_CATEGORIES = [
  'Clothes (Regular)', 'Jacket or BALTO', 'Electronics', 'Shoes (Regular)', 'Shoes (Boot)',
  'Watches', 'Accessories', 'Cosmetics', 'Sunglasses', 'Food', 'CarParts',
  'Vitamin or Supplements', 'Shampoo or Conditioner', 'Small Size Hand bag (women)',
  'Back bag (or Lap bag)', 'Large Size Hand bag (women)', 'Stationary'
];
function tsCategoryOptionsHtml(current){
  const cur = String(current == null ? '' : current).trim();
  const list = TS_CATEGORIES.slice();
  if(cur && list.indexOf(cur) === -1) list.push(cur);   // صنف قديم مش في القائمة يفضل ظاهر
  return '<option value="">— اختر الصنف —</option>' +
    list.map(c => '<option value="' + tsEscapeHtml(c) + '"' + (c === cur ? ' selected' : '') + '>' + tsEscapeHtml(c) + '</option>').join('');
}

/* 📅 موعد الوصول بشكل مفهوم للعميل — الموظفين بيكتبوه بصيغ داخلية
   (O-27SEP2026 · 0-18Oct2026 · 29032026 · 2026-09-18). بيرجّع
   "27 سبتمبر 2026" / "27 Sep 2026"، ولو الصيغة مش مفهومة بيرجّع النص
   نفسه من غير البادئة الداخلية (O- / 0-) — مابيخفيش الموعد أبدًا. */
const TS_MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const TS_MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
function tsParseArrival(raw){
  const clean = String(raw == null ? '' : raw).trim().toUpperCase().replace(/^[A-Z0-9]{1,2}[-–—\s]+(?=\d)/, '');
  if(!clean) return null;
  let m;
  if((m = clean.match(/^(\d{1,2})(\d{2})(\d{4})$/))) return { d: +m[1], m: +m[2] - 1, y: +m[3] };
  const mi = TS_MONTHS_EN.findIndex(x => clean.indexOf(x.toUpperCase()) !== -1);
  if(mi !== -1){
    const nums = clean.replace(new RegExp(TS_MONTHS_EN[mi].toUpperCase() + '[A-Z]*'), ' ').match(/\d+/g) || [];
    let d = null, y = null;
    nums.forEach(n => { if(n.length === 4) y = +n; else if(d === null) d = +n; });
    if(d && y) return { d, m: mi, y };
  }
  const p = clean.split(/[^0-9]+/).filter(Boolean).map(Number);
  if(p.length === 3){
    if(String(p[0]).length === 4) return { y: p[0], m: p[1] - 1, d: p[2] };
    return { d: p[0], m: p[1] - 1, y: p[2] };
  }
  return null;
}
function tsFormatArrival(raw, lang){
  const v = tsParseArrival(raw);
  const ar = (lang || (typeof TS_LANG !== 'undefined' ? TS_LANG : 'ar')) === 'ar';
  if(v && v.m >= 0 && v.m < 12 && v.d >= 1 && v.d <= 31) return v.d + ' ' + (ar ? TS_MONTHS_AR : TS_MONTHS_EN)[v.m] + ' ' + v.y;
  return String(raw == null ? '' : raw).trim().replace(/^[A-Za-z0-9]{1,2}[-–—\s]+(?=\d)/, '');
}

/* 📅 موعد الوصول بشكل موحّد للتخزين: O-27SEP2026
   ---------------------------------------------------------------
   "O-27Sep2026" و"27sep2026" و"29032026" كانوا بيتحسبوا شحنات مختلفة
   في الفلاتر والمصروفات وسعر الدولار لكل شحنة. أي صيغة مفهومة بتتحول
   للشكل ده؛ اللي مش مفهوم بيتساب زي ما هو (بحروف كبيرة) مابيضيعش. */
function tsNormArrival(raw){
  let s = String(raw == null ? '' : raw).trim();
  if(!s) return '';
  // خلية متخزنة كتاريخ بتوصل ISO كامل بالساعة — نحوّلها ليوم القاهرة الأول
  if(/^\d{4}-\d{2}-\d{2}T/.test(s)) s = tsFormatSheetDate(s);
  const v = tsParseArrival(s);
  if(v && v.m >= 0 && v.m < 12 && v.d >= 1 && v.d <= 31 && v.y > 2000) return 'O-' + v.d + TS_MONTHS_EN[v.m].toUpperCase() + v.y;
  return s.toUpperCase().replace(/\s+/g, '');
}

/* ═══════════════════════════════════════════════════════════
   🛡️ حفظ طلب من الداشبورد — الخانات اللي اتغيرت بس + حماية
   ═══════════════════════════════════════════════════════════
   tsOrderChanges(cur, wanted): بيقارن القيم وقت فتح الصفحة (cur) بالقيم
   اللي الموظف عايزها (wanted)، وبيرجّع:
     fields → الخانات اللي اتغيرت بس (هي اللي بتتبعت)
     expect → قيمتها القديمة (السيرفر بيرفض لو اتغيرت في الشيت من وقتها)
   السبب: كان كل حفظ بيبعت كل الخانات، فموظف فاتح الصفحة من بدري كان
   بيرجّع العربون اللي المندوب حصّله لقيمته القديمة. */
const TS_NUM_FIELDS = ['usd', 'finalPrice', 'shipping', 'deposit'];
function tsSameOrderValue(field, a, b){
  if(TS_NUM_FIELDS.indexOf(field) !== -1) return Math.abs((parseFloat(a) || 0) - (parseFloat(b) || 0)) < 0.01;
  return String(a == null ? '' : a).trim() === String(b == null ? '' : b).trim();
}
function tsOrderChanges(cur, wanted){
  const fields = {}, expect = {};
  Object.keys(wanted).forEach(f => {
    if(wanted[f] === undefined) return;
    if(!tsSameOrderValue(f, cur[f], wanted[f])){ fields[f] = wanted[f]; expect[f] = cur[f] == null ? '' : cur[f]; }
  });
  return { fields, expect, count: Object.keys(fields).length };
}

/* ⚠️ تأكيدات قبل الحفظ — بترجّع قايمة رسايل؛ فاضية = مفيش حاجة تستاهل سؤال
   • "تم التسليم" وفيه فلوس لسه مطلوبة
   • الحالة بترجع لورا (Delivered ← Pending Review مثلاً)
   • العربون أكبر من الإجمالي (غالبًا صفر زيادة بالغلط) */
const TS_STATUS_FLOW = ['Pending Review', 'Confirmed Via Try', 'Processing', 'Placed', 'Arrived USA HUB',
                        'In transit', 'Arrived Cairo HUB', 'Shipped To You', 'Delivered'];
function tsOrderWarnings(cur, next){
  const out = [];
  const total = parseFloat(next.finalPrice !== undefined ? next.finalPrice : cur.finalPrice) || 0;
  const ship  = parseFloat(next.shipping   !== undefined ? next.shipping   : cur.shipping)   || 0;
  const dep   = parseFloat(next.deposit    !== undefined ? next.deposit    : cur.deposit)    || 0;
  const oldSt = String(cur.status || '').trim(), newSt = String(next.status !== undefined ? next.status : oldSt).trim();
  const due = total + ship - dep;
  if(newSt === 'Delivered' && oldSt !== 'Delivered' && due > 0.5)
    out.push('💵 لسه مطلوب ' + Math.round(due).toLocaleString('en-US') + ' ج.م على الطلب ده — اتحصّلوا فعلاً؟ (لو اتحصّلوا، زوّد العربون الأول)');
  const oi = TS_STATUS_FLOW.indexOf(oldSt), ni = TS_STATUS_FLOW.indexOf(newSt);
  if(newSt !== oldSt && ((oi !== -1 && ni !== -1 && ni < oi) || (tsIsClosedStatus(oldSt) && !tsIsClosedStatus(newSt))))
    out.push('↩️ الحالة هترجع لورا: ' + tsStatusLabel(oldSt) + ' ← ' + tsStatusLabel(newSt));
  if(dep > total + ship + 0.5 && total > 0)
    out.push('💰 العربون (' + Math.round(dep).toLocaleString('en-US') + ') أكبر من إجمالي الطلب (' + Math.round(total + ship).toLocaleString('en-US') + ') — في صفر زيادة؟');
  return out;
}

/* 💾 حفظ تعديل طلب من الداشبورد (لوحة الموبايل و945) — مكان واحد:
     1) الخانات اللي اتغيرت بس + expect (شوف tsOrderChanges)
     2) تأكيدات قبل الحفظ (tsOrderWarnings) وسبب On Hold/Lost
     3) بعد الحفظ: الصفحة بتعيد تحميل الطلبات (loadData) وتتأكد إن القيم
        اتسجلت فعلاً — الإرسال no-cors مابيرجعش رد، فده التأكيد الحقيقي.
   o = { orderId, cur, wanted, scriptURL, staffToken, user, btn, statusSelect,
         reload: async () => orders[] }   ← reload بترجّع الطلبات بعد التحديث */
async function tsSaveOrderEdit(o){
  const cur = o.cur || {};
  const wanted = Object.assign({}, o.wanted);
  if(wanted.arrivaldate !== undefined) wanted.arrivaldate = tsNormArrival(wanted.arrivaldate);
  const ch = tsOrderChanges(cur, wanted);
  if(!ch.count){ alert('مفيش أي تغيير في الطلب ' + o.orderId + ' عشان يتحفظ.'); return false; }

  const warns = tsOrderWarnings(cur, ch.fields);
  if(warns.length && !confirm('⚠️ قبل الحفظ — الطلب ' + o.orderId + ':\n\n' + warns.join('\n\n') + '\n\nتحفظ برضه؟')){
    if(o.statusSelect && ch.fields.status !== undefined) o.statusSelect.value = cur.status || 'Pending Review';
    return false;
  }

  let statusNote;
  if(ch.fields.status !== undefined && tsNeedsStatusNote(ch.fields.status, cur.status)){
    statusNote = await tsAskStatusNote(ch.fields.status, cur.statusNote, o.orderId + (cur.customerName ? ' — ' + cur.customerName : ''));
    if(statusNote === null){ if(o.statusSelect) o.statusSelect.value = cur.status || 'Pending Review'; return false; }
  }

  if(o.btn) tsSetBtnLoading(o.btn, 'جاري الحفظ...');
  try{
    await tsPostScript(o.scriptURL, Object.assign({ action: 'updateStatus', order: o.orderId, user: o.user, staffToken: o.staffToken,
                                                    expect: ch.expect, statusNote }, ch.fields));
  }catch(err){
    if(o.btn) tsClearBtnLoading(o.btn);
    alert('❌ تعذر الاتصال بالسيرفر — الطلب مااتحدّثش. تأكد من النت وجرّب تاني.');
    return false;
  }

  // ✅ التأكد الحقيقي: نقرا الطلب تاني من الشيت ونقارن
  let after = null;
  for(let i = 0; i < 2 && !after; i++){
    if(i) await new Promise(r => setTimeout(r, 1500));
    const list = await o.reload();
    const row = (list || []).find(x => String(x.order) === String(o.orderId));
    if(row && Object.keys(ch.fields).every(f => tsSameOrderValue(f, row[f], ch.fields[f]))) after = { ok: true, row };
    else if(row && Object.keys(ch.expect).some(f => !tsSameOrderValue(f, row[f], ch.expect[f]) && !tsSameOrderValue(f, row[f], ch.fields[f]))) after = { stale: true, row };
  }
  if(o.btn) tsClearBtnLoading(o.btn);
  if(after && after.ok){ tsToast('✅ اتحفظ — الطلب ' + o.orderId); return true; }
  if(after && after.stale){
    alert('⚠️ التعديل مااتحفظش: الطلب ' + o.orderId + ' اتعدل من حد تاني (موظف أو المندوب) من وقت ما فتحت الصفحة.\n\nالصفحة اتحدّثت بالقيم الجديدة — راجعها واعمل تعديلك تاني.');
    return false;
  }
  alert('⚠️ مش متأكدين إن التعديل اتحفظ للطلب ' + o.orderId + ' — حدّث الصفحة وراجعه قبل ما تعيد.');
  return false;
}

/* ═══════════════════════════════════════════════════════════
   🚨 فحص المنتج السريع — تنبيه لو ممكن يكون فيه مشكلة
   ═══════════════════════════════════════════════════════════
   بيشتغل في المتصفح بس ومن غير أي نداء شبكة (فمابيأثرش على سرعة
   الحساب): بيقرا اسم المنتج من اللينك نفسه (أمازون وأغلب المتاجر
   بيكتبوا الاسم في اللينك)، والملاحظات، والفئة، والوزن، والأبعاد.
   ⚠️ تنبيه بس مش قرار — مابيوقفش الحساب ولا الطلب. الكلمات اتاخدت
   من سياسة المنتجات الممنوعة في الموقع (restricted-items.html).
   المستويات:
     red    → ممنوع في سياستنا
     orange → شحن خطر / محتاج مراجعة قبل التأكيد (بطاريات، بخاخات…)
     yellow → حجم أو وزن كبير
     info   → اللينك مختصر — الفحص مش شايف اسم المنتج */
const TS_RISK_RULES = [
  // 🔴 من سياسة المنتجات الممنوعة
  ['red', /\b(fire ?arms?|(?<!(glue|massage|heat|nail|spray|staple|caulk|caulking|grease|water|bubble|toy|label|price|tattoo|soldering|hot|paint|foam|air|blow|thermometer|temperature|scan|scanner|barcode|laser|tape|lint) )guns?|pistols?|rifles?|shotguns?|ammo|ammunition|holsters?|airsoft|bb guns?|pellet guns?)\b|مسدس|سلاح|ذخيرة|خرطوش/, 'أسلحة أو ذخيرة أو ملحقاتها'],
  ['red', /\b(combat|tactical|military|switch ?blade|butterfly)[ -]?knife|\bknives? (combat|tactical)/, 'سكينة قتالية / تكتيكية'],
  ['red', /\b(tasers?|stun ?guns?|pepper ?spray|bear ?spray|mace spray|self[ -]defen[cs]e spray)\b|صاعق|بخاخ فلفل/, 'صاعق كهربائي أو بخاخ دفاع عن النفس'],
  ['red', /\b(fireworks?|firecrackers?|sparklers?|explosives?)\b|ألعاب نارية|العاب نارية|صواريخ/, 'ألعاب نارية أو متفجرات'],
  ['red', /\b(cbd|thc|delta[ -]?[89]|hhc|cannabis|marijuana|weed)\b|حشيش|ماريجوانا/, 'منتجات القنّب (CBD / THC / Delta)'],
  ['red', /\b(vapes?|vaping|e[ -]?cig(arette)?s?|e[ -]?liquids?|juul|nicotine|zyn|vape pods?)\b|فيب|نيكوتين|سجائر إلكترونية/, 'فيب / سجائر إلكترونية / نيكوتين'],
  ['red', /\b(cigarettes?|cigars?|tobacco|hookah|shisha)\b|سجائر|سيجار|تبغ|شيشة|معسل/, 'سجائر أو تبغ أو شيشة'],
  ['red', /\b(wine|vodka|whiske?y|bourbon|tequila|liquor|champagne|beer|rum|gin)\b|خمر|نبيذ|فودكا|ويسكي|بيرة/, 'مشروبات كحولية'],
  ['red', /\b(prescription(?! (glasses|eyeglasses|sunglasses|lenses|lens|frames|safety glasses|goggles|swim goggles))|rx only|injections?|injectable|syringes?|insulin|steroids?|testosterone|hgh|sarms|botox|dermal filler|lip filler)\b|حقن|حقنة|انسولين|هرمون|ستيرويد|بوتوكس|فيلر/, 'أدوية بروشتة / حقن / هرمونات / فيلر'],
  ['red', /\b(live (plants?|animals?|fish)|(plant|vegetable|flower|garden|heirloom)[ -]seeds?|seeds? for planting)\b|بذور زراعة|نباتات حية|حيوانات حية/, 'نباتات حية أو بذور زراعة أو حيوانات'],
  ['red', /\b(sex toys?|vibrators?|dildos?|adult toys?)\b/, 'منتجات للبالغين'],
  ['red', /\b(walkie[ -]?talkies?|two[ -]way radios?|ham radio|transceivers?|signal jammers?|jammers?|spy cam(era)?s?|hidden cam(era)?s?|nanny cam)\b|لاسلكي|جهاز تشويش|كاميرا تجسس/, 'لاسلكي / تشويش / كاميرا تجسس (محتاج ترخيص أو ممنوع)'],
  ['red', /\b(body armou?r|plate carriers?|ballistic (vest|plate|helmet)|bulletproof|military uniforms?)\b|درع واقي|زي عسكري/, 'دروع واقية أو زي عسكري'],
  // 🟠 شحن خطر — مش ممنوع في السياسة بالضرورة، بس محتاج مراجعة قبل التأكيد
  ['orange', /\b(lithium|li[ -]?ion|lipo|power ?banks?|power ?core|portable (phone )?chargers?|battery (packs?|banks?)|power ?stations?|solar generators?|jump ?starters?|e[ -]?bikes?|electric scooters?|hoverboards?|drones?)\b|ليثيوم|باور ?بانك|سكوتر كهرب/, 'بطارية ليثيوم / باور بانك / جهاز ببطارية كبيرة'],
  ['orange', /\b(batter(y|ies)|rechargeable)\b|بطارية|بطاريات/, 'فيه بطارية — اتأكد من نوعها وحجمها'],
  ['orange', /\b(aerosols?|sprays?(?! bottles?)|spray ?paint|wd ?40|flammable|lighters?|lighter fluid|butane|propane|torch|gasoline|kerosene|fuel|nail polish|acetone|paint thinner|matches)\b|قابل للاشتعال|ولاعة|بوتاجاز|بخاخ|سبراي|اسبراي/, 'بخاخ مضغوط أو مادة قابلة للاشتعال'],
  ['orange', /\b(perfumes?|colognes?|eau de (parfum|toilette)|fragrance(?![ -]?free))\b|برفان|بارفان|عطر|كولونيا/, 'عطر / برفان (سائل قابل للاشتعال في الشحن)'],
  ['orange', /\b(pesticides?|insecticides?|herbicides?|poisons?|roach|rat killer|bait stations?|(bug|insect|roach|ant|pest|mosquito|fly|weed) (killer|killing|bait|spray)|killing (bait|gel|indoor)|bleach|ammonia|chlorine|lye|sodium hydroxide|drain cleaner|(hydrochloric|sulfuric|muriatic|nitric) acid)\b|مبيد|سم فئران/, 'مواد كيميائية أو مبيدات (الخطر منها ممنوع)'],
  ['orange', /\bneodymium|strong magnets?\b|مغناطيس قوي/, 'مغناطيس قوي'],
  ['orange', /\b(alcohol(?![ -]?free)|hemp)\b|كحول/, 'فيه كحول أو قنّب — اتأكد من المكونات'],
  ['orange', /\b(replicas?|counterfeit|knock ?off)\b|تقليد|كوبي/, 'ممكن يكون تقليد لماركة']
];
const TS_SHORT_LINK = /^https?:\/\/(a\.co|amzn\.(to|eu)|share\.google|ebay\.io|bit\.ly|tinyurl\.com|iherb\.co|goo\.gl|t\.co)\//i;

/* نص المنتج من اللينك: الدومين + الـ path بعد فك الترميز، والشرط والـ _
   بيتحولوا مسافات ("/Lokithor-Jump-Starter-3000A/dp/…" ← "lokithor jump starter 3000a") */
function tsLinkText(link){
  const s = String(link || '').trim();
  if(!s) return '';
  try{
    const u = new URL(s);
    let p = u.pathname;
    try{ p = decodeURIComponent(p); }catch(e){}
    const q = ['k', 'keywords', 'q', 'search', '_skw', '_nkw'].map(k => u.searchParams.get(k) || '').join(' ');
    return (p + ' ' + q).replace(/[-_+/.=]+/g, ' ').toLowerCase();
  }catch(e){ return s.toLowerCase(); }
}

/* 💧 المكملات السائلة بالمليلتر — الحاسبتين (calculator / calculatorOP)
   خانة الوزن بتتحول لـ "حجم العبوة" بوحدات ml / fl oz، والحساب جوه
   لسه بالجرام: 1 مل ≈ 1 جم (نفس القاعدة اللي كانت مكتوبة للعميل قبل كده).
   on=false بيرجّع وحدات الوزن العادية. */
const TS_LIQUID_TO_G = { ml: 1, floz: 29.5735 };
function tsSetLiquidUnits(on){
  const sel = document.getElementById('weightUnit');
  const lab = document.querySelector('label[for="weight"] [data-i18n]');
  if(!sel) return;
  const isLiquid = sel.dataset.liquid === '1';
  if(!!on !== isLiquid){
    sel.dataset.liquid = on ? '1' : '';
    sel.innerHTML = on
      ? '<option value="ml" data-i18n="c2_u_ml">ml</option><option value="floz">fl oz</option>'
      : '<option value="g" data-i18n="c2_u_g">g</option><option value="kg" data-i18n="c2_u_kg">kg</option><option value="lb">lb</option><option value="oz">oz</option>';
    if(lab) lab.setAttribute('data-i18n', on ? 'c2_volume_label' : 'c2_weight_label');
  }
  if(typeof tsT === 'function'){
    sel.querySelectorAll('[data-i18n]').forEach(o => { o.textContent = tsT(o.getAttribute('data-i18n')); });
    if(lab) lab.textContent = tsT(lab.getAttribute('data-i18n'));
  }
}
/** معامل التحويل لجرام للوحدة المختارة (وزن أو حجم) */
function tsUnitToG(u){ return ({ g: 1, kg: 1000, lb: 453.592, oz: 28.3495 })[u] || TS_LIQUID_TO_G[u] || 1; }

/* هل اللينك فيه كلمة واحدة على الأقل من اسم المنتج؟ (حروف بس، 4 حروف أو أكتر،
   ومش من كلمات الروابط زي product / item / html) */
const TS_LINK_NOISE = /^(product|products|item|items|html|shop|store|detail|details|www|https?|amazon|ebay|walmart|iherb|com|search|keywords)$/;
function tsLinkHasName(link){
  let host = '';
  try{ host = new URL(String(link).trim()).hostname.toLowerCase(); }catch(e){}
  return tsLinkText(link).split(/\s+/).some(w => /^[a-z؀-ۿ]{4,}$/.test(w) && !TS_LINK_NOISE.test(w) && host.indexOf(w) === -1);
}

/** o = { link, text, category, weightG, dimsCm:[l,w,h], volG }
 *  بترجّع [{ level, msg }] بالترتيب: أحمر ← برتقالي ← أصفر ← معلومة */
function tsProductRisk(o){
  o = o || {};
  const out = [], seen = {};
  const hay = (tsLinkText(o.link) + ' ' + String(o.text || '') + ' ' + String(o.category || '')).toLowerCase();
  TS_RISK_RULES.forEach(([level, re, msg]) => {
    if(seen[msg]) return;
    const m = hay.match(re);
    if(m){ seen[msg] = 1; out.push({ level, msg, word: m[0].trim() }); }
  });
  // 🐜 مبيد في سرنجة (جل الصراصير) مش حقن طبية — مانقولش "حقن" لو المبيد اتلقط
  if(out.some(r => r.msg.indexOf('مبيدات') !== -1)) for(let i = out.length - 1; i >= 0; i--) if(/^syringes?$/.test(out[i].word || '')) out.splice(i, 1);
  // بطارية ليثيوم بتغطي "فيه بطارية" — مانكررش الاتنين
  if(out.some(r => r.msg.indexOf('ليثيوم') !== -1)) for(let i = out.length - 1; i >= 0; i--) if(out[i].msg.indexOf('فيه بطارية') === 0) out.splice(i, 1);

  const w = parseFloat(o.weightG) || 0;
  const d = (o.dimsCm || []).map(x => parseFloat(x) || 0);
  const maxSide = Math.max(0, ...d), sumSides = d.reduce((s, x) => s + x, 0);
  if(maxSide > 100 || sumSides > 200) out.push({ level: 'yellow', msg: 'أبعاد كبيرة (' + d.map(x => Math.round(x)).join(' × ') + ' سم) — اتأكد إن شركة الشحن بتقبلها' });
  if(o.volG && w && o.volG > w * 1.5) out.push({ level: 'yellow', msg: 'الوزن الحجمي (' + (o.volG / 1000).toFixed(1) + ' كجم) أكبر من الوزن الفعلي — السعر محسوب على الحجم، راجع الأبعاد' });
  if(Math.max(w, o.volG || 0) > 10000) out.push({ level: 'yellow', msg: 'شحنة تقيلة (' + (Math.max(w, o.volG || 0) / 1000).toFixed(1) + ' كجم للقطعة) — راجع تكلفة الشحن الفعلية' });

  if(o.link && TS_SHORT_LINK.test(String(o.link).trim()))
    out.push({ level: 'info', msg: 'اللينك مختصر — اسم المنتج مش باين فيه، فالفحص مش شايفه. افتحه واتأكد بنفسك' });
  // 🐛→✅ لينك زي amazon.com/dp/B07… أو ebay.com/itm/123 مفيهوش اسم المنتج خالص،
  // فالفحص كان بيسكت تمامًا والموظف يفتكر إن المنتج سليم
  else if(o.link && /^https?:\/\//i.test(String(o.link).trim()) && !tsLinkHasName(o.link))
    out.push({ level: 'info', msg: 'اللينك مفيهوش اسم المنتج (رقم بس) — الفحص مش شايف المنتج. افتحه واتأكد بنفسك إنه مش بطارية أو بخاخ أو ممنوع' });

  const rank = { red: 0, orange: 1, yellow: 2, info: 3 };
  return out.sort((a, b) => rank[a.level] - rank[b.level]);
}

/** صندوق التنبيهات — بيترسم في عنصر موجود (box). فاضي = الصندوق بيستخبى */
function tsRenderRisk(box, risks){
  if(!box) return;
  if(!risks || !risks.length){ box.innerHTML = ''; box.style.display = 'none'; return; }
  const sty = { red: ['#FEF2F2', '#DC2626', '#991B1B', '🔴 ممنوع في سياستنا'], orange: ['#FFF7ED', '#EA580C', '#9A3412', '🟠 راجع قبل التأكيد'],
                yellow: ['#FEFCE8', '#CA8A04', '#854D0E', '🟡 حجم / وزن'], info: ['#F1F5F9', '#94A3B8', '#475569', 'ℹ️'] };
  box.style.display = 'block';
  box.innerHTML = risks.map(r => {
    const s = sty[r.level];
    return '<div style="background:' + s[0] + ';border-inline-start:4px solid ' + s[1] + ';color:' + s[2] + ';border-radius:10px;padding:9px 12px;margin-top:8px;font-size:13px;font-weight:700;line-height:1.6;text-align:start">' +
      '<span style="font-size:11px;font-weight:900;opacity:.85">' + s[3] + '</span><br>' + tsEscapeHtml(r.msg) +
      (r.word ? ' <span style="font-weight:600;opacity:.7">(«' + tsEscapeHtml(r.word) + '»)</span>' : '') + '</div>';
  }).join('');
}

/* 💡 مراجعة السعر بالمصري اللي الموظف بيكتبه بإيده (Direct Order / Quick
   Order / إضافة طلب) — بنفس معادلة الحاسبة (function_calc.js لازم يكون
   متحمّل). بيرجّع { suggested, warnings[] }. الوزن لو مش معروف بيتحسب
   أقل من 300 جم، فالمقترح ساعتها "تقريبي". */
const TS_LOSS_RATE = 50;   // جنيه للدولار — أي سعر أقل من التكلفة بالدولار × ده = بيع بخسارة
function tsPriceSanity(o){
  const usd = parseFloat(o.usd) || 0, egp = parseFloat(o.egp) || 0;
  const res = { suggested: 0, approx: !(parseFloat(o.weightGrams) > 0), warnings: [] };
  if(!(usd > 0)) return res;
  if(typeof tryShoppyCalculatePrice === 'function' && o.category){
    res.suggested = tryShoppyCalculatePrice({ usd, category: o.category, weightGrams: parseFloat(o.weightGrams) || 0, quantity: 1 }).finalPrice;
  }
  if(egp > 0){
    if(egp < usd * TS_LOSS_RATE)
      res.warnings.push('🔻 سعر القطعة (' + egp.toLocaleString('en-US') + ' ج.م) أقل من تكلفتها بالدولار (' + Math.round(usd * TS_LOSS_RATE).toLocaleString('en-US') + ' ج.م) — كده بيع بخسارة');
    else if(res.suggested && egp < res.suggested * 0.6)
      res.warnings.push('📉 السعر أقل من سعر الحاسبة (' + res.suggested.toLocaleString('en-US') + ' ج.م) بـ ' + Math.round((1 - egp / res.suggested) * 100) + '٪');
    if(res.suggested && egp > res.suggested * 1.6)
      res.warnings.push('📈 السعر أعلى من سعر الحاسبة (' + res.suggested.toLocaleString('en-US') + ' ج.م) بـ ' + Math.round((egp / res.suggested - 1) * 100) + '٪ — يمكن اتكتب الإجمالي مكان سعر القطعة؟');
  }
  return res;
}
/** سطر "💡 سعر الحاسبة" تحت خانة المصري — بيتحدّث مع الكتابة */
function tsAttachPriceHint(ids){
  const el = id => document.getElementById(id);
  const egpIn = el(ids.egp);
  if(!egpIn) return;
  let hint = document.getElementById(ids.egp + 'Hint');
  if(!hint){
    hint = document.createElement('div');
    hint.id = ids.egp + 'Hint';
    hint.style.cssText = 'font-size:12px;font-weight:700;margin-top:6px;line-height:1.6;color:#64748b';
    egpIn.insertAdjacentElement('afterend', hint);
  }
  const upd = () => {
    const unit = ids.weightUnit && el(ids.weightUnit) ? ({ g:1, kg:1000, lb:453.592, oz:28.3495 }[el(ids.weightUnit).value] || 1) : 1;
    const r = tsPriceSanity({ usd: el(ids.usd).value, egp: egpIn.value, category: el(ids.category).value,
                              weightGrams: ids.weight && el(ids.weight) ? (parseFloat(el(ids.weight).value) || 0) * unit : 0 });
    if(!r.suggested){ hint.textContent = ''; return; }
    hint.innerHTML = '💡 سعر الحاسبة للقطعة: <b>' + r.suggested.toLocaleString('en-US') + ' ج.م</b>' + (r.approx ? ' (تقريبي — من غير وزن)' : '') +
      (r.warnings.length ? '<div style="color:#B45309">' + r.warnings.map(tsEscapeHtml).join('<br>') + '</div>' : '');
  };
  [ids.usd, ids.egp, ids.category, ids.weight, ids.weightUnit].forEach(id => {
    if(id && el(id)){ el(id).addEventListener('input', upd); el(id).addEventListener('change', upd); }
  });
  upd();
}

/* 🔢 أرقام عربي/فارسي ← إنجليزي (٠١٠ ← 010). العملاء اللي بيكتبوا
   من كيبورد عربي بيدخلوا الموبايل بالأرقام العربي، و\d في جافاسكريبت
   مش بيعتبرها أرقام أصلاً — فكانت بتتمسح وتطلع الرقم فاضي. */
function tsToEnDigits(v){
  return String(v == null ? '' : v)
    .replace(/[٠-٩]/g, ch => String(ch.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, ch => String(ch.charCodeAt(0) - 0x06F0));
}

/* 📅 تاريخ من الشيت → YYYY-MM-DD بتوقيت القاهرة.
   ---------------------------------------------------------------
   خلية التاريخ في جوجل شيت بترجع من Apps Script كـ Date، وبتتحول
   لنص ISO كامل بالساعة: "2029-01-31T22:00:00.000Z".

   ⚠️ قص أول 10 حروف بيطلع تاريخ غلط بيوم كامل: الخلية اللي فيها
   1 فبراير بتترجع 31 يناير 22:00 بتوقيت UTC (مصر UTC+2)، فالقص
   الساذج بيديك 31 يناير. لازم التحويل يبقى بتوقيت القاهرة.       */
function tsFormatSheetDate(v){
  const s = String(v == null ? '' : v).trim();
  if(!s) return '';
  if(/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;   // متخزن صح أصلاً
  const d = new Date(s);
  if(isNaN(d.getTime())) return s;              // مش تاريخ — نسيبه زي ما هو
  try{
    return d.toLocaleDateString('en-CA', { timeZone: 'Africa/Cairo' });
  }catch(e){
    return s.slice(0, 10);
  }
}

/* بلوك صنف واحد.
   item = { orderNo, link, name, qty, unitPrice, lineTotal, specs,
            arrivalDate, status, extraLines[], index, hideArrival }
   لو unitPrice مش متبعت، بتتحسب من الإجمالي ÷ العدد.
   index → بيرقّم المنتجات (منتج 1: / منتج 2:) في الرسائل اللي
   فيها أكتر من صنف، عشان العميل يقدر يشاور على واحد بعينه. */
function tsWaItemBlock(item, lang){
  const T = tsWaT(lang);
  const qty  = parseInt(item.qty, 10) || 1;
  const line = parseFloat(item.lineTotal) || 0;
  const unit = (item.unitPrice !== undefined && item.unitPrice !== null && item.unitPrice !== '')
    ? (parseFloat(item.unitPrice) || 0)
    : (qty > 0 ? line / qty : line);

  const rows = [];
  const label = item.index ? T.item + ' ' + item.index + ': ' : '';
  if(item.orderNo) rows.push('🔖 *' + item.orderNo + '*');
  if(item.link)    rows.push('🔗 ' + label + item.link);
  else if(item.name) rows.push('🔗 ' + label + item.name);
  if(item.link && item.name) rows.push(T.product + ': ' + item.name);

  rows.push(T.qty + ': *' + qty + '*');
  /* سعر القطعة وإجماليها نفس الرقم لو العدد 1 — سطر واحد كفاية بدل تكرار */
  if(qty > 1){
    rows.push(T.unit + ': *' + tsWaMoney(unit, lang) + '*');
    rows.push(T.line + ': *' + tsWaMoney(line, lang) + '*');
  } else {
    rows.push(T.unit + ': *' + tsWaMoney(line, lang) + '*');
  }

  const specs = String(item.specs == null ? '' : item.specs).trim();
  if(specs) rows.push(T.specs + ': ' + specs);

  (item.extraLines || []).forEach(l => { if(l) rows.push(l); });

  /* hideArrival: للرسائل اللي الأوردر فيها وصل مصر فعلاً، أو اللي
     الموعد مكتوب في عنوان المجموعة فوق. من غيرها كانت رسالة
     "طلبك وصل وجاهز للتسليم" هتقول تحتيها "موعد الوصول: يتم
     تحديده بعد تأكيد الطلب" — تناقض قدام العميل. */
  if(!item.hideArrival) rows.push(T.arrival + ': ' + tsWaArrival(tsFormatSheetDate(item.arrivalDate), lang));

  const status = tsStatusLabel(item.status, lang);
  if(status) rows.push('🚦 ' + T.status + ': *' + status + '*');

  return rows.join('\n');
}

/* الرسالة الكاملة.
   opts = {
     to: 'customer' | 'shop',
     lang: 'ar' | 'en'   ← 🌐 لغة الرسالة (الافتراضي عربي)
     customerName, phone, governorate, address,
     items: [...], total,
     intro, outro, extraTotals[]
   }
   to:'shop'     → رسالة للفريق، بتتضمن بيانات تواصل العميل
   to:'customer' → رسالة للعميل، بتتضمن لينك التتبع            */
function tsWaMessage(opts){
  const o = opts || {};
  const lang = tsWaLang(o.lang);
  const T = tsWaT(lang);
  const toCustomer = o.to !== 'shop';
  const items = o.items || [];
  const name = String(o.customerName || '').trim();

  const parts = [];

  if(o.intro){
    parts.push(o.intro);
  } else if(toCustomer){
    parts.push(T.hiCust(name));
    parts.push(T.registered);
  } else {
    parts.push(T.newOrder);
  }

  parts.push('');
  items.forEach(it => {
    parts.push(TS_WA_RULE);
    parts.push(tsWaItemBlock(it, lang));
  });
  if(items.length) parts.push(TS_WA_RULE);

  const total = (o.total !== undefined && o.total !== null)
    ? parseFloat(o.total) || 0
    : items.reduce((s, i) => s + (parseFloat(i.lineTotal) || 0), 0);

  parts.push('');
  parts.push('💰 *' + T.total + ': ' + tsWaMoney(total, lang) + '*');

  /* 💵 العربون — بيظهر بس لو فيه مبلغ مدفوع فعلاً. في الطلبات
     الجديدة العربون لسه ما اتحصّلش، فسطر "المدفوع مقدمًا: 0"
     هيبقى ضوضاء. ولما يبقى فيه عربون، الرقم اللي العميل محتاجه
     فعلاً هو المتبقي عند الاستلام مش الإجمالي. */
  const deposit = parseFloat(o.deposit) || 0;
  if(deposit > 0){
    parts.push('💵 ' + T.paid + ': ' + tsWaMoney(deposit, lang));
    parts.push('📌 *' + T.due + ': ' + tsWaMoney(Math.max(0, total - deposit), lang) + '*');
  }

  (o.extraTotals || []).forEach(l => { if(l) parts.push(l); });

  if(!toCustomer){
    parts.push('');
    if(name)           parts.push('👤 ' + T.name + ': ' + name);
    if(o.phone)        parts.push('📞 ' + T.phone + ': ' + tsDisplayPhone(o.phone));
    if(o.governorate)  parts.push('📍 ' + T.gov + ': ' + o.governorate);
    if(o.address)      parts.push('🏠 ' + T.addr + ': ' + o.address);
  }

  parts.push('');
  if(o.outro){
    parts.push(o.outro);
  } else if(toCustomer){
    parts.push(T.track);
    // 🆕 لينك التتبع بيفتح أول طلب على طول (track.html?order=…) بدل صفحة فاضية
    const first = (items.find(i => i.orderNo) || {}).orderNo;
    parts.push(first ? TS_TRACK_URL + '?order=' + encodeURIComponent(first) : TS_TRACK_URL);
    parts.push('');
    parts.push(T.anyQ);
  } else {
    parts.push(T.waiting);
  }

  return parts.join('\n');
}

/* فتح واتساب برقم معيّن. من غير رقم بيروح لرقم الدعم. */
function tsWaOpen(phone, message){
  const support = (typeof TS_CONFIG !== 'undefined' && TS_CONFIG.SUPPORT_PHONE) ? TS_CONFIG.SUPPORT_PHONE : '201005609642';
  let target = tsToEnDigits(phone || '').replace(/\D/g, '');
  if(!target){
    target = support;
  } else {
    target = target.replace(/^0/, '');              // 01xxxxxxxxx → 1xxxxxxxxx
    if(!/^20/.test(target)) target = '20' + target; // كود مصر
  }
  window.open('https://wa.me/' + target + '?text=' + encodeURIComponent(message));
}

/* بيجمّع المقاس واللون والملاحظات في سطر مواصفات واحد */
function tsWaSpecs(parts){
  return (parts || []).filter(Boolean).join(' | ');
}

/* ---------- toast ---------- */
function tsToast(msg){
  let el = document.getElementById('ts-toast');
  if(!el){
    el = document.createElement('div');
    el.id = 'ts-toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(window._tsToastTimer);
  window._tsToastTimer = setTimeout(()=> el.classList.remove('show'), 3200);
}

/* ---------- mobile menu + nav wiring (call on every page) ---------- */
function tsInitNav(){
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.mobile-menu');
  if(burger && menu){
    burger.setAttribute('aria-expanded', 'false');
    const setOpen = (open)=>{
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.innerHTML = open ? '✕' : '☰';
    };
    burger.addEventListener('click', (e)=>{ e.stopPropagation(); setOpen(!menu.classList.contains('open')); });
    /* tapping a destination, tapping outside, or pressing Esc closes the
       sheet — on a phone the menu covering the page with no way back is
       the single most common navigation dead end */
    menu.addEventListener('click', (e)=>{ if(e.target.closest('a')) setOpen(false); });
    document.addEventListener('click', (e)=>{
      if(menu.classList.contains('open') && !menu.contains(e.target) && e.target !== burger) setOpen(false);
    });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') setOpen(false); });
  }
  tsInitHeaderScroll();
  if(typeof toggleLang === 'function'){
    document.querySelectorAll('.lang-pill').forEach(btn=>{
      btn.addEventListener('click', toggleLang);
    });
  }
  tsRenderAuthNav();
  tsRenderCartBadge();
  document.addEventListener('ts-cart-changed', tsRenderCartBadge);
  /* the NEW badge on the Mart tab is pure CSS (::after in style.css),
     so nothing here — it can never be wiped by applyI18N re-renders. */
  tsInjectPayStrip();
  tsInjectContactInfo();
  tsInjectWhatsAppFab();
  tsInitReveal();
  setTimeout(tsInitReveal, 50);
}

/* 🪄 header gets a shadow once the page scrolls, so it reads as a real
   layer above the content instead of a flat strip */
function tsInitHeaderScroll(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  const onScroll = ()=> header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* 💬 floating WhatsApp support button — support is the main help channel
   here, and on mobile it was previously only reachable from the footer */
function tsInjectWhatsAppFab(){
  if(document.querySelector('.ts-wa-fab')) return;
  if(document.body.hasAttribute('data-no-wa-fab')) return;
  const phone = (typeof TS_CONFIG !== 'undefined' && TS_CONFIG.SUPPORT_PHONE) ? TS_CONFIG.SUPPORT_PHONE : '201005609642';
  const a = document.createElement('a');
  a.className = 'ts-wa-fab';
  a.href = 'https://wa.me/' + phone;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', (typeof tsT === 'function') ? tsT('foot_whatsapp') : 'Chat on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
    + '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>';
  document.body.appendChild(a);
}

/* 💳 payment chips under the footer "Payments" column (all pages)
   real brand logos — no Vodafone Cash (not an accepted method here) */
function tsInjectPayStrip(){
  const h=document.querySelector('.site-footer [data-i18n="foot_payments_t"]');
  if(!h||h.parentElement.querySelector('.pay-strip')) return;
  const d=document.createElement('div');
  d.className='pay-strip';
  d.innerHTML=
    '<span class="pay-chip img-chip"><img src="assets/payments/visa.png" alt="Visa"></span>'+
    '<span class="pay-chip img-chip"><img src="assets/payments/mastercard.png" alt="Mastercard"></span>'+
    '<span class="pay-chip img-chip"><img src="assets/payments/instapay.png" alt="InstaPay"></span>'+
    '<span class="pay-chip img-chip"><img src="assets/payments/paypal.png" alt="PayPal"></span>'+
    '<span class="pay-chip img-chip"><img src="assets/payments/cod.png" alt="Cash on Delivery"></span>';
  h.parentElement.appendChild(d);
}

/* 📍 بيانات التواصل في الفوتر — عنوان + إيميل + واتساب على كل صفحة
   ---------------------------------------------------------------
   بيتحقن من هنا مش متكتب في الـ HTML، عشان يظهر في كل الصفحات
   (13 فوتر) من مكان واحد، وأي صفحة جديدة تاخده تلقائيًا.

   ليه العنوان مهم مش مجرد تحسين: Google Ads بيطلب توثيق هوية
   المعلن (advertiser identity verification)، وMerchant Center
   بيطلب بيانات تواصل يقدر يتحقق منها فعليًا على الموقع. من غير
   عنوان ظاهر، دي بتتأخر أو بترفض.

   العناصر بتتحط بـ data-i18n عشان زرار اللغة يترجمها زي أي نص
   تاني، والنص بيتحط بالقيمة الصح من أول لحظة لو applyI18N كانت
   اشتغلت خلاص قبل النداء ده. */
function tsInjectContactInfo(){
  const grid = document.querySelector('.site-footer .foot-grid');
  if(!grid || grid.querySelector('[data-ts-contact]')) return;

  const hasI18n = typeof tsT === 'function';
  const t = (key, fallback) => hasI18n ? tsT(key) : fallback;
  const phone = (typeof TS_CONFIG !== 'undefined' && TS_CONFIG.SUPPORT_PHONE) ? TS_CONFIG.SUPPORT_PHONE : '201005609642';

  /* لو الصفحة فيها عمود "تواصل معنا" أصلاً، بنضيف العنوان جواه.
     لو مش موجود (صفحات السياسات مثلًا)، بنعمل العمود كامل. */
  let col = null;
  const existing = grid.querySelector('[data-i18n="foot_contact_t"]');
  if(existing){
    col = existing.parentElement;
  } else {
    col = document.createElement('div');
    const h = document.createElement('h4');
    h.setAttribute('data-i18n', 'foot_contact_t');
    h.textContent = t('foot_contact_t', 'Contact Us');
    col.appendChild(h);

    const mail = document.createElement('p');
    mail.innerHTML = '<a href="mailto:Info@try-shoppy.com">Info@try-shoppy.com</a>';
    col.appendChild(mail);

    const wa = document.createElement('p');
    const waLink = document.createElement('a');
    waLink.href = 'https://wa.me/' + phone;
    waLink.target = '_blank';
    waLink.rel = 'noopener';
    waLink.setAttribute('data-i18n', 'foot_whatsapp');
    waLink.textContent = t('foot_whatsapp', 'Chat on WhatsApp');
    wa.appendChild(waLink);
    col.appendChild(wa);

    grid.appendChild(col);
  }

  const addr = document.createElement('p');
  addr.setAttribute('data-ts-contact', 'address');
  addr.style.marginTop = '10px';
  addr.innerHTML = '<span style="opacity:.75">📍 </span><span data-i18n="foot_address"></span>';
  addr.querySelector('[data-i18n]').textContent = t('foot_address', '7th District, Zahraa El Maadi, Cairo, Egypt');
  col.appendChild(addr);
}

/* 🎞️ scroll-reveal: any element with class="reveal" fades up when it enters view */
function tsInitReveal(){
  const els=document.querySelectorAll('.reveal');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){els.forEach(el=>el.classList.add('in'));return;}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
}

/* updates every [data-cart-count] element with the current item count.
   Only meaningful on pages with a cart icon (mart.html), harmless no-op elsewhere. */
function tsRenderCartBadge(){
  const count = tsCartCount();
  document.querySelectorAll('[data-cart-count]').forEach(el=>{
    el.textContent = count;
    el.classList.toggle('hidden', count === 0);
  });
}

/* swap "Login" nav link for "My Account" once a session exists.
   Note: this only touches the auth slot itself — it never calls
   applyI18N() on its own, so it's safe to use even on a page that
   hasn't loaded i18n.js at all (falls back to a plain bilingual label). */
function tsRenderAuthNav(){
  const session = tsGetSession();
  const hasI18n = typeof tsT === 'function';
  document.querySelectorAll('[data-auth-slot]').forEach(slot=>{
    slot.innerHTML = '';
    const a = document.createElement('a');
    if(session){
      a.href = 'dashboard.html';
      a.textContent = hasI18n ? tsT('nav_dashboard') : 'حسابي | My Account';
      if(hasI18n) a.setAttribute('data-i18n', 'nav_dashboard');
    } else {
      a.href = 'login.html';
      a.textContent = hasI18n ? tsT('nav_login') : 'دخول | Login';
      if(hasI18n) a.setAttribute('data-i18n', 'nav_login');
    }
    if(slot.dataset.authSlot === 'pill') a.className = 'btn btn-secondary';
    slot.appendChild(a);
  });
}

/* ---------- session (client-side, keyed by phone) ---------- */
function tsGetSession(){
  try{ return JSON.parse(localStorage.getItem('ts_session')); }catch(e){ return null; }
}
function tsSetSession(profile){
  localStorage.setItem('ts_session', JSON.stringify(profile));
}
function tsClearSession(){
  localStorage.removeItem('ts_session');
}
function tsRequireAuth(){
  const s = tsGetSession();
  if(!s){ window.location.href = 'login.html'; }
  return s;
}
/* ⚠️ دي للمطابقة والتخزين — بتشيل الصفر وكود الدولة عشان نفس
   العميل يتلاقى سواء كتب 010… أو 2010… أو 10…. ممنوع تتغير:
   مفاتيح الجلسات ومطابقة الطلبات في الشيت كلها معتمدة عليها.
   للعرض استخدم tsDisplayPhone تحت. */
function tsNormalizePhone(phone){
  return tsToEnDigits(phone || '').replace(/\D/g, '').replace(/^2/, '').replace(/^0/, '');
}

/* 📞 الرقم بشكله الكامل للعرض: 01012345678
   ---------------------------------------------------------------
   الرقم بيتخزن في الشيت من غير الصفر (1012345678) عشان المطابقة،
   فكان بيظهر كده للعميل في الواتساب والإيميل — ناقص ورقمه مش
   مفهوم. الدالة دي بتصلّح العرض بس، من غير ما تلمس المخزّن.

   بتتعامل مع كل الأشكال من غير ما تكرر الصفر:
     1012345678      → 01012345678
     01012345678     → زي ما هو
     201012345678    → 01012345678   (كود مصر)
     00201012345678  → 01012345678   (بادئة دولية)
     +20 101 234 5678→ 01012345678
   وأي شكل غير متوقع (أرضي، رقم ناقص، نص) بيرجع زي ما هو بالظبط
   بدل ما نضيفله صفر بالغلط. */
function tsDisplayPhone(v){
  const raw = String(v == null ? '' : v).trim();
  if(!raw) return '';
  let d = tsToEnDigits(raw).replace(/\D/g, '');
  if(!d) return raw;                                             // مفيش أرقام خالص
  if(d.length > 12 && d.slice(0, 2) === '00') d = d.slice(2);     // بادئة دولية
  if(d.length === 12 && d.slice(0, 3) === '201') d = d.slice(2);  // كود مصر
  if(d.length === 11 && d.slice(0, 2) === '01') return d;         // مظبوط أصلاً
  if(d.length === 10 && d[0] === '1') return '0' + d;             // ناقص الصفر
  return raw;                                                     // شكل مش متوقع — منلمسوش
}

/* ✅ موبايل مصري صالح للتواصل (واتساب/مندوب) — 01[0/1/2/5] + 8 أرقام.
   بيقبل أرقام عربي ومسافات و+20/0020، وبيرجّع 01xxxxxxxxx أو "" لو مش صالح. */
function tsValidEgMobile(v){
  const d = tsDisplayPhone(v);
  return /^01[0125]\d{8}$/.test(d) ? d : '';
}

/* 🧾 التحقق من بيانات الشحن في صفحات الدفع (الحاسبة + المارت)
   ---------------------------------------------------------------
   🐛→✅ الحاسبة كانت بتطلب الاسم بس، والمارت الاسم والموبايل بس (أي
   نص). فكانت بتوصلنا طلبات من غير موبايل أو برقم ناقص أو من غير
   عنوان، ومحدش يقدر يوصل للعميل يأكّد الطلب ولا المندوب يوصّله.
   fields = { name, phone, email, gov, address } كل واحد { el } (عنصر الإدخال)
   بترجّع { ok, phone } — phone بالشكل الموحّد 01xxxxxxxxx — ولو فيه
   خطأ بتعلّم الحقل بالأحمر وتكتب السبب تحته وتعمل focus عليه. */
/* صفحات التشغيل (Direct Order مثلاً) مش بتحمّل i18n.js — فرسايل الأخطاء
   ليها نسخة عربي احتياطية هنا بدل ما الدالة توقع */
const TS_CO_ERR_AR = {
  co_err_name: 'اكتب اسم العميل بالكامل', co_err_phone: 'اكتب رقم موبايل مصري صحيح، مثال: 01012345678',
  co_err_email: 'الإيميل ده شكله مش مظبوط — صحّحه أو سيبه فاضي', co_err_gov: 'اختار المحافظة',
  co_err_address: 'اكتب العنوان بالتفصيل (المنطقة، الشارع، رقم العمارة)'
};
function tsTSafe(key){ return typeof tsT === 'function' ? tsT(key) : (TS_CO_ERR_AR[key] || key); }
function tsCheckoutValidate(fields){
  Object.values(fields).forEach(f => f && f.el && tsFieldError(f.el, ''));
  const val = k => (fields[k] && fields[k].el ? String(fields[k].el.value || '').trim() : '');
  const fail = (k, key) => { const el = fields[k].el; tsFieldError(el, tsTSafe(key)); try{ el.focus({preventScroll:true}); el.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){} return { ok:false }; };

  if(fields.name && val('name').length < 3) return fail('name', 'co_err_name');
  const phone = tsValidEgMobile(val('phone'));
  if(fields.phone && !phone) return fail('phone', 'co_err_phone');
  const email = val('email');
  if(fields.email && email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail('email', 'co_err_email');
  if(fields.gov && !val('gov')) return fail('gov', 'co_err_gov');
  if(fields.address && val('address').length < 8) return fail('address', 'co_err_address');
  return { ok:true, phone };
}
/** أرقام الطلبات في شاشة النجاح كروابط تتبع (track.html?order=…) بدل نص بس */
function tsRenderOrderLinks(el, orderNos){
  if(!el) return;
  el.innerHTML = orderNos.map(n =>
    '<a href="track.html?order=' + encodeURIComponent(n) + '" style="color:inherit;text-decoration:underline;text-underline-offset:3px">' + tsEscapeHtml(n) + '</a>'
  ).join(' · ');
}
/** رسالة خطأ تحت الحقل نفسه (بدل alert) — msg فاضي = تشيلها */
function tsFieldError(el, msg){
  if(!el) return;
  const wrap = el.closest('.field') || el.parentNode;
  let box = wrap.querySelector(':scope > .field-err-msg');
  el.classList.toggle('field-err', !!msg);
  if(!msg){ if(box) box.remove(); return; }
  if(!box){ box = document.createElement('div'); box.className = 'field-err-msg'; wrap.appendChild(box); }
  box.textContent = msg;
  if(!el.dataset.errHook){
    el.dataset.errHook = '1';
    el.addEventListener('input', () => tsFieldError(el, ''));
    el.addEventListener('change', () => tsFieldError(el, ''));
  }
}

/* ---------- Users API (Google Apps Script) ---------- */
function tsUsersApi(payload){
  return fetch(TS_CONFIG.USERS_API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  }).then(res => res.json());
}

/* الإيميل هو اسم المستخدم (مفيش username). emailProof بيرجع من
   tsVerifyEmailOtp، وorderProof = رقم طلب لو السيرفر طلب إثبات ملكية الموبايل */
function tsRegister({ phone, email, password, emailProof, orderProof, name, address, governorate }){
  return tsUsersApi({ action: 'register', phone, email, password, emailProof, orderProof, name, address, governorate });
}
function tsRegisterPrecheck({ phone, email, orderProof }){
  return tsUsersApi({ action: 'registerPrecheck', phone, email, orderProof });
}
function tsLogin({ identifier, password }){
  return tsUsersApi({ action: 'login', identifier, password });
}
function tsUpdateProfile({ phone, name, address, governorate, email, token }){
  return tsUsersApi({ action: 'updateProfile', phone, name, address, governorate, email, token });
}
function tsSendEmailOtp(email){
  return tsUsersApi({ action: 'sendEmailOtp', email });
}
function tsVerifyEmailOtp(email, code){
  return tsUsersApi({ action: 'verifyEmailOtp', email, code });
}

/* ---------- forgot password (code sent to the account's email) ---------- */
function tsRequestPasswordReset(identifier){
  return tsUsersApi({ action: 'requestPasswordReset', identifier });
}
function tsResetPassword(identifier, code, newPassword){
  return tsUsersApi({ action: 'resetPassword', identifier, code, newPassword });
}

/* ---------- show/hide password toggle ----------
   Call tsInitPasswordToggles() once per page. It wraps every
   <input type="password"> in a .pw-wrap and adds an eye button
   that flips the field between password/text. */
function tsInitPasswordToggles(){
  document.querySelectorAll('input[type="password"]').forEach(input=>{
    if(input.closest('.pw-wrap')) return;              // already wired
    const wrap = document.createElement('div');
    wrap.className = 'pw-wrap';
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pw-toggle';
    btn.innerHTML = '👁️';
    btn.setAttribute('aria-label', (typeof tsT==='function') ? tsT('pw_show') : 'Show password');
    btn.addEventListener('click', ()=>{
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      btn.innerHTML = show ? '🙈' : '👁️';
      btn.setAttribute('aria-label', (typeof tsT==='function') ? tsT(show?'pw_hide':'pw_show') : (show?'Hide password':'Show password'));
      input.focus();
    });
    wrap.appendChild(btn);
  });
}

/* ---------- Orders API — رابط واحد للقراءة والكتابة ----------
   GET  → يرجّع بيانات محدودة حسب هوية الطالب (شوف Orders_Code.gs):
          - عميل مسجّل دخول (phone+token) → طلباته هو بس
          - رقم طلب معيّن (order=) → الطلب ده + إخوته بس (تتبع عام)
          - موظف مسجّل دخول (staffToken) → كل الطلبات (الداشبوردات الداخلية)
   POST → يضيف طلب جديد أو يحدّث حالة (للحاسبة والمارت والداشبورد) */
function tsFetchMyOrders(phone, token){
  const target = tsNormalizePhone(phone);
  const url = TS_CONFIG.ORDERS_SCRIPT_URL
    + '?phone=' + encodeURIComponent(phone || '')
    + '&token=' + encodeURIComponent(token || '');
  return fetch(url)
    .then(res => res.json())
    // السيرفر بيفلتر بالموبايل أصلاً — الفلتر هنا احتياطي بس. طلب من غير
    // موبايل في الرد بيتقبل (السيرفر الجديد بيبعت حقول محددة للعميل)
    .then(rows => Array.isArray(rows) ? rows.filter(o => !o.phone || tsNormalizePhone(o.phone) === target) : []);
}

/* تتبع عام برقم الطلب — من غير تسجيل دخول، بس برقم الطلب بالظبط.
   السيرفر بيرجّع { success, order, siblings } بدل الشيت كامل. */
function tsFetchOrderByNumber(orderNumber){
  const url = TS_CONFIG.ORDERS_SCRIPT_URL + '?order=' + encodeURIComponent(orderNumber || '');
  return fetch(url).then(res => res.json());
}

/* ═══════════════════════════════════════════════════════════
   📮 إرسال POST لأي سكريبت Apps Script — "وصل ولا مـوصلش" بس
   ═══════════════════════════════════════════════════════════
   🐛→✅ المشكلة اللي كانت بتخلي الطلب يتسجل في الشيت ويتبعت إيميله
   فعلاً، ومع ذلك الموقع يقول "0 من 1 اتسجلوا، جرب تاني":

   Apps Script مبيردّش على الـ POST مباشرة — بيرد بـ 302 Redirect
   لرابط تاني على دومين مختلف:
       https://script.googleusercontent.com/macros/echo?user_content_key=...
   المتصفح لازم يتابع الريديركت ده عشان يقرا الرد. الـ POST نفسه
   بيبقى خلص واتنفذ بالكامل على سيرفرات جوجل قبل الريديركت ده خالص
   (عشان كده الصف بيتسجل والإيميل بيتبعت عادي) — لكن لو الرابط
   التاني رجع 404 (وده اللي بيحصل، وظاهر في Console كـ
   "echo:1 Failed to load resource: 404")، الـ fetch بيرمي error،
   فالكود كان بيفتكر إن الطلب فشل وهو ناجح.

   الحل: mode:'no-cors' — الطلب بيتبعت ويتنفذ بنفس الشكل بالظبط،
   بس المتصفح مبيحاولش يقرا الرد (بيرجع "opaque")، فمفيش أي فرصة
   إن مشكلة في قراءة الرد تتحول لـ"فشل" وهمي. النتيجة: بترجع true
   لو الطلب اتبعت فعلاً، وبترمي exception بس لو النت نفسه فاصل.

   ⚠️ الثمن: مبقاش نقدر نقرا رسالة السيرفر (Order Saved / Success /
   Unauthorized). عشان كده أي شاشة محتاجة تتأكد إن التعديل نزل فعلاً
   بتعمل تحديث بـ GET بعدها (والـ GET شغال تمام — نفس الريديركت
   بيرجع 200 معاه)، وده بيكشف انتهاء الجلسة أو أي مشكلة حقيقية. */
function tsPostScript(url, payload){
  return fetch(url, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify(payload)
  }).then(() => true);
}

/* يُستخدم من الحاسبة والمارت — نفس الرابط لكل مصادر الطلبات.

   📋 صيغتين لأرقام الطلبات:
     • الخدمة الدولية (الحاسبة/الطلبات المباشرة) → TRY + 8 أرقام
     • Try Shoppy Mart                          → MART + 6 أرقام
   الاتنين بيتسجلوا في نفس شيت الطلبات وبيتتبعوا من نفس الصفحة —
   البادئة بتفرّق نوع الطلب من أول نظرة على الرقم من غير ما تفتحه. */
function tsSubmitOrderRow(payload){
  return tsPostScript(TS_CONFIG.ORDERS_SCRIPT_URL, payload);
}

function tsGenerateMartOrderNumber(){
  return "MART" + Math.floor(100000 + Math.random() * 900000);
}

/* ---------- Mart products — شيت وسكريبت منفصلين تمامًا عن الطلبات ----------
   GET  → قائمة كل منتجات المارت (من الشيت المستقل)
   POST action:saveMartProduct/deleteMartProduct → عمليات إدارية (تحتاج adminKey) */
function tsFetchMartProducts(){
  return fetch(TS_CONFIG.MART_PRODUCTS_SCRIPT_URL)
    .then(res => res.json());
}
/* 🔐 دخول موظف لوحة إدارة المارت — نفس حساب الموظف المستخدم في
   أدوات التشغيل بالظبط، بيتحقق منه في السيرفر مقابل شيت الموظفين
   (مفيش أي مفتاح أو باسورد مكتوب في كود الموقع). */
function tsMartAdminLogin(username, password){
  return fetch(TS_CONFIG.MART_PRODUCTS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'loginMartAdmin', username, password })
  }).then(res => res.json());
}
function tsSaveMartProduct(product, username, password){
  return fetch(TS_CONFIG.MART_PRODUCTS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'saveMartProduct', username, password, product })
  }).then(res => res.json());
}
function tsDeleteMartProduct(id, username, password){
  return fetch(TS_CONFIG.MART_PRODUCTS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'deleteMartProduct', username, password, id })
  }).then(res => res.json());
}
/* جلب اسم/وصف/صورة منتج تلقائيًا من رابط خارجي (نظام طبقات متعدد
   في MartProducts_Code.gs). محمي بنفس حساب الموظف عشان محدش
   يستخدم السيرفر كأداة جلب/بروكسي مجانية لأي حد. */
function tsFetchMartProductInfo(link, username, password){
  return fetch(TS_CONFIG.MART_PRODUCTS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'fetchMartProductInfo', link, username, password })
  }).then(res => res.json());
}
/* 📉 تقليل مخزون المارت مبقاش من المتصفح — السيرفر بيعمله لحظة حفظ
   الطلب (applyMartCatalog_ في Orders_Code.gs) بعد ما يراجع السعر. */

/* ---------- Try Shoppy Mart cart (localStorage, keyed per browser) ----------
   Cart item shape: { id, name:{en,ar}, price, qty, cat } */
function tsGetCart(){
  try{ return JSON.parse(localStorage.getItem('ts_cart')) || []; }catch(e){ return []; }
}
function tsSaveCart(cart){
  localStorage.setItem('ts_cart', JSON.stringify(cart));
  document.dispatchEvent(new CustomEvent('ts-cart-changed', { detail: { cart } }));
}
function tsAddToCart(product){
  const cart = tsGetCart();
  const existing = cart.find(i => i.id === product.id);
  if(existing){ existing.qty += 1; }
  else { cart.push({ id: product.id, name: product.name, price: product.price, cat: product.cat, qty: 1 }); }
  tsSaveCart(cart);
  return cart;
}
function tsUpdateCartQty(id, qty){
  let cart = tsGetCart();
  if(qty <= 0){ cart = cart.filter(i => i.id !== id); }
  else { const item = cart.find(i => i.id === id); if(item) item.qty = qty; }
  tsSaveCart(cart);
  return cart;
}
function tsRemoveFromCart(id){
  const cart = tsGetCart().filter(i => i.id !== id);
  tsSaveCart(cart);
  return cart;
}
function tsClearCart(){
  tsSaveCart([]);
}
function tsCartCount(){
  return tsGetCart().reduce((sum, i) => sum + i.qty, 0);
}
function tsCartSubtotal(){
  return tsGetCart().reduce((sum, i) => sum + i.qty * i.price, 0);
}

/* ---------- Calculator cart (localStorage, separate from the Mart cart) ----------
   Item shape: { tempId, link, usd (unit price), qty, weightGrams, category,
                 size, color, notes, finalPrice (already ×qty) } */
function tsGetCalcCart(){
  try{ return JSON.parse(localStorage.getItem('ts_calc_cart')) || []; }catch(e){ return []; }
}
function tsSaveCalcCart(cart){
  localStorage.setItem('ts_calc_cart', JSON.stringify(cart));
}
function tsAddToCalcCart(item){
  const cart = tsGetCalcCart();
  item.tempId = Date.now() + '-' + Math.floor(Math.random()*10000);
  cart.push(item);
  tsSaveCalcCart(cart);
  return cart;
}
function tsRemoveFromCalcCart(tempId){
  const cart = tsGetCalcCart().filter(i => i.tempId !== tempId);
  tsSaveCalcCart(cart);
  return cart;
}
function tsClearCalcCart(){
  tsSaveCalcCart([]);
}
function tsCalcCartTotal(){
  return tsGetCalcCart().reduce((sum, i) => sum + (parseFloat(i.finalPrice)||0), 0);
}
