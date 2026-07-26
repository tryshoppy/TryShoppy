// ============================================
//   TRY SHOPPY — ملف الحسابات المشترك
//   المعادلة وجداول الأسعار كلها هنا بس
//   ✏️ عايز تغيّر أي سعر أو فئة أو نسبة؟ غيّرها هنا فقط
//      وهتتطبق تلقائيًا على كل حاسبات الموقع
//      (calculator.html, calculatorOP.html, وأي ملف جديد يستخدم الملف ده)
// ============================================

// جدول: تكلفة أساسية لكل فئة (بالجنيه المصري)
const TRYSHOPPY_CATEGORY_BASE = {
  "Clothes (Regular)": 100, "Jacket or BALTO": 350, "Electronics": 400, "Shoes (Regular)": 450,
  "Food": 200, "Sunglasses": 300, "Shoes (Boot)": 500, "Watches": 150, "Accessories": 200,
  "Cosmetics": 300, "CarParts": 400, "Vitamin or Supplements": 370, "Shampoo or Conditioner": 300,
  "Small Size Hand bag (women)": 150, "Back bag (or Lap bag)": 400, "Large Size Hand bag (women)": 350, "Stationary": 200
};

// جدول: سعر الجرام لكل فئة (يستخدم لو الوزن أعلى من 300 جرام)
const TRYSHOPPY_WEIGHT_RATES = {
  "Clothes (Regular)": 30, "Jacket or BALTO": 30, "Electronics": 80, "Shoes (Regular)": 35,
  "Food": 35, "Sunglasses": 40, "Shoes (Boot)": 35, "Watches": 30, "Accessories": 40,
  "Cosmetics": 80, "CarParts": 50, "Vitamin or Supplements": 110, "Shampoo or Conditioner": 110,
  "Small Size Hand bag (women)": 35, "Back bag (or Lap bag)": 35, "Large Size Hand bag (women)": 35, "Stationary": 35
};

// جدول: نطاقات وزن الجميز (Gummies) حسب عدد الحبات
const TRYSHOPPY_GUMMIES_RANGES = [
  { min: 1,   max: 70,  weight: 1   },
  { min: 71,  max: 150, weight: 301 },
  { min: 151, max: 250, weight: 450 },
  { min: 251, max: 350, weight: 570 },
  { min: 351, max: 500, weight: 750 },
  { min: 501, max: 700, weight: 950 }
];

// جدول: نطاقات وزن الكبسولات (Capsules) حسب عدد الحبات
const TRYSHOPPY_CAPSULES_RANGES = [
  { min: 1,   max: 120, weight: 1   },
  { min: 121, max: 180, weight: 301 },
  { min: 181, max: 280, weight: 450 },
  { min: 281, max: 400, weight: 600 },
  { min: 401, max: 700, weight: 800 }
];

/**
 * يرجّع جدول النطاقات المناسب حسب نوع المنتج
 * @param {"capsules"|"gummies"} type
 * @returns {Array<{min:number,max:number,weight:number}>}
 */
function tryShoppyGetSupplementRanges(type) {
  return type === "gummies" ? TRYSHOPPY_GUMMIES_RANGES : TRYSHOPPY_CAPSULES_RANGES;
}

/**
 * تقريب السعر لأقرب 50 أو 100 (الأقرب للسعر الأصلي)
 * @param {number} price
 * @returns {number}
 */
function tryShoppyRoundSmart(price) {
  const round50 = Math.round(price / 50) * 50;
  const round100 = Math.round(price / 100) * 100;
  return Math.abs(price - round50) < Math.abs(price - round100) ? round50 : round100;
}

/**
 * المعادلة الأساسية لحساب تكلفة الشحن + الجمارك — دي القلب اللي كل الحاسبات بتنده عليه
 *
 * @param {Object} p
 * @param {number} p.usd        - سعر المنتج بالدولار (سعر الوحدة، قبل ضرب الكمية)
 * @param {string} p.category   - الفئة (لازم تطابق مفاتيح TRYSHOPPY_CATEGORY_BASE)
 * @param {number} p.weightGrams- الوزن المستخدم في الحساب بالجرام (فعلي أو حجمي، الأكبر منهم)
 * @param {number} [p.quantity=1] - الكمية (لو الحاسبة معندهاش حقل كمية، سيبها فاضية وهتاخد 1)
 * @returns {{ finalPrice:number, basicPrice:number, weightPrice:number }}
 */
function tryShoppyCalculatePrice({ usd, category, weightGrams, quantity = 1 }) {
  let base = 0, extra = 0, mult = 1;

  if (usd <= 31.99) { mult = 2.80; base = usd * 27.5; extra = 50; }
  else if (usd <= 71.99) { mult = 2.90; base = usd * 26; extra = 80; }
  else if (usd <= 180.99) { mult = 3.00; base = usd * 24; extra = 80; }
  else { mult = 3.10; base = usd * 24; extra = 80; }

  const catBase = TRYSHOPPY_CATEGORY_BASE[category] || 0;
  const weightRate = TRYSHOPPY_WEIGHT_RATES[category] || 0;

  const basicPrice = (base + catBase + extra) * mult;
  let weightPrice = basicPrice;

  if (weightGrams > 300) {
    weightPrice = base + catBase + extra + (weightGrams / 1000 * weightRate * 55);
  }

  const finalPrice = tryShoppyRoundSmart(Math.max(basicPrice, weightPrice) * quantity);

  return { finalPrice, basicPrice, weightPrice };
}

// ملاحظة: الملف ده متحمّل بـ <script src="function_calc.js"></script> عادي
// (بدون type="module")، فكل الدوال والجداول فوق متاحة global لأي حاسبة بتحمّله.
