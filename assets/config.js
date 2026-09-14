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
  ORDERS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx5yfveR8j01Yaa17zvFRueQ2Tf0J3kgChhmbsqrVTaovkTiKiw3CU0RFbz6myUblVZ/exec",

  /* ── رابط سكريبت الحسابات (حسابات العملاء) ──
     انشر Users_Code.gs واحط الرابط هنا              */
  USERS_API_URL: "https://script.google.com/macros/s/AKfycbyZxsg-z7oNsAw0NsKsCKY0eUn7GTpEEG2LSQdDtyFQJTguRglEfZwxed5hz4jF-M6Ilw/exec",

  /* ── رابط سكريبت منتجات المارت (شيت منفصل تمامًا) ──
     انشر backend/MartProducts_Code.gs على شيت جديد
     مستقل، واحط الرابط هنا                          */
  MART_PRODUCTS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbz6J-BjsME8PowOovnR-1Kg9xULT6_tXGfPdsfFi_O9rel4E9BeTgJjd7yP3_W16ccx5w/exec",

  SUPPORT_PHONE: "201005609642",

  /* ── 📣 Google (إعلانات المارت) ──────────────────────────────
     سيبهم فاضيين لحد ما تعمل الحسابات — الكود بيتخطى تحميل
     الـ Google tag بالكامل طالما الحقول دي فاضية، فمفيش أي
     سكريبت زيادة بيتحمّل على الموقع قبل ما تحتاجه فعلًا.

     GA4_ID       → من Google Analytics 4 (شكله G-XXXXXXXXXX)
     ADS_ID       → من Google Ads > Data manager (شكله AW-XXXXXXXXX)
     PURCHASE_LABEL → لو هتستخدم conversion action مباشرة من Google
                      Ads بدل ما تستورد الحدث من GA4. سيبه فاضي
                      لو هتعتمد على الاستيراد من GA4 (الأسهل).     */
  GOOGLE: {
    GA4_ID: "",
    ADS_ID: "",
    PURCHASE_LABEL: ""
  }
};

/* اسماء مستعارة للتوافق مع أي كود قديم يستخدم الاسمين القديمين */
Object.defineProperty(TS_CONFIG, 'ORDERS_SUBMIT_URL', { get(){ return this.ORDERS_SCRIPT_URL; } });
Object.defineProperty(TS_CONFIG, 'ORDERS_READ_URL',   { get(){ return this.ORDERS_SCRIPT_URL; } });
