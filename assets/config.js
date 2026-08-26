/* =========================================================
   TRY SHOPPY — site configuration
   ⚠️  3 روابط سكريبتات منفصلة — كل واحد لشيت مستقل:
   1) الطلبات (الحاسبة + التتبع + طلبات المارت الفعلية)
   2) حسابات العملاء
   3) كتالوج منتجات المارت (شيت منفصل تمامًا عن الطلبات)
   ========================================================= */
const TS_CONFIG = {
  /* ── رابط سكريبت الطلبات الموحّد (GET + POST) ──
     نفس الرابط من ملف script_link.js بتاعك             */
  ORDERS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbza03fz6jSejbTfZ80k71l4uX7iWAPx4mVez-baePeWegb5BVEvxgP5fR7mWbHuAZSx/exec",

  /* ── رابط سكريبت الحسابات (حسابات العملاء) ──
     انشر Users_Code.gs واحط الرابط هنا              */
  USERS_API_URL: "https://script.google.com/macros/s/AKfycbxZdEi8c8xRh-aMvP_fORqAwRAr7JF18_QH57RVBa3lHpM73WNCCaE_6nW6hO2SiaIV/exec",

  /* ── رابط سكريبت منتجات المارت (شيت منفصل تمامًا) ──
     انشر backend/MartProducts_Code.gs على شيت جديد
     مستقل، واحط الرابط هنا                          */
  MART_PRODUCTS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxdYhoWNasClKfYhGlGqPVQIxtbOpZGkPgQT_ccKDkevj-8O68_s1iFYyZBRp4TT813/exec",

  SUPPORT_PHONE: "201005609642"
};

/* اسماء مستعارة للتوافق مع أي كود قديم يستخدم الاسمين القديمين */
Object.defineProperty(TS_CONFIG, 'ORDERS_SUBMIT_URL', { get(){ return this.ORDERS_SCRIPT_URL; } });
Object.defineProperty(TS_CONFIG, 'ORDERS_READ_URL',   { get(){ return this.ORDERS_SCRIPT_URL; } });
