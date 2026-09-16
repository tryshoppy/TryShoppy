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

/* رقم بصيغة العملة المصرية */
function tsWaMoney(v){
  const n = parseFloat(v) || 0;
  return n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ج.م';
}

/* موعد الوصول بيتقرا من الشيت (عمود arrivaldate). وقت إنشاء الطلب
   الموعد لسه مش موجود — الطلب بيبقى "قيد المراجعة" — فبنكتب
   للعميل الحقيقة بدل ما نسيب السطر فاضي أو نخترع تاريخ. */
function tsWaArrival(date){
  const d = String(date == null ? '' : date).trim();
  return d ? d : 'يتم تحديده بعد تأكيد الطلب';
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
function tsWaItemBlock(item){
  const qty  = parseInt(item.qty, 10) || 1;
  const line = parseFloat(item.lineTotal) || 0;
  const unit = (item.unitPrice !== undefined && item.unitPrice !== null && item.unitPrice !== '')
    ? (parseFloat(item.unitPrice) || 0)
    : (qty > 0 ? line / qty : line);

  const rows = [];
  const label = item.index ? 'منتج ' + item.index + ': ' : '';
  if(item.orderNo) rows.push('🔖 *' + item.orderNo + '*');
  if(item.link)    rows.push('🔗 ' + label + item.link);
  else if(item.name) rows.push('🔗 ' + label + item.name);
  if(item.link && item.name) rows.push('الصنف: ' + item.name);

  rows.push('العدد: *' + qty + '*');
  rows.push('سعر القطعة: *' + tsWaMoney(unit) + '*');
  rows.push('إجمالي القطعة: *' + tsWaMoney(line) + '*');

  const specs = String(item.specs == null ? '' : item.specs).trim();
  if(specs) rows.push('المواصفات: ' + specs);

  (item.extraLines || []).forEach(l => { if(l) rows.push(l); });

  /* hideArrival: للرسائل اللي الأوردر فيها وصل مصر فعلاً، أو اللي
     الموعد مكتوب في عنوان المجموعة فوق. من غيرها كانت رسالة
     "طلبك وصل وجاهز للتسليم" هتقول تحتيها "موعد الوصول: يتم
     تحديده بعد تأكيد الطلب" — تناقض قدام العميل. */
  if(!item.hideArrival) rows.push('موعد الوصول: ' + tsWaArrival(tsFormatSheetDate(item.arrivalDate)));

  const status = String(item.status == null ? '' : item.status).trim();
  if(status) rows.push('الحالة: ' + status);

  return rows.join('\n');
}

/* الرسالة الكاملة.
   opts = {
     to: 'customer' | 'shop',
     customerName, phone, governorate, address,
     items: [...], total,
     intro, outro, extraTotals[]
   }
   to:'shop'     → رسالة للفريق، بتتضمن بيانات تواصل العميل
   to:'customer' → رسالة للعميل، بتتضمن لينك التتبع            */
function tsWaMessage(opts){
  const o = opts || {};
  const toCustomer = o.to !== 'shop';
  const items = o.items || [];
  const name = String(o.customerName || '').trim();

  const parts = [];

  if(o.intro){
    parts.push(o.intro);
  } else if(toCustomer){
    parts.push('السلام عليكم ' + (name ? 'أ/ ' + name : 'حضرتك') + ' 👋');
    parts.push('تم تسجيل طلبك في Try Shoppy ✅');
  } else {
    parts.push('🛒 طلب جديد — Try Shoppy');
  }

  parts.push('');
  items.forEach(it => {
    parts.push(TS_WA_RULE);
    parts.push(tsWaItemBlock(it));
  });
  if(items.length) parts.push(TS_WA_RULE);

  const total = (o.total !== undefined && o.total !== null)
    ? parseFloat(o.total) || 0
    : items.reduce((s, i) => s + (parseFloat(i.lineTotal) || 0), 0);

  parts.push('');
  parts.push('💰 *الإجمالي الكلي: ' + tsWaMoney(total) + '*');

  /* 💵 العربون — بيظهر بس لو فيه مبلغ مدفوع فعلاً. في الطلبات
     الجديدة العربون لسه ما اتحصّلش، فسطر "المدفوع مقدمًا: 0"
     هيبقى ضوضاء. ولما يبقى فيه عربون، الرقم اللي العميل محتاجه
     فعلاً هو المتبقي عند الاستلام مش الإجمالي. */
  const deposit = parseFloat(o.deposit) || 0;
  if(deposit > 0){
    parts.push('💵 المدفوع مقدمًا: ' + tsWaMoney(deposit));
    parts.push('📌 *المطلوب عند الاستلام: ' + tsWaMoney(total - deposit) + '*');
  }

  (o.extraTotals || []).forEach(l => { if(l) parts.push(l); });

  if(!toCustomer){
    parts.push('');
    if(name)           parts.push('👤 الاسم: ' + name);
    if(o.phone)        parts.push('📞 الموبايل: ' + o.phone);
    if(o.governorate)  parts.push('📍 المحافظة: ' + o.governorate);
    if(o.address)      parts.push('🏠 العنوان: ' + o.address);
  }

  parts.push('');
  if(o.outro){
    parts.push(o.outro);
  } else if(toCustomer){
    parts.push('تابع طلبك في أي وقت من هنا:');
    parts.push(TS_TRACK_URL);
    parts.push('');
    parts.push('لأي استفسار إحنا معاك 🙏');
  } else {
    parts.push('مستني تأكيدكم 🙏');
  }

  return parts.join('\n');
}

/* فتح واتساب برقم معيّن. من غير رقم بيروح لرقم الدعم. */
function tsWaOpen(phone, message){
  const support = (typeof TS_CONFIG !== 'undefined' && TS_CONFIG.SUPPORT_PHONE) ? TS_CONFIG.SUPPORT_PHONE : '201005609642';
  let target = String(phone || '').replace(/\D/g, '');
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
function tsNormalizePhone(phone){
  return String(phone || '').replace(/\D/g, '').replace(/^2/, '').replace(/^0/, '');
}

/* ---------- Users API (Google Apps Script) ---------- */
function tsUsersApi(payload){
  return fetch(TS_CONFIG.USERS_API_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  }).then(res => res.json());
}

function tsRegister({ phone, email, username, password, name, address, governorate }){
  return tsUsersApi({ action: 'register', phone, email, username, password, name, address, governorate });
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
    .then(rows => Array.isArray(rows) ? rows.filter(o => tsNormalizePhone(o.phone) === target) : []);
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
/* بعد شراء منتج فعليًا من المارت، بننقص الكمية في الشيت مباشرة —
   من غير adminKey لأنه فعل عميل عادي. السيرفر بيتأكد إن الرقم
   ميقلش عن صفر، ولو فشل النداء لأي سبب الطلب برضه بيكون اتسجل
   بنجاح في شيت الطلبات (النقصان في المخزون مش شرط لنجاح الطلب). */
function tsDecrementMartStock(id, qty){
  return fetch(TS_CONFIG.MART_PRODUCTS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({ action: 'decrementStock', id, qty })
  }).then(res => res.json());
}

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
