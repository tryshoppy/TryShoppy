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
  ORDERS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwO9TYdd80UMLGz2OWLVeOmEs15XmirUZTIA9q21pGqytPNJyGu5vkcHd7HWTS0_G3RYg/exec",

  /* ── رابط سكريبت الحسابات (حسابات العملاء) ──
     انشر Users_Code.gs واحط الرابط هنا              */
  USERS_API_URL: "https://script.google.com/macros/s/AKfycbxZdEi8c8xRh-aMvP_fORqAwRAr7JF18_QH57RVBa3lHpM73WNCCaE_6nW6hO2SiaIV/exec",

  /* ── رابط سكريبت منتجات المارت (شيت منفصل تمامًا) ──
     انشر backend/MartProducts_Code.gs على شيت جديد
     مستقل، واحط الرابط هنا                          */
  MART_PRODUCTS_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxAWNgaG1NfX5IllmDXjZ0Bsa7AzPYk4RizpqRotb4Y2YnJ81B9zdjjCytQOP4rfFOJOA/exec",

  SUPPORT_PHONE: "201005609642"
};

/* اسماء مستعارة للتوافق مع أي كود قديم يستخدم الاسمين القديمين */
Object.defineProperty(TS_CONFIG, 'ORDERS_SUBMIT_URL', { get(){ return this.ORDERS_SCRIPT_URL; } });
Object.defineProperty(TS_CONFIG, 'ORDERS_READ_URL',   { get(){ return this.ORDERS_SCRIPT_URL; } });
