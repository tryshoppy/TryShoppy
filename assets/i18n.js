/* =========================================================
   TRY SHOPPY — i18n dictionary (English default, Arabic toggle)
   ========================================================= */
const I18N = {
  // ---------- nav ----------
  nav_home:        { en: "Home", ar: "الرئيسية" },
  nav_how:         { en: "How it works", ar: "إزاي بنشتغل" },
  nav_calc:        { en: "Get a Price", ar: "احسب السعر" },
  nav_track:       { en: "Track Order", ar: "تتبع طلبك" },
  nav_mart:        { en: "Try Shoppy Mart", ar: "تراي شوبي مارت" },
  nav_login:       { en: "Login / Register", ar: "تسجيل الدخول" },
  nav_dashboard:   { en: "My Account", ar: "حسابي" },
  nav_logout:      { en: "Log out", ar: "تسجيل الخروج" },

  // ---------- common (loading states — reused across pages) ----------
  common_confirming: { en: "Confirming...", ar: "جاري التأكيد..." },
  common_saving:      { en: "Saving...", ar: "جاري الحفظ..." },
  common_sending:      { en: "Sending...", ar: "جاري الإرسال..." },
  common_processing:      { en: "Processing...", ar: "جاري المعالجة..." },
  common_loading:      { en: "Loading...", ar: "جاري التحميل..." },
  common_searching:      { en: "Searching...", ar: "جاري البحث..." },
  common_checking:      { en: "Checking...", ar: "جاري التحقق..." },
  common_error_retry:      { en: "Something went wrong. Please try again.", ar: "حصل خطأ، من فضلك حاول تاني." },

  // ---------- hero ----------
  hero_eyebrow:    { en: "USA → EGYPT SHOPPING & SHIPPING", ar: "شراء وشحن من أمريكا لمصر" },
  hero_title:      { en: "Send the link.<br>We ship it home.", ar: "ابعت اللينك.<br>واحنا نوصّله لباب البيت." },
  hero_sub:        { en: "Paste a product link from Amazon, eBay, Walmart, iHerb or almost any US store. We buy it, clear customs, and deliver it anywhere in Egypt — with the full cost shown upfront.", ar: "بعت لينك المنتج من أمازون أو إيباي أو وول مارت أو آيهيرب أو أي متجر أمريكي تقريبًا. هنشتريه، نخلّص الجمارك، ونوصّله لأي مكان في مصر — والتكلفة كاملة قدامك من الأول." },
  hero_cta_price:  { en: "Calculate My Price", ar: "احسب سعر طلبي" },
  hero_cta_track:  { en: "Track an Order", ar: "تتبع طلب" },
  hero_trust:      { en: "No card? No problem — we buy on your behalf.", ar: "معندكش فيزا دولية؟ مفيش مشكلة — هنشتري نيابة عنك." },
  hero_label_from: { en: "FROM", ar: "من" },
  hero_label_to:   { en: "TO YOUR DOOR", ar: "لباب البيت" },
  hero_stamp_calc: { en: "COST CALCULATED", ar: "التكلفة محسوبة" },
  hero_stamp_cod:  { en: "COD AVAILABLE", ar: "دفع عند الاستلام" },

  // ---------- how it works ----------
  how_eyebrow:     { en: "FOUR STEPS", ar: "أربع خطوات" },
  how_title:       { en: "From product link to your doorstep", ar: "من لينك المنتج لحد باب بيتك" },
  how_sub:         { en: "One simple route, fully tracked at every checkpoint.", ar: "رحلة واحدة بسيطة، متابعة كاملة في كل محطة." },
  how1_t:          { en: "Send the link", ar: "ابعت اللينك" },
  how1_d:          { en: "Paste the product link, quantity, size or color into our calculator.", ar: "حط لينك المنتج والكمية والمقاس أو اللون في الحاسبة." },
  how2_t:          { en: "We calculate everything", ar: "نحسب كل شيء" },
  how2_d:          { en: "Item price, US shipping, our shipping, and customs — one final EGP number.", ar: "سعر المنتج + الشحن الداخلي + شحننا + الجمارك = رقم واحد نهائي بالجنيه." },
  how3_t:          { en: "You confirm", ar: "تأكد الطلب" },
  how3_d:          { en: "Approve the price and choose how you'll pay.", ar: "وافق على السعر واختار طريقة الدفع." },
  how4_t:          { en: "We buy, ship & deliver", ar: "نشتري ونشحن ونوصّل" },
  how4_d:          { en: "We purchase it abroad, bring it to Egypt, and hand it to you — tracked the whole way.", ar: "نشتري المنتج من الخارج، نجيبه مصر، ونوصّله لك — مع تتبع كامل في كل خطوة." },

  // ---------- stores ----------
  stores_eyebrow:  { en: "WE SHOP FROM", ar: "نشتري لك من" },
  stores_title:    { en: "Almost any US store", ar: "تقريباً أي متجر أمريكي" },
  stores_sub:      { en: "If it ships inside the US, we can bring it to Egypt.", ar: "لو بيتشحن جوه أمريكا، نقدر نوصلهولك مصر." },

  // ---------- why ----------
  why_eyebrow:     { en: "WHY TRY SHOPPY", ar: "ليه تراي شوبي" },
  why_title:       { en: "One local contact, instead of five foreign ones", ar: "جهة واحدة تتعامل معها، بدل خمس جهات أجنبية" },
  why1_t:          { en: "No international card needed", ar: "مش محتاج فيزا دولية" },
  why1_d:          { en: "We buy on your behalf — you pay us in Egypt, your way.", ar: "نشتري نيابة عنك — تدفع لنا في مصر بالطريقة اللي تناسبك." },
  why2_t:          { en: "Price shown before you commit", ar: "السعر النهائي قبل ما توافق" },
  why2_d:          { en: "Item, shipping and customs combined into one clear EGP price.", ar: "سعر المنتج والشحن والجمارك في رقم واحد واضح بالجنيه." },
  why3_t:          { en: "Multiple stores, one shipment", ar: "أكتر من متجر، شحنة واحدة" },
  why3_d:          { en: "Ordering from several sites? We consolidate it for you.", ar: "بتطلب من أكتر من موقع؟ هنجمعهم في شحنة واحدة." },
  why4_t:          { en: "Tracked from checkout to your door", ar: "متابعة من لحظة الشراء لباب البيت" },
  why4_d:          { en: "Live order status, anytime, with your order number.", ar: "تابع حالة طلبك في أي وقت برقم الأوردر." },

  // ---------- mart teaser ----------
  mart_eyebrow:    { en: "NEW", ar: "جديد" },
  mart_title:      { en: "Try Shoppy Mart", ar: "تراي شوبي مارت" },
  mart_sub:        { en: "High-demand, brand-new picks alongside outlet finds — open-box, pre-delivery returns and heavily discounted items — organized by category and ready to ship now.", ar: "منتجات جديدة الأكثر طلبًا، جنب منتجات الأوتليت — عبوات مفتوحة، مرتجعات قبل التسليم، ومنتجات مخفضة بشكل كبير — متقسمة حسب الفئة وجاهزة للشحن فورًا." },
  mart_cta:        { en: "Browse the Mart", ar: "تصفح المارت" },
  mart_tile_categories_sub: { en: "categories to browse", ar: "فئة للتصفح" },

  // ---------- footer: contact ----------
  foot_contact_t:  { en: "Contact Us", ar: "تواصل معنا" },

  // ---------- payments ----------
  pay_eyebrow:     { en: "PAY YOUR WAY", ar: "ادفع بالطريقة اللي تناسبك" },
  pay_title:       { en: "Flexible payment, all in Egypt", ar: "طرق دفع مرنة، كلها داخل مصر" },
  pay_cod:         { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
  pay_instapay:    { en: "InstaPay", ar: "إنستاباي" },
  pay_card:        { en: "Visa & Mastercard", ar: "فيزا وماستركارد" },
  pay_paypal:      { en: "PayPal", ar: "باي بال" },
  pay_bank:        { en: "Bank Transfer", ar: "تحويل بنكي" },

  // ---------- final CTA ----------
  cta_title:       { en: "Got a link? Let's price it.", ar: "عندك لينك؟ يلا نحسب سعره." },
  cta_sub:         { en: "It takes less than a minute to get your final price.", ar: "محتاج أقل من دقيقة لتحصل على السعر النهائي." },
  cta_btn:         { en: "Open the Calculator", ar: "افتح الحاسبة" },

  // ---------- footer ----------
  foot_about_t:    { en: "About", ar: "عن تراي شوبي" },
  foot_about_d:    { en: "Try Shoppy buys, consolidates and ships products from US stores straight to your door in Egypt.", ar: "تراي شوبي بتشتري وتجمّع وتشحن منتجات من المتاجر الأمريكية لباب بيتك في مصر." },
  foot_links_t:    { en: "Quick Links", ar: "روابط سريعة" },
  foot_support_t:  { en: "Support", ar: "الدعم" },
  foot_whatsapp:   { en: "Chat on WhatsApp", ar: "تواصل على واتساب" },
  foot_facebook:   { en: "Follow us on Facebook", ar: "تابعنا على فيسبوك" },
  foot_payments_t: { en: "Accepted Payments", ar: "طرق الدفع المتاحة" },
  foot_rights:     { en: "© 2026 Try Shoppy. All rights reserved.", ar: "© 2026 تراي شوبي. جميع الحقوق محفوظة." },

  // ---------- login / register ----------
  auth_eyebrow:    { en: "MY ACCOUNT", ar: "حسابي" },
  auth_title:      { en: "Welcome to Try Shoppy", ar: "أهلاً بيك في تراي شوبي" },
  auth_sub:        { en: "Log in to track every order in one place.", ar: "سجّل دخولك لتتابع كل طلباتك في مكان واحد." },
  tab_login:       { en: "Log In", ar: "تسجيل الدخول" },
  tab_register:    { en: "Create Account", ar: "حساب جديد" },
  lbl_identifier:  { en: "Phone or Email", ar: "رقم الموبايل أو الإيميل" },
  lbl_password:    { en: "Password", ar: "كلمة المرور" },
  lbl_username:    { en: "Username", ar: "اسم المستخدم" },
  lbl_phone:       { en: "Phone Number", ar: "رقم الموبايل" },
  lbl_email:       { en: "Email (optional)", ar: "الإيميل (اختياري)" },
  lbl_confirm:     { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  btn_login:       { en: "Log In", ar: "دخول" },
  btn_register:    { en: "Create My Account", ar: "إنشاء الحساب" },
  auth_switch_to_register: { en: "New here? Create an account", ar: "لسه جديد؟ اعمل حساب" },
  auth_switch_to_login:    { en: "Already have an account? Log in", ar: "عندك حساب؟ سجّل دخولك" },
  auth_err_required:  { en: "Please fill in all required fields.", ar: "من فضلك اكمل كل الحقول المطلوبة." },
  auth_err_mismatch:  { en: "Passwords don't match.", ar: "كلمتا المرور غير متطابقتين." },
  auth_err_short:     { en: "Password must be at least 6 characters.", ar: "كلمة المرور لازم تكون 6 أحرف على الأقل." },
  auth_err_exists:    { en: "An account with this phone, email or username already exists.", ar: "يوجد حساب مسجل بهذا الرقم أو الإيميل أو الاسم." },
  auth_err_invalid:   { en: "Incorrect phone/email or password.", ar: "رقم الموبايل/الإيميل أو كلمة المرور غير صحيحة." },
  auth_err_connection: { en: "Couldn't reach the server. Check the connection and try again.", ar: "حصل خطأ في الاتصال. تحقق من الإنترنت وحاول تاني." },
  auth_success_register: { en: "Account created! Logging you in…", ar: "تم إنشاء الحساب! بنسجلك دخول…" },

  /* ── show/hide password + forgot password ── */
  pw_show:            { en: "Show password", ar: "إظهار كلمة المرور" },
  pw_hide:            { en: "Hide password", ar: "إخفاء كلمة المرور" },
  auth_forgot_link:   { en: "Forgot your password?", ar: "نسيت كلمة المرور؟" },
  fp_title:           { en: "Reset your password", ar: "استعادة كلمة المرور" },
  fp_step1_sub:       { en: "Enter your phone, email or username and we'll email you a 6-digit code.", ar: "اكتب رقم موبايلك أو إيميلك أو اسم المستخدم وهنبعتلك كود من 6 أرقام على إيميلك." },
  fp_identifier_lbl:  { en: "Phone / Email / Username", ar: "رقم الموبايل / الإيميل / اسم المستخدم" },
  fp_send_code_btn:   { en: "Send Reset Code", ar: "إرسال كود الاستعادة" },
  fp_code_sent:       { en: "A 6-digit code was sent to your registered email.", ar: "تم إرسال كود من 6 أرقام على الإيميل المسجل بحسابك." },
  fp_code_lbl:        { en: "6-digit code", ar: "الكود المكوّن من 6 أرقام" },
  fp_new_pw_lbl:      { en: "New Password", ar: "كلمة المرور الجديدة" },
  fp_confirm_pw_lbl:  { en: "Confirm New Password", ar: "تأكيد كلمة المرور الجديدة" },
  fp_reset_btn:       { en: "Change Password", ar: "تغيير كلمة المرور" },
  fp_success:         { en: "Password changed! You can log in now.", ar: "تم تغيير كلمة المرور! تقدر تسجل دخول دلوقتي." },
  fp_err_not_found:   { en: "No account matches this phone/email/username.", ar: "مفيش حساب مسجل بالبيانات دي." },
  fp_err_no_email:    { en: "This account has no email on file. Contact us on WhatsApp to reset your password.", ar: "الحساب ده مش مسجل عليه إيميل. كلمنا على واتساب علشان نساعدك تستعيد كلمة المرور." },
  fp_err_code:        { en: "The code is incorrect or expired. Request a new one.", ar: "الكود غلط أو انتهت صلاحيته. اطلب كود جديد." },
  fp_back_login:      { en: "← Back to login", ar: "→ الرجوع لتسجيل الدخول" },
  fp_resend:          { en: "Resend code", ar: "إعادة إرسال الكود" },

  /* ── order confirmation email ── */
  lbl_email_optional: { en: "Email (optional — for order confirmation)", ar: "الإيميل (اختياري — لاستلام تأكيد الطلب)" },
  order_success_msg:  { en: "Your order was placed successfully! ✅", ar: "تم تسجيل طلبك بنجاح! ✅" },
  order_email_note:   { en: "A confirmation email is on its way to you.", ar: "هيوصلك إيميل تأكيد التسجيل خلال دقائق." },
  order_wa_optional:  { en: "You can also confirm on WhatsApp (optional):", ar: "وتقدر كمان تأكد على واتساب (اختياري):" },

  /* ── product description (mart admin) ── */
  adm_desc_en:        { en: "Description (English) — optional", ar: "الوصف (إنجليزي) — اختياري" },
  adm_desc_ar:        { en: "Description (Arabic) — optional", ar: "الوصف (عربي) — اختياري" },
  adm_section:        { en: "Section", ar: "القسم" },
  adm_label:          { en: "Label", ar: "الليبل" },
  adm_label_highdemand_hint: { en: "Automatically tagged \"Brand New\" — no manual choice needed for High Demand products.", ar: "بيتحط عليه تلقائيًا ليبل \"جديد\" — مفيش اختيار يدوي مطلوب لمنتجات القسم ده." },
  adm_expiry:          { en: "Expiry date (optional — for supplements, hair products, etc.)", ar: "تاريخ الصلاحية (اختياري — للمكملات ومنتجات الشعر وغيرها)" },
  adm_expiry_hint:     { en: "Leave empty if not applicable — it will simply not be shown on the product card.", ar: "سيبها فاضية لو مش مناسبة للمنتج — مش هتظهر في كارت المنتج خالص." },

  /* ── mandatory email verification on register ── */
  lbl_email_req:      { en: "Email", ar: "الإيميل" },
  reg_code_sent:      { en: "We sent a 6-digit code to your email. Enter it to confirm your account.", ar: "بعتنالك كود من 6 أرقام على إيميلك. اكتبه هنا لتأكيد حسابك." },
  reg_verify_btn:     { en: "Confirm & Create Account", ar: "تأكيد وإنشاء الحساب" },
  reg_change_email:   { en: "Change email", ar: "تغيير الإيميل" },
  reg_err_email_phone:{ en: "Phone, email, username and password are all required.", ar: "رقم الموبايل والإيميل واسم المستخدم وكلمة المرور كلهم مطلوبين." },

  /* ── homepage brands section ── */
  stores_more:        { en: "…and hundreds more. Any US store link works.", ar: "…ومئات المتاجر غيرهم. أي لينك من أي متجر أمريكي شغال." },

  // ---------- dashboard ----------
  dash_hello:      { en: "Hello", ar: "أهلاً" },
  dash_eyebrow:    { en: "MY ACCOUNT", ar: "حسابي" },
  dash_tab_profile:{ en: "Profile", ar: "بياناتي" },
  dash_tab_orders: { en: "My Orders", ar: "طلباتي" },
  dash_tab_new:    { en: "New Order", ar: "طلب جديد" },
  dash_profile_t:  { en: "Your details", ar: "بياناتك" },
  dash_profile_d:  { en: "Keep your name and address up to date so deliveries reach you without delay.", ar: "حافظ على اسمك وعنوانك محدّثين لتوصل طلباتك بدون تأخير." },
  lbl_name:        { en: "Full Name", ar: "الاسم بالكامل" },
  lbl_governorate: { en: "Governorate", ar: "المحافظة" },
  lbl_address:     { en: "Detailed Address", ar: "العنوان بالتفصيل" },
  btn_save:        { en: "Save Changes", ar: "حفظ التغييرات" },
  save_success:    { en: "Saved.", ar: "تم الحفظ." },

  // ---------- email verification ----------
  email_verified_badge:   { en: "Verified", ar: "متأكد منه" },
  email_unverified_badge: { en: "Not verified", ar: "غير متأكد منه" },
  email_verify_btn:       { en: "Verify", ar: "تأكيد" },
  email_verify_sending:   { en: "Sending code…", ar: "جاري إرسال الكود…" },
  email_verify_sent:      { en: "A 6-digit code was sent to your email.", ar: "تم إرسال كود مكوّن من 6 أرقام لإيميلك." },
  email_verify_code_ph:   { en: "Enter 6-digit code", ar: "أدخل الكود المكوّن من 6 أرقام" },
  email_verify_confirm:   { en: "Confirm Code", ar: "تأكيد الكود" },
  email_verify_resend:    { en: "Resend code", ar: "إعادة إرسال الكود" },
  email_verify_success:   { en: "Email verified successfully!", ar: "تم تأكيد الإيميل بنجاح!" },
  email_verify_wrong:     { en: "Incorrect or expired code. Try again.", ar: "الكود غير صحيح أو منتهي الصلاحية. حاول مرة أخرى." },
  email_verify_need_email:{ en: "Please add an email above first.", ar: "من فضلك أضف إيميلك فوق الأول." },
  email_verify_save_first:{ en: "Please save your email first, then verify it.", ar: "من فضلك احفظ إيميلك الأول، وبعدين أكّده." },
  dash_orders_t:   { en: "Order history", ar: "سجل الطلبات" },
  dash_orders_d:   { en: "All orders linked to your phone number.", ar: "كل الطلبات المرتبطة برقم موبايلك." },
  dash_orders_empty:{ en: "No orders yet — your first one is one link away.", ar: "لسه مفيش طلبات — أول طلب على بعد لينك واحد بس." },
  dash_new_t:      { en: "Place a new order", ar: "اعمل طلب جديد" },
  dash_new_d:      { en: "Use the full calculator to price and confirm your next order.", ar: "استخدم الحاسبة الكاملة لتحسب وتأكد طلبك الجديد." },
  dash_new_cta:    { en: "Open Calculator", ar: "افتح الحاسبة" },

  // ---------- mart page ----------
  mart_page_eyebrow:{ en: "ALREADY IN EGYPT", ar: "متوفر في مصر" },
  mart_page_title: { en: "Try Shoppy Mart", ar: "تراي شوبي مارت" },
  mart_page_sub:   { en: "A wide range of our most-requested products, ready to ship at competitive prices — plus a selection of discounted items and Try Shoppy returns or undelivered orders, currently available for delivery.", ar: "مجموعة متنوعة من المنتجات الأكثر طلبا متوفرة للتسليم، باسعار تنافسية، بالإضافة إلي مجموعة من المنتجات المخفضة ومنتجات تراي شوبي مرتجعة أو لم تسلم متوفرة حاليا للتسليم." },
  mart_filter_all: { en: "All", ar: "الكل" },
  mart_filter_discount: { en: "Discounted", ar: "خصومات" },
  mart_filter_outlet:   { en: "Outlet", ar: "أوت ليت" },
  mart_filter_returns:  { en: "Returns", ar: "مرتجعات" },

  // ---------- mart: tabs ----------
  mart_tab_highdemand: { en: "High Demand", ar: "الأكثر طلبًا" },
  mart_tab_outlet:      { en: "Outlet", ar: "أوتليت" },
  mart_tab_all:          { en: "All Items", ar: "كل المنتجات" },
  mart_cat_all:          { en: "All categories", ar: "كل الفئات" },
  mart_expiry_note:      { en: "Best before", ar: "الصلاحية حتى" },

  // ---------- mart: categories ----------
  cat_accessories_toys: { en: "Accessories & Toys", ar: "الاكسسوارات والألعاب" },
  cat_beauty:            { en: "Skincare, Hair & Beauty", ar: "العناية بالبشرة والشعر والتجميل" },
  cat_supplements:       { en: "Supplements & Vitamins", ar: "المكملات الغذائية والفيتامينات" },
  cat_clothing:          { en: "Clothing & Shoes", ar: "الملابس والأحذية" },
  cat_electronics:       { en: "Electronics", ar: "الإلكترونيات" },
  cat_office:            { en: "Office Supplies", ar: "منتجات مكتبية" },
  cat_bags:              { en: "Bags", ar: "حقائب" },
  cat_watches_glasses:   { en: "Watches & Glasses", ar: "ساعات ونظارات" },
  cat_other:             { en: "Other", ar: "أخرى" },

  // ---------- mart: labels (badges on product cards) ----------
  lbl_brand_new:            { en: "Brand New", ar: "جديد" },
  lbl_pre_delivery_return:  { en: "Pre-delivery return", ar: "مرتجع قبل التسليم" },
  lbl_open_box:              { en: "Open box", ar: "عبوة مفتوحة" },
  lbl_heavy_discount:        { en: "Heavily discounted", ar: "خصم كبير" },
  mart_order_btn:  { en: "Order on WhatsApp", ar: "اطلب عبر واتساب" },
  mart_only_left:  { en: "left in stock", ar: "متبقي بالمخزن" },

  // ---------- mart cart ----------
  mart_add_to_cart:    { en: "Add to Cart", ar: "أضف للسلة" },
  mart_added_toast:    { en: "Added to cart", ar: "تمت الإضافة للسلة" },
  mart_cart_title:     { en: "Your Cart", ar: "سلتك" },
  mart_cart_empty:     { en: "Your cart is empty.", ar: "سلتك فاضية." },
  mart_cart_subtotal:  { en: "Subtotal", ar: "الإجمالي" },
  mart_cart_checkout:  { en: "Checkout", ar: "إتمام الطلب" },
  mart_cart_continue:  { en: "Continue Shopping", ar: "استمر في التسوق" },
  mart_cart_remove:    { en: "Remove", ar: "إزالة" },
  mart_cart_close:     { en: "Close", ar: "إغلاق" },
  mart_checkout_title: { en: "Complete your order", ar: "كمّل طلبك" },
  mart_checkout_sub:   { en: "We'll confirm by WhatsApp right after.", ar: "هنأكد معك على واتساب فورًا." },
  mart_btn_place_order:{ en: "Place Order", ar: "تأكيد الطلب" },
  mart_checkout_success:{ en: "Your order was placed successfully! ✅", ar: "تم تسجيل طلبك بنجاح! ✅" },
  mart_item_singular:  { en: "item", ar: "منتج" },
  mart_item_plural:    { en: "items", ar: "منتجات" },
  mart_cart_whatsapp_btn:{ en: "Send WhatsApp Confirmation (optional)", ar: "إرسال تأكيد واتساب (اختياري)" },
  mart_loading:        { en: "Loading products…", ar: "جاري تحميل المنتجات…" },
  mart_empty:          { en: "No products available right now — check back soon!", ar: "لا توجد منتجات متاحة حاليًا — عد قريبًا!" },
  mart_load_error:     { en: "Couldn't load products. Check your connection and refresh.", ar: "تعذّر تحميل المنتجات. تحقق من الاتصال وحدّث الصفحة." },
  mart_out_of_stock:   { en: "Out of stock", ar: "نفذت الكمية" },

  // ---------- mart admin ----------
  adm_title:           { en: "Mart Admin", ar: "إدارة المارت" },
  adm_sub:             { en: "Add, edit and manage Try Shoppy Mart products.", ar: "أضف وعدّل وأدر منتجات تراي شوبي مارت." },
  adm_login_title:     { en: "Admin access", ar: "دخول الإدارة" },
  adm_login_sub:       { en: "Log in with your staff account to manage products.", ar: "سجّل دخولك بحساب الموظف بتاعك عشان تدير المنتجات." },
  adm_user_label:      { en: "Username", ar: "اسم المستخدم" },
  adm_key_label:       { en: "Password", ar: "كلمة المرور" },
  adm_key_btn:         { en: "Log In", ar: "دخول" },
  adm_key_wrong:       { en: "Wrong username or password.", ar: "اسم المستخدم أو كلمة المرور غلط." },
  adm_add_product:     { en: "Add Product", ar: "إضافة منتج" },
  adm_edit_product:    { en: "Edit Product", ar: "تعديل منتج" },
  adm_name_en:         { en: "Name (English)", ar: "الاسم (إنجليزي)" },
  adm_name_ar:         { en: "Name (Arabic)", ar: "الاسم (عربي)" },
  adm_category:        { en: "Category", ar: "الفئة" },
  adm_price:           { en: "Price (EGP)", ar: "السعر (ج.م)" },
  adm_old_price:       { en: "Old Price (EGP)", ar: "السعر قبل الخصم (ج.م)" },
  adm_stock:           { en: "Stock Quantity", ar: "الكمية بالمخزن" },
  adm_image:           { en: "Image URL", ar: "رابط الصورة" },
  adm_image_hint:      { en: "Paste a direct image link (ends with .jpg / .png / .webp). Tip: upload to imgur.com or postimages.org and copy the direct link.", ar: "الصق رابط صورة مباشر (ينتهي بـ .jpg / .png / .webp). نصيحة: ارفع الصورة على imgur.com أو postimages.org وانسخ الرابط المباشر." },
  adm_active:          { en: "Visible in Mart", ar: "ظاهر في المارت" },
  adm_save:            { en: "Save Product", ar: "حفظ المنتج" },
  adm_cancel:          { en: "Cancel", ar: "إلغاء" },
  adm_delete:          { en: "Delete", ar: "حذف" },
  adm_edit:            { en: "Edit", ar: "تعديل" },
  adm_confirm_delete:  { en: "Delete this product? This can't be undone.", ar: "حذف هذا المنتج؟ لا يمكن التراجع." },
  adm_saved:           { en: "Product saved.", ar: "تم حفظ المنتج." },
  adm_deleted:         { en: "Product deleted.", ar: "تم حذف المنتج." },
  adm_error:           { en: "Something went wrong. Try again.", ar: "حدث خطأ. حاول مرة أخرى." },
  adm_required:        { en: "Name and price are required.", ar: "الاسم والسعر مطلوبان." },
  adm_products_count:  { en: "products", ar: "منتج" },
  adm_no_products:     { en: "No products yet. Add your first one!", ar: "لا توجد منتجات بعد. أضف أول منتج!" },
  adm_hidden_badge:    { en: "Hidden", ar: "مخفي" },
  adm_logout:          { en: "Lock", ar: "قفل" },
  adm_refresh:         { en: "Refresh", ar: "تحديث" },

  // ---------- footer legal column ----------
  foot_legal_t:        { en: "Legal", ar: "السياسات" },
  foot_privacy:        { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  foot_terms:          { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  foot_shipping:       { en: "Shipping Policy", ar: "سياسة الشحن" },
  foot_returns:        { en: "Returns & Refunds", ar: "سياسة الاسترجاع" },
  foot_cancellation:   { en: "Cancellation Policy", ar: "سياسة الإلغاء" },
  foot_restricted:     { en: "Restricted Items", ar: "المنتجات الممنوعة" },

  // ---------- policy pages (shared chrome) ----------
  policy_updated:      { en: "Last updated", ar: "آخر تحديث" },
  policy_back_home:    { en: "Back to Home", ar: "العودة للرئيسية" },
  policy_related_t:    { en: "Related policies", ar: "سياسات ذات صلة" },
  policy_contact_t:    { en: "Questions about this policy?", ar: "عندك سؤال عن السياسة دي؟" },
  policy_contact_cta:  { en: "Chat with us on WhatsApp", ar: "تواصل معنا على واتساب" },

  // ---------- calculator page ----------
  brand_slogan:        { en: "Your Global Shopping Partner", ar: "شريكك العالمي للتسوق" },
  calc_title:          { en: "Calculate & Confirm Order", ar: "حساب وتأكيد الطلب" },
  calc_link_label:     { en: "Product Link", ar: "رابط المنتج" },
  calc_qty_label:      { en: "Quantity", ar: "الكمية" },
  calc_country_label:  { en: "Country", ar: "دولة الشراء" },
  calc_country_usa:    { en: "USA 🇺🇸", ar: "أمريكا 🇺🇸" },
  calc_country_other:  { en: "Other Countries", ar: "دول أخرى" },
  calc_country_msg:    { en: "Sorry, we only serve orders from USA currently.", ar: "نعتذر، حالياً نوفر الطلبات من أمريكا فقط." },
  calc_price_label:    { en: "Total Price in USD *", ar: "السعر شامل شحن الموقع ($) *" },
  calc_weight_label:   { en: "Weight (g) *", ar: "الوزن (جرام) *" },
  calc_weight_ph:      { en: "e.g. 500", ar: "مثلاً: 500" },
  calc_category_label: { en: "Category *", ar: "الفئة *" },
  calc_category_select:{ en: "Select category...", ar: "اختر الفئة..." },
  calc_desc_label:     { en: "Additional Description (optional)", ar: "وصف إضافي (اختياري)" },
  calc_size_ph:        { en: "Size", ar: "المقاس" },
  calc_color_ph:       { en: "Color", ar: "اللون" },
  calc_notes_ph:       { en: "Other Notes", ar: "ملاحظات أخرى" },
  calc_btn_calculate:  { en: "Calculate Price", ar: "احسب السعر النهائي" },
  calc_result_total_label:{ en: "Total Cost (Shipping & Customs included)", ar: "إجمالي التكلفة شاملة الشحن والجمارك" },
  calc_result_cod_note:{ en: "Cash on Delivery up to 10,000 EGP, no extra charge ✓ | Final confirmation after review", ar: "الدفع عند الاستلام لحد 10000ج بدون اي زيادة ✓ | التأكيد النهائي بعد المراجعة" },
  calc_order_no_label: { en: "Order No.", ar: "رقم الطلب" },
  calc_shipping_title: { en: "Shipping Details", ar: "بيانات الشحن" },
  calc_name_label:     { en: "Full Name", ar: "الاسم بالكامل" },
  calc_name_ph:        { en: "Enter your full name", ar: "أدخل اسمك بالكامل" },
  calc_phone_label:    { en: "Phone Number", ar: "رقم الهاتف" },
  calc_gov_label:      { en: "Governorate", ar: "المحافظة" },
  calc_gov_select:     { en: "Select governorate...", ar: "اختر المحافظة..." },
  calc_address_label:  { en: "Detailed Address", ar: "العنوان بالتفصيل" },
  calc_address_ph:     { en: "Building number, street name, apartment...", ar: "رقم المبنى، اسم الشارع، الشقة..." },
  calc_btn_confirm:    { en: "Confirm Order Now", ar: "تأكيد الطلب الآن" },
  calc_btn_whatsapp:   { en: "Send WhatsApp Confirmation", ar: "إرسال واتساب للتأكيد" },
  calc_btn_track:      { en: "Track Your Order", ar: "تتبع شحنتك" },
  calc_alert_country:  { en: "Orders available from USA only", ar: "الطلبات متاحة من أمريكا فقط حاليًا" },
  calc_alert_missing:  { en: "Please enter the price, category, and actual weight (grams)", ar: "برجاء إدخال السعر، الفئة، والوزن الفعلي (جرام)" },
  calc_alert_name:     { en: "Please enter your name", ar: "برجاء إدخال الاسم" },
  calc_alert_confirmed:{ en: "Your order was placed successfully! A confirmation email will be sent to you. Sending a WhatsApp message is optional.", ar: "تم تسجيل طلبك بنجاح! وسيتم إرسال إيميل تأكيد التسجيل. إرسال رسالة الواتساب اختياري." },

  // ---------- cart flow (multi-item calculator) ----------
  calc_btn_addcart:    { en: "➕ Add to Cart", ar: "➕ أضف للسلة" },
  calc_cart_title:     { en: "Your Cart", ar: "سلة طلباتك" },
  calc_cart_item_qty:  { en: "Qty", ar: "الكمية" },
  calc_cart_remove:    { en: "Remove", ar: "حذف" },
  calc_cart_total:     { en: "Total", ar: "الإجمالي" },
  calc_btn_additem:    { en: "➕ Add Another Item", ar: "➕ أضف منتج تاني" },
  calc_btn_checkout:   { en: "✅ Checkout", ar: "✅ إتمام الطلب" },
  calc_btn_back_cart:  { en: "← Back to Cart", ar: "← رجوع للسلة" },
  calc_btn_confirm_all: { en: "Confirm All Orders", ar: "تأكيد كل الطلبات" },
  calc_alert_added:    { en: "Added to cart ✓", ar: "تمت الإضافة للسلة ✓" },
  calc_alert_cart_empty: { en: "Your cart is empty — add at least one item first", ar: "السلة فاضية — أضف منتج واحد على الأقل الأول" },
  calc_success_title:  { en: "Orders Confirmed!", ar: "تم تأكيد الطلبات!" },

  // ---------- category options (value stays fixed English; only the label shown changes) ----------
  cat_clothes:      { en: "Clothes (Regular)", ar: "ملابس عادية" },
  cat_jacket:       { en: "Jacket or BALTO", ar: "جاكيت أو بالتو" },
  cat_electronics:  { en: "Electronics", ar: "إلكترونيات" },
  cat_shoes_regular:{ en: "Shoes (Regular)", ar: "أحذية عادية" },
  cat_shoes_boot:   { en: "Shoes (Boot)", ar: "أحذية بوت" },
  cat_watches:      { en: "Watches", ar: "ساعات" },
  cat_accessories:  { en: "Accessories", ar: "إكسسوارات" },
  cat_cosmetics:    { en: "Cosmetics", ar: "مستحضرات تجميل" },
  cat_sunglasses:   { en: "Sunglasses", ar: "نظارات شمسية" },
  cat_food:         { en: "Food", ar: "أغذية" },
  cat_carparts:     { en: "Car Parts", ar: "قطع غيار سيارات" },
  cat_vitamins:     { en: "Vitamin or Supplements", ar: "فيتامينات ومكملات" },
  cat_shampoo:      { en: "Shampoo or Conditioner", ar: "شامبو وبلسم" },
  cat_bag_small:    { en: "Small Hand Bag (Women)", ar: "حقيبة يد صغيرة" },
  cat_bag_back:     { en: "Back Bag (or Laptop Bag)", ar: "حقيبة ظهر / لابتوب" },
  cat_bag_large:    { en: "Large Hand Bag (Women)", ar: "حقيبة يد كبيرة" },
  cat_stationary:   { en: "Stationary", ar: "أدوات مكتبية" },

  // ---------- supplement sub-form (calculator) ----------
  calc_sup_title:      { en: "Vitamins / Supplements Details", ar: "تفاصيل الفيتامينات / المكملات" },
  calc_sup_type:       { en: "Product Type", ar: "نوع المنتج" },
  calc_sup_pieces:     { en: "Piece Count", ar: "عدد الحبات" },
  sup_opt_capsules:    { en: "Capsules", ar: "كبسولات" },
  sup_opt_gummies:     { en: "Gummies", ar: "جميز" },
  sup_opt_powder:      { en: "Powder", ar: "بودر" },
  sup_opt_liquid:      { en: "Liquid", ar: "سوائل" },
  sup_unit_tablets:    { en: "tablets", ar: "كبسولة" },
  sup_unit_gummies:    { en: "gummies", ar: "جميز" },
  calc_sup_note_powder:{ en: "Please enter the exact weight in grams", ar: "رجاء إدخال الوزن بالجرام بدقة" },
  calc_sup_note_liquid:{ en: "Please enter the bottle weight — Note: 1ml ≈ 1 gram", ar: "رجاء إدخال وزن العبوة — ملحوظة: 1 مللي = 1 جرام تقريبًا" },
  calc_sup_note_auto:  { en: "Weight auto-set", ar: "الوزن اتحدد تلقائيًا" },
  calc_sup_note_auto2: { en: "based on piece count", ar: "حسب عدد الحبات" },

  // ---------- ops calculator (calculatorOP.html — internal tool) ----------
  calcop_badge:        { en: "INTERNAL TOOL", ar: "أداة داخلية" },
  calcop_title:        { en: "Quick Price Estimate", ar: "تقدير سريع للسعر" },
  calcop_sub:          { en: "For staff use — estimates only, no order is created.", ar: "للاستخدام الداخلي فقط — تقدير سعر بدون إنشاء طلب." },
  calc_dims_label:     { en: "Dimensions in CM (optional)", ar: "الأبعاد بالسنتيمتر (اختياري)" },
  calc_length_ph:      { en: "Length (L)", ar: "طول (L)" },
  calc_width_ph:       { en: "Width (W)", ar: "عرض (W)" },
  calc_height_ph:      { en: "Height (H)", ar: "ارتفاع (H)" },
  calcop_alert_missing:{ en: "Please enter Price, Category & Weight", ar: "برجاء إدخال السعر والفئة والوزن" },
  calc_weight_basis_actual:     { en: "Calculated based on actual weight", ar: "الحساب بناءً على الوزن الفعلي" },
  calc_weight_basis_volumetric: { en: "Calculated based on volumetric weight", ar: "الحساب بناءً على الوزن الحجمي" },

  // ---------- governorate options (value stays the Arabic name; only the label shown changes) ----------
  gov_cairo:        { en: "Cairo", ar: "القاهرة" },
  gov_giza:         { en: "Giza", ar: "الجيزة" },
  gov_alex:         { en: "Alexandria", ar: "الإسكندرية" },
  gov_dakahlia:     { en: "Dakahlia", ar: "الدقهلية" },
  gov_sharqia:      { en: "Sharqia", ar: "الشرقية" },
  gov_gharbia:      { en: "Gharbia", ar: "الغربية" },
  gov_monufia:      { en: "Monufia", ar: "المنوفية" },
  gov_qalyubia:     { en: "Qalyubia", ar: "القليوبية" },
  gov_beheira:      { en: "Beheira", ar: "البحيرة" },
  gov_kafr_elsheikh:{ en: "Kafr El Sheikh", ar: "كفر الشيخ" },
  gov_damietta:     { en: "Damietta", ar: "دمياط" },
  gov_portsaid:     { en: "Port Said", ar: "بورسعيد" },
  gov_ismailia:     { en: "Ismailia", ar: "الإسماعيلية" },
  gov_suez:         { en: "Suez", ar: "السويس" },
  gov_faiyum:       { en: "Faiyum", ar: "الفيوم" },
  gov_beni_suef:    { en: "Beni Suef", ar: "بني سويف" },
  gov_minya:        { en: "Minya", ar: "المنيا" },
  gov_asyut:        { en: "Asyut", ar: "أسيوط" },
  gov_sohag:        { en: "Sohag", ar: "سوهاج" },
  gov_qena:         { en: "Qena", ar: "قنا" },
  gov_luxor:        { en: "Luxor", ar: "الأقصر" },
  gov_aswan:        { en: "Aswan", ar: "أسوان" },
  gov_redsea:       { en: "Red Sea", ar: "البحر الأحمر" },
  gov_newvalley:    { en: "New Valley", ar: "الوادي الجديد" },
  gov_matrouh:      { en: "Matrouh", ar: "مطروح" },
  gov_north_sinai:  { en: "North Sinai", ar: "شمال سيناء" },
  gov_south_sinai:  { en: "South Sinai", ar: "جنوب سيناء" },

  // ---------- track page ----------
  trk_pageTitle:        { en: "Track Your Order Status", ar: "تتبع حالة طلبك" },
  trk_inputPlaceholder: { en: "Order Number", ar: "رقم الطلب" },
  trk_inputHint:        { en: "You can search by order number (e.g. TRY123 or TRY-123)", ar: "يمكنك البحث برقم الطلب (مثال: TRY123 أو TRY-123)" },
  trk_trackBtn:         { en: "Track Now", ar: "تتبع الآن" },
  trk_searching:        { en: "Searching...", ar: "جاري البحث..." },
  trk_emptyInput:       { en: "Please enter an order number", ar: "يرجى إدخال رقم الطلب" },
  trk_connError:        { en: "Connection Error", ar: "خطأ في الاتصال" },
  trk_invalidOrder:     { en: "Invalid Order Number", ar: "رقم الطلب غير صحيح" },
  trk_orderLabel:       { en: "Order No.", ar: "رقم الطلب" },
  trk_qtyLabel:         { en: "Quantity", ar: "الكمية" },
  trk_arrivalLabel:     { en: "Expected Arrival", ar: "موعد الوصول المتوقع" },
  trk_canceledMsg:      { en: "This order has been canceled", ar: "تم إلغاء هذا الطلب" },
  trk_delayedMsg:       { en: "This order is slightly delayed — we're following up on it", ar: "هذا الطلب متأخر قليلاً عن الموعد المتوقع، نعمل على متابعته" },
  trk_historyTitle:     { en: "Update History", ar: "سجل التحديثات" },
  trk_siblingsTitle:    { en: "Your other in-progress orders", ar: "باقي طلباتك الجارية" },
  trk_helpQuestion:     { en: "Have a question about your order?", ar: "عندك استفسار عن طلبك؟" },
  trk_helpCta:          { en: "Contact us on WhatsApp 💬", ar: "تواصل معنا على واتساب 💬" },
  trk_pieceWord:        { en: "pcs", ar: "قطعة" },
  trk_currency:         { en: "EGP", ar: "ج.م" }
};

let TS_LANG = localStorage.getItem('ts_lang') || 'en';

function tsT(key){
  const row = I18N[key];
  if(!row) return key;
  return row[TS_LANG] || row.en || key;
}

/* returns the OTHER language's text for a key — used for small bilingual hints */
function tsOther(key){
  const row = I18N[key];
  if(!row) return key;
  const other = TS_LANG === 'ar' ? 'en' : 'ar';
  return row[other] || row.en || key;
}

function applyI18N(){
  document.documentElement.setAttribute('lang', TS_LANG);
  document.documentElement.setAttribute('dir', TS_LANG === 'ar' ? 'rtl' : 'ltr');

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.innerHTML = tsT(key);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el=>{
    el.setAttribute('placeholder', tsT(el.getAttribute('data-i18n-ph')));
  });
  document.querySelectorAll('.lang-pill').forEach(btn=>{
    btn.innerHTML = TS_LANG === 'ar' ? '🌐 English' : '🌐 العربية';
  });
  /* ⚠️ FIX: applyI18N used to dispatch 'ts-lang-changed' on EVERY call.
     Pages like mart.html listen to that event and re-render, and their
     render functions call applyI18N() again → infinite loop → the whole
     page froze. The event is now fired ONLY from toggleLang() below,
     i.e. only when the user actually switches the language. */
}

function toggleLang(){
  TS_LANG = TS_LANG === 'ar' ? 'en' : 'ar';
  localStorage.setItem('ts_lang', TS_LANG);
  applyI18N();
  document.dispatchEvent(new CustomEvent('ts-lang-changed', { detail: { lang: TS_LANG } }));
}

document.addEventListener('DOMContentLoaded', applyI18N);
