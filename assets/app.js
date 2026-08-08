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
    burger.addEventListener('click', ()=> menu.classList.toggle('open'));
  }
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
  tsInitReveal();
  setTimeout(tsInitReveal, 50);
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

/* يُستخدم من الحاسبة والمارت — نفس الرابط، فقط يختلف رقم الطلب
   (TRY-xxxxxx للحاسبة العادية، TRY-MARTxxxxxx للمارت) */
function tsSubmitOrderRow(payload){
  return fetch(TS_CONFIG.ORDERS_SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

function tsGenerateMartOrderNumber(){
  return "TRY-MART" + Math.floor(100000 + Math.random() * 900000);
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
