/* =========================================================
   TRY SHOPPY — Google tag (GA4 + Google Ads)
   =========================================================
   الغرض: قياس أحداث المارت للحملات على Google.

   ⚙️ بيتحمّل بس لو فيه ID متحط في TS_CONFIG.GOOGLE — طالما
   الحقول فاضية، الملف ده بيخرج من غير ما يحمّل أي سكريبت خارجي
   ولا يعمل أي طلب شبكة. يعني تقدر ترفعه دلوقتي عادي من غير ما
   يأثر على سرعة الموقع لحد ما تجهّز الحسابات.

   ⚠️ item_id في كل حدث لازم يساوي id في فييد الـ Merchant Center
   بالظبط (TSM-XXXXXXXX). ده اللي بيخلي Google يربط الإعلان
   بالمنتج، وبدونه الـ dynamic remarketing مش هيشتغل خالص.
   ========================================================= */

(function () {
  var cfg = (typeof TS_CONFIG !== 'undefined' && TS_CONFIG.GOOGLE) || {};
  var ids = [cfg.GA4_ID, cfg.ADS_ID].filter(function (id) {
    /* بنتجاهل القيم الفاضية والـ placeholders بتاعة الشرح */
    return id && !/X{3,}/.test(id);
  });

  window.tsGoogleReady = ids.length > 0;
  if (!window.tsGoogleReady) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  ids.forEach(function (id) { window.gtag('config', id); });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ids[0]);
  document.head.appendChild(s);
})();

/* حدث GA4 عادي — بيتجاهل نفسه بهدوء لو الـ tag مش محمّل */
function tsGa(name, params) {
  if (typeof gtag === 'function') gtag('event', name, params || {});
}

/* يحوّل منتج مارت لعنصر GA4 ecommerce.
   بياخد إما منتج من MART_PRODUCTS أو سطر من السلة. */
function tsGaItem(p, qty) {
  return {
    item_id: String(p.id),
    item_name: (p.nameEn || (p.name && p.name.en) || '').slice(0, 100),
    item_brand: 'Try Shoppy',
    item_category: p.category || p.cat || '',
    price: parseFloat(p.price) || 0,
    quantity: qty || 1
  };
}

/* 💰 حدث الشراء — بيتبعت لـ GA4، وكمان لـ Google Ads مباشرة لو
   حطيت PURCHASE_LABEL. لو سايبه فاضي، استورد حدث purchase من
   GA4 كـ conversion جوه Google Ads (الطريقة اللي Google بتنصح
   بيها دلوقتي، ومفيهاش لصق labels).

   transaction_id = رقم الطلب الحقيقي (TRY + 8 أرقام) عشان لو
   الصفحة اتعملها refresh أو العميل رجع عليها، Google يعرف إنها
   نفس العملية ومايحسبهاش مرتين. */
function tsGaPurchase(transactionId, value, items) {
  tsGa('purchase', {
    transaction_id: String(transactionId),
    value: value,
    currency: 'EGP',
    items: items
  });

  var cfg = (typeof TS_CONFIG !== 'undefined' && TS_CONFIG.GOOGLE) || {};
  if (cfg.ADS_ID && cfg.PURCHASE_LABEL && typeof gtag === 'function') {
    gtag('event', 'conversion', {
      send_to: cfg.ADS_ID + '/' + cfg.PURCHASE_LABEL,
      value: value,
      currency: 'EGP',
      transaction_id: String(transactionId)
    });
  }
}

/* 🔖 بيانات المنتج المهيكلة (Schema.org Product) —
   بتتحقن في الصفحة لما العميل يفتح رابط منتج بعينه
   (mart.html?product=ID)، وده الرابط اللي الإعلان بيوديله.

   ليه ده مهم: Merchant Center بيزور صفحة الهبوط ويقارن السعر
   والتوافر اللي فيها بالفييد. منتجات المارت بتتحمّل بجافاسكريبت
   من Apps Script على دومين تاني، فالزاحف ممكن ميشوفش السعر خالص
   ويرفض المنتج بسبب "price mismatch". الـ JSON-LD ده بيديله
   القيم صريحة في الصفحة نفسها. */
function tsInjectProductJsonLd(p, pageUrl) {
  if (!p) return;
  var old = document.getElementById('ts-product-jsonld');
  if (old) old.remove();

  var images = String(p.image || '').split('|').map(function (s) { return s.trim(); }).filter(Boolean);
  var inStock = (parseInt(p.stock, 10) || 0) > 0;

  var data = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    productID: String(p.id),
    sku: String(p.id),
    name: p.nameEn || p.nameAr || '',
    description: p.descEn || p.descAr || p.nameEn || '',
    image: images,
    brand: { '@type': 'Brand', name: 'Try Shoppy' },
    offers: {
      '@type': 'Offer',
      url: pageUrl,
      priceCurrency: 'EGP',
      price: (parseFloat(p.price) || 0).toFixed(2),
      availability: inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: tsSchemaCondition(p.label),
      seller: { '@type': 'Organization', name: 'Try Shoppy' }
    }
  };

  var tag = document.createElement('script');
  tag.type = 'application/ld+json';
  tag.id = 'ts-product-jsonld';
  tag.textContent = JSON.stringify(data);
  document.head.appendChild(tag);
}

/* ⚠️ لازم تطابق نفس الماب اللي في فييد Google جوه
   MartProducts_Code.gs — أي اختلاف بين الاتنين بيبقى
   "mismatched value" في Merchant Center. */
function tsSchemaCondition(label) {
  switch (label) {
    case 'brand_new':
    case 'heavy_discount':
      return 'https://schema.org/NewCondition';
    case 'open_box':
    case 'pre_delivery_return':
      return 'https://schema.org/UsedCondition';
    default:
      return 'https://schema.org/UsedCondition';
  }
}
