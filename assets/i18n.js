/* =========================================================
   TRY SHOPPY — i18n dictionary (English default, Arabic toggle)
   ========================================================= */
const I18N = {
  // ---------- nav ----------
  nav_home:        { en: "Home", ar: "الرئيسية" },
  nav_how:         { en: "How it works", ar: "كيف نعمل" },
  nav_calc:        { en: "Get a Price", ar: "احسب السعر" },
  nav_track:       { en: "Track Order", ar: "تتبع طلبك" },
  nav_mart:        { en: "Try Shoppy Mart", ar: "تراي شوبي مارت" },
  nav_login:       { en: "Login / Register", ar: "تسجيل الدخول" },
  nav_dashboard:   { en: "My Account", ar: "حسابي" },
  nav_logout:      { en: "Log out", ar: "تسجيل الخروج" },

  // ---------- common (loading states — reused across pages) ----------
  common_confirming: { en: "Confirming...", ar: "جارٍ التأكيد..." },
  common_saving:      { en: "Saving...", ar: "جارٍ الحفظ..." },
  common_sending:      { en: "Sending...", ar: "جارٍ الإرسال..." },
  common_processing:      { en: "Processing...", ar: "جارٍ المعالجة..." },
  common_loading:      { en: "Loading...", ar: "جارٍ التحميل..." },
  common_searching:      { en: "Searching...", ar: "جارٍ البحث..." },
  common_checking:      { en: "Checking...", ar: "جارٍ التحقق..." },
  common_error_retry:      { en: "Something went wrong. Please try again.", ar: "حدث خطأ، يُرجى المحاولة مرة أخرى." },

  // ---------- hero ----------
  hero_eyebrow:    { en: "USA → EGYPT SHOPPING & SHIPPING", ar: "شراء وشحن من أمريكا لمصر" },
  hero_title:      { en: "Send the link.<br>We ship it <span class=\"hl\">home.</span>", ar: "أرسل الرابط.<br>ونوصله <span class=\"hl\">إلى باب بيتك.</span>" },
  hero_sub:        { en: "Paste a product link from Amazon, eBay, Walmart, iHerb or almost any US store. We buy it, ship it to Egypt, handle the applicable process, and deliver it to you.", ar: "أرسل رابط المنتج من أمازون أو إيباي أو وول مارت أو آي هيرب أو أي متجر أمريكي تقريبًا، وسنشتريه ونشحنه إلى مصر، ونتولى الإجراءات المطلوبة، ثم نوصله إليك." },
  hero_quick_ph:   { en: "Paste your product link here…", ar: "الصق رابط المنتج هنا…" },
  hero_cta_price:  { en: "Calculate My Price", ar: "احسب سعر طلبي" },
  hero_cta_track:  { en: "Track an Order", ar: "تتبع طلب" },
  home_track_ph:   { en: "Have an order? Enter its number", ar: "لديك طلب؟ اكتب رقمه هنا" },
  home_track_btn:  { en: "Track", ar: "تتبع" },
  home_mart_live:  { en: "Available now in Egypt", ar: "متاح الآن في مصر" },
  hero_trust:      { en: "No card? No problem — we buy on your behalf.", ar: "لا تملك بطاقة دولية؟ لا مشكلة، سنشتري نيابةً عنك." },
  hero_label_from: { en: "FROM", ar: "من" },
  hero_label_to:   { en: "TO YOUR DOOR", ar: "إلى باب المنزل" },
  hero_stamp_calc: { en: "COST CALCULATED", ar: "التكلفة محسوبة" },
  hero_stamp_cod:  { en: "COD AVAILABLE", ar: "دفع عند الاستلام" },

  // ---------- how it works ----------
  how_eyebrow:     { en: "FOUR STEPS", ar: "أربع خطوات" },
  how_title:       { en: "From product link to your doorstep", ar: "من رابط المنتج حتى باب منزلك" },
  how_sub:         { en: "One simple route, fully tracked at every checkpoint.", ar: "رحلة واحدة بسيطة، ومتابعة كاملة في كل مرحلة." },
  how1_t:          { en: "Send the link", ar: "أرسل الرابط" },
  how1_d:          { en: "Paste the product link, quantity, size or color into our calculator.", ar: "أضف رابط المنتج والكمية والمقاس أو اللون في الحاسبة." },
  how2_t:          { en: "We calculate everything", ar: "نحسب كل شيء" },
  how2_d:          { en: "Item price, applicable shipping and customs, presented as one clear EGP price.", ar: "سعر المنتج والشحن والجمارك المطبقة، كلها في سعر واحد واضح بالجنيه المصري." },
  how3_t:          { en: "You confirm", ar: "أكّد الطلب" },
  how3_d:          { en: "Approve the price and select the payment method that suits you.", ar: "وافق على السعر، واختر طريقة الدفع المتاحة التي تناسبك." },
  how4_t:          { en: "We buy, ship & deliver", ar: "نشتري ونشحن ونوصّل" },
  how4_d:          { en: "We purchase the product, bring it to Egypt and deliver it to you — tracked the whole way.", ar: "نشتري المنتج ونشحنه إلى مصر ونوصله إليك، مع تتبع كامل في كل خطوة." },

  // ---------- stores ----------
  stores_eyebrow:  { en: "WE SHOP FROM", ar: "نشتري لك من" },
  stores_title:    { en: "Almost any US store", ar: "أي متجر أمريكي تقريبًا" },
  stores_sub:      { en: "If it ships inside the US, we can bring it to Egypt.", ar: "إذا كان المتجر يشحن داخل أمريكا، فبإمكاننا توصيل طلبك إلى مصر." },

  // ---------- why ----------
  why_eyebrow:     { en: "WHY TRY SHOPPY", ar: "لماذا تراي شوبي؟" },
  why_title:       { en: "One local contact, instead of five foreign ones", ar: "جهة واحدة تتعامل معها بدلًا من خمس جهات أجنبية" },
  why1_t:          { en: "No international card needed", ar: "لا تحتاج إلى بطاقة دولية" },
  why1_d:          { en: "We buy on your behalf — you pay us in Egypt, your way.", ar: "نشتري نيابةً عنك، وتدفع لنا داخل مصر بالطريقة التي تناسبك." },
  why2_t:          { en: "Price shown before you commit", ar: "السعر النهائي قبل موافقتك" },
  why2_d:          { en: "Item, applicable shipping and customs combined into one clear EGP price.", ar: "سعر المنتج والشحن والجمارك المطبقة في رقم واحد واضح بالجنيه." },
  why3_t:          { en: "Multiple stores, one shipment", ar: "أكثر من متجر في شحنة واحدة" },
  why3_d:          { en: "Ordering from several sites? We consolidate it for you.", ar: "تطلب من أكثر من موقع؟ سنجمع طلباتك في شحنة واحدة." },
  why4_t:          { en: "Tracked from checkout to your door", ar: "متابعة من لحظة الشراء حتى باب المنزل" },
  why4_d:          { en: "Live order status, anytime, with your order number.", ar: "تابع حالة طلبك في أي وقت برقم الطلب." },

  // ---------- mart teaser ----------
  mart_eyebrow:    { en: "NEW", ar: "جديد" },
  mart_title:      { en: "Try Shoppy Mart", ar: "تراي شوبي مارت" },
  mart_sub:        { en: "High-demand, brand-new picks alongside outlet finds — open-box, pre-delivery returns and heavily discounted items — organized by category and ready to ship now.", ar: "منتجات جديدة من الأكثر طلبًا، إلى جانب منتجات الأوتليت: عبوات مفتوحة، ومرتجعات قبل التسليم، ومنتجات بتخفيضات كبيرة، مقسمة حسب الفئة وجاهزة للشحن فورًا." },
  mart_cta:        { en: "Browse the Mart", ar: "تصفح المارت" },
  mart_tile_categories_sub: { en: "categories to browse", ar: "فئة للتصفح" },

  // ---------- footer: contact ----------
  foot_contact_t:  { en: "Contact Us", ar: "تواصل معنا" },
  foot_address_t:  { en: "Address", ar: "العنوان" },
  foot_address:    { en: "7th District, Zahraa El Maadi, Cairo, Egypt", ar: "الشطر السابع، زهراء المعادي، القاهرة، مصر" },

  // ---------- payments ----------
  pay_eyebrow:     { en: "PAY YOUR WAY", ar: "ادفع بالطريقة التي تناسبك" },
  pay_title:       { en: "Flexible payment, all in Egypt", ar: "طرق دفع مرنة، كلها داخل مصر" },
  pay_cod:         { en: "Cash on Delivery", ar: "الدفع عند الاستلام" },
  pay_instapay:    { en: "InstaPay", ar: "إنستاباي" },
  pay_card:        { en: "Visa & Mastercard", ar: "فيزا وماستركارد" },
  pay_paypal:      { en: "PayPal", ar: "باي بال" },
  pay_bank:        { en: "Bank Transfer", ar: "تحويل بنكي" },

  // ---------- final CTA ----------
  cta_title:       { en: "Got a link? Let's price it.", ar: "لديك رابط؟ هيا نحسب سعره." },
  cta_sub:         { en: "It takes less than a minute to get your final price.", ar: "تحتاج إلى أقل من دقيقة لتحصل على السعر النهائي." },
  cta_btn:         { en: "Open the Calculator", ar: "افتح الحاسبة" },

  // ---------- footer ----------
  foot_about_t:    { en: "About", ar: "عن تراي شوبي" },
  foot_about_d:    { en: "Try Shoppy buys, consolidates and ships products from US stores straight to your door in Egypt.", ar: "تشتري تراي شوبي المنتجات من المتاجر الأمريكية وتجمعها وتشحنها إلى باب منزلك في مصر." },
  foot_links_t:    { en: "Quick Links", ar: "روابط سريعة" },
  foot_support_t:  { en: "Support", ar: "الدعم" },
  foot_whatsapp:   { en: "Chat on WhatsApp", ar: "تواصل على واتساب" },
  foot_facebook:   { en: "Follow us on Facebook", ar: "تابعنا على فيسبوك" },
  foot_payments_t: { en: "Accepted Payments", ar: "طرق الدفع المتاحة" },
  foot_rights:     { en: "© 2026 Try Shoppy. All rights reserved.", ar: "© 2026 تراي شوبي. جميع الحقوق محفوظة." },

  // ---------- login / register ----------
  auth_eyebrow:    { en: "MY ACCOUNT", ar: "حسابي" },
  auth_title:      { en: "Welcome to Try Shoppy", ar: "أهلًا بك في تراي شوبي" },
  auth_sub:        { en: "Log in to track every order in one place.", ar: "سجّل الدخول لتتابع جميع طلباتك في مكان واحد." },
  tab_login:       { en: "Log In", ar: "تسجيل الدخول" },
  tab_register:    { en: "Create Account", ar: "حساب جديد" },
  lbl_identifier:  { en: "Phone or Email", ar: "رقم الهاتف أو البريد الإلكتروني" },
  lbl_password:    { en: "Password", ar: "كلمة المرور" },
  lbl_username:    { en: "Username", ar: "اسم المستخدم" },
  lbl_phone:       { en: "Phone Number", ar: "رقم الهاتف" },
  lbl_email:       { en: "Email (optional)", ar: "البريد الإلكتروني (اختياري)" },
  lbl_confirm:     { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  btn_login:       { en: "Log In", ar: "دخول" },
  btn_register:    { en: "Create My Account", ar: "إنشاء الحساب" },
  auth_switch_to_register: { en: "New here? Create an account", ar: "مستخدم جديد؟ أنشئ حسابًا" },
  auth_switch_to_login:    { en: "Already have an account? Log in", ar: "لديك حساب؟ سجّل الدخول" },
  auth_err_required:  { en: "Please fill in all required fields.", ar: "يُرجى استكمال جميع الحقول المطلوبة." },
  auth_err_mismatch:  { en: "Passwords don't match.", ar: "كلمتا المرور غير متطابقتين." },
  auth_err_short:     { en: "Password must be at least 6 characters.", ar: "يجب ألا تقل كلمة المرور عن 6 أحرف." },
  auth_err_exists:    { en: "An account with this phone or email already exists.", ar: "يوجد حساب مسجل بهذا الرقم أو البريد الإلكتروني." },
  auth_err_invalid:   { en: "Incorrect phone/email or password.", ar: "رقم الهاتف/البريد الإلكتروني أو كلمة المرور غير صحيحة." },
  auth_err_connection: { en: "Couldn't reach the server. Check the connection and try again.", ar: "حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مرة أخرى." },
  auth_success_register: { en: "Account created! Logging you in…", ar: "تم إنشاء الحساب! جارٍ تسجيل دخولك…" },

  /* ── show/hide password + forgot password ── */
  pw_show:            { en: "Show password", ar: "إظهار كلمة المرور" },
  pw_hide:            { en: "Hide password", ar: "إخفاء كلمة المرور" },
  auth_forgot_link:   { en: "Forgot your password?", ar: "نسيت كلمة المرور؟" },
  fp_title:           { en: "Reset your password", ar: "استعادة كلمة المرور" },
  fp_step1_sub:       { en: "Enter your phone or email and we'll email you a 6-digit code.", ar: "اكتب رقم هاتفك أو بريدك الإلكتروني، وسنرسل كودًا من 6 أرقام إلى بريدك الإلكتروني." },
  fp_identifier_lbl:  { en: "Phone or Email", ar: "رقم الهاتف أو البريد الإلكتروني" },
  fp_send_code_btn:   { en: "Send Reset Code", ar: "إرسال كود الاستعادة" },
  fp_code_sent:       { en: "A 6-digit code was sent to your registered email.", ar: "تم إرسال كود من 6 أرقام إلى البريد الإلكتروني المسجل في حسابك." },
  fp_code_lbl:        { en: "6-digit code", ar: "الكود المكوّن من 6 أرقام" },
  fp_new_pw_lbl:      { en: "New Password", ar: "كلمة المرور الجديدة" },
  fp_confirm_pw_lbl:  { en: "Confirm New Password", ar: "تأكيد كلمة المرور الجديدة" },
  fp_reset_btn:       { en: "Change Password", ar: "تغيير كلمة المرور" },
  fp_success:         { en: "Password changed! You can log in now.", ar: "تم تغيير كلمة المرور! يمكنك تسجيل الدخول الآن." },
  fp_err_not_found:   { en: "No account matches this phone/email/username.", ar: "لا يوجد حساب مسجل بهذه البيانات." },
  fp_err_no_email:    { en: "This account has no email on file. Contact us on WhatsApp to reset your password.", ar: "لا يوجد بريد إلكتروني مسجل في هذا الحساب. تواصل معنا على واتساب لنساعدك في استعادة كلمة المرور." },
  fp_err_code:        { en: "The code is incorrect or expired. Request a new one.", ar: "الكود غير صحيح أو انتهت صلاحيته. اطلب كودًا جديدًا." },
  fp_back_login:      { en: "← Back to login", ar: "→ العودة إلى تسجيل الدخول" },
  fp_resend:          { en: "Resend code", ar: "إعادة إرسال الكود" },

  /* ── order confirmation email ── */
  lbl_email_optional: { en: "Email (optional — for order confirmation)", ar: "البريد الإلكتروني (اختياري — لاستلام تأكيد الطلب)" },
  order_success_msg:  { en: "Your order was placed successfully! ✅", ar: "تم تسجيل طلبك بنجاح! ✅" },
  order_email_note:   { en: "A confirmation email is on its way to you.", ar: "ستصلك رسالة تأكيد على البريد الإلكتروني خلال دقائق." },
  order_wa_optional:  { en: "You can also confirm on WhatsApp (optional):", ar: "ويمكنك أيضًا التأكيد عبر واتساب (اختياري):" },

  /* ── product description (mart admin) ── */
  adm_desc_en:        { en: "Description (English) — optional", ar: "الوصف (إنجليزي) — اختياري" },
  adm_desc_ar:        { en: "Description (Arabic) — optional", ar: "الوصف (عربي) — اختياري" },
  adm_section:        { en: "Section", ar: "القسم" },
  adm_label:          { en: "Label", ar: "التصنيف" },
  adm_label_highdemand_hint: { en: "Automatically tagged \"Brand New\" — no manual choice needed for High Demand products.", ar: "يُضاف إليه تصنيف \"جديد\" تلقائيًا، ولا يلزم اختيار يدوي لمنتجات هذا القسم." },
  adm_expiry:          { en: "Expiry date (optional — for supplements, hair products, etc.)", ar: "تاريخ الصلاحية (اختياري — للمكملات ومنتجات الشعر وغيرها)" },
  adm_expiry_hint:     { en: "Leave empty if not applicable — it will simply not be shown on the product card.", ar: "اتركه فارغًا إذا لم يكن مناسبًا للمنتج، ولن يظهر في بطاقة المنتج إطلاقًا." },
  adm_restock_date:     { en: "Expected restock date (optional)", ar: "تاريخ التوفر المتوقع (اختياري)" },
  adm_restock_hint:     { en: "Only shown to customers when Stock is 0. Leave empty to just show a generic \"Restocking soon\" message instead.", ar: "يظهر للعملاء فقط عندما تكون الكمية = 0. اتركه فارغًا لتظهر رسالة عامة \"سيتوفر قريبًا\" بدلًا منه." },

  /* ── mandatory email verification on register ── */
  lbl_email_req:      { en: "Email", ar: "البريد الإلكتروني" },
  reg_code_sent:      { en: "We sent a 6-digit code to your email. Enter it to confirm your account.", ar: "أرسلنا كودًا من 6 أرقام إلى بريدك الإلكتروني. اكتبه هنا لتأكيد حسابك." },
  reg_verify_btn:     { en: "Confirm & Create Account", ar: "تأكيد وإنشاء الحساب" },
  reg_change_email:   { en: "Change email", ar: "تغيير البريد الإلكتروني" },
  reg_err_email_phone:{ en: "Phone, a valid email and a password are all required.", ar: "رقم الهاتف والبريد الإلكتروني الصحيح وكلمة المرور كلها مطلوبة." },
  reg_err_exists_phone:{ en: "This phone number already has an account.", ar: "يوجد حساب مسجل بهذا الرقم بالفعل." },
  reg_err_exists_email:{ en: "This email already has an account.", ar: "يوجد حساب مسجل بهذا البريد الإلكتروني بالفعل." },
  reg_err_need_proof: { en: "This phone number already has orders with us. Enter one of your order numbers to confirm it's yours.", ar: "لدينا طلبات مسجلة على هذا الرقم. اكتب رقم أي طلب من طلباتك لنتأكد أن الرقم يخصك." },
  reg_err_bad_proof:  { en: "That order number doesn't match this phone number.", ar: "رقم الطلب غير مطابق لرقم الهاتف." },
  reg_proof_note:     { en: "This phone number already has orders with us. To protect them, enter any one of your order numbers (it's in your confirmation email or WhatsApp).", ar: "لدينا طلبات مسجلة على هذا الرقم. لحمايتها، اكتب رقم أي طلب من طلباتك (تجده في رسالة التأكيد على البريد الإلكتروني أو واتساب)." },
  reg_proof_lbl:      { en: "One of your order numbers", ar: "رقم طلب من طلباتك" },
  auth_err_locked:    { en: "Too many attempts. Please try again in 15 minutes.", ar: "محاولات خاطئة كثيرة. حاول مرة أخرى بعد ربع ساعة." },
  otp_err_rate:       { en: "We already sent you several codes. Please wait an hour and try again.", ar: "أرسلنا إليك عدة أكواد بالفعل. انتظر ساعة ثم حاول مرة أخرى." },
  otp_err_quota:      { en: "We can't send codes right now. Please try again later or contact us on WhatsApp.", ar: "لا يمكننا إرسال أكواد حاليًا. حاول بعد قليل أو تواصل معنا عبر واتساب." },

  /* ── homepage brands section ── */
  stores_more:        { en: "…and hundreds more. Any US store link works.", ar: "…ومئات المتاجر الأخرى. يُقبل أي رابط من أي متجر أمريكي." },

  // ---------- dashboard ----------
  dash_hello:      { en: "Hello", ar: "أهلاً" },
  dash_eyebrow:    { en: "MY ACCOUNT", ar: "حسابي" },
  dash_tab_profile:{ en: "Profile", ar: "بياناتي" },
  dash_tab_orders: { en: "My Orders", ar: "طلباتي" },
  dash_tab_new:    { en: "New Order", ar: "طلب جديد" },
  dash_profile_t:  { en: "Your details", ar: "بياناتك" },
  dash_profile_d:  { en: "Keep your name and address up to date so deliveries reach you without delay.", ar: "حافظ على تحديث اسمك وعنوانك لتصلك طلباتك دون تأخير." },
  lbl_name:        { en: "Full Name", ar: "الاسم بالكامل" },
  lbl_governorate: { en: "Governorate", ar: "المحافظة" },
  lbl_address:     { en: "Detailed Address", ar: "العنوان بالتفصيل" },
  btn_save:        { en: "Save Changes", ar: "حفظ التغييرات" },
  save_success:    { en: "Saved.", ar: "تم الحفظ." },

  // ---------- email verification ----------
  email_verified_badge:   { en: "Verified", ar: "مؤكد" },
  email_unverified_badge: { en: "Not verified", ar: "غير مؤكد" },
  email_verify_btn:       { en: "Verify", ar: "تأكيد" },
  email_verify_sending:   { en: "Sending code…", ar: "جارٍ إرسال الكود…" },
  email_verify_sent:      { en: "A 6-digit code was sent to your email.", ar: "تم إرسال كود مكون من 6 أرقام إلى بريدك الإلكتروني." },
  email_verify_code_ph:   { en: "Enter 6-digit code", ar: "أدخل الكود المكوّن من 6 أرقام" },
  email_verify_confirm:   { en: "Confirm Code", ar: "تأكيد الكود" },
  email_verify_resend:    { en: "Resend code", ar: "إعادة إرسال الكود" },
  email_verify_success:   { en: "Email verified successfully!", ar: "تم تأكيد البريد الإلكتروني بنجاح!" },
  email_verify_wrong:     { en: "Incorrect or expired code. Try again.", ar: "الكود غير صحيح أو منتهي الصلاحية. حاول مرة أخرى." },
  email_verify_need_email:{ en: "Please add an email above first.", ar: "يُرجى إضافة بريدك الإلكتروني في الأعلى أولًا." },
  email_verify_save_first:{ en: "Please save your email first, then verify it.", ar: "يُرجى حفظ بريدك الإلكتروني أولًا، ثم تأكيده." },
  dash_orders_t:   { en: "Order history", ar: "سجل الطلبات" },
  dash_orders_d:   { en: "All orders linked to your phone number.", ar: "جميع الطلبات المرتبطة برقم هاتفك." },
  dash_orders_empty:{ en: "No orders yet — your first one is one link away.", ar: "لا توجد طلبات حتى الآن — طلبك الأول على بعد رابط واحد فقط." },
  dash_new_t:      { en: "Place a new order", ar: "أنشئ طلبًا جديدًا" },
  dash_new_d:      { en: "Use the full calculator to price and confirm your next order.", ar: "استخدم الحاسبة الكاملة لحساب طلبك الجديد وتأكيده." },
  dash_new_cta:    { en: "Open Calculator", ar: "افتح الحاسبة" },

  // ---------- mart page ----------
  mart_page_eyebrow:{ en: "ALREADY IN EGYPT", ar: "متوفر في مصر" },
  mart_page_title: { en: "Try Shoppy Mart", ar: "تراي شوبي مارت" },
  mart_page_sub:   { en: "A wide range of our most-requested products, ready to ship at competitive prices — plus a selection of discounted items and Try Shoppy returns or undelivered orders, currently available for delivery.", ar: "مجموعة متنوعة من المنتجات الأكثر طلبًا متوفرة للتسليم بأسعار تنافسية، إلى جانب منتجات مخفضة ومنتجات من طلبات تراي شوبي المرتجعة أو غير المُسلَّمة، متاحة حاليًا للتسليم." },
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

  // ---------- mart: 2-day delivery banner ----------
  mart_delivery_badge:    { en: "2-Day Delivery", ar: "توصيل خلال يومين" },
  mart_delivery_sub:      { en: "Already cleared and in Egypt — no customs wait", ar: "مخلّصة جمركيًا وموجودة في مصر بالفعل، دون انتظار للجمارك" },

  // ---------- mart: back in stock ----------
  mart_back_in_stock:     { en: "Back in stock", ar: "يتوفر مجددًا في" },
  mart_restocking_soon:   { en: "Restocking soon", ar: "سيتوفر قريبًا" },

  // ---------- mart: categories ----------
  cat_accessories_toys: { en: "Accessories & Toys", ar: "الإكسسوارات والألعاب" },
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
  mart_only_left:  { en: "left in stock", ar: "المتبقي في المخزون" },

  // ---------- mart cart ----------
  mart_add_to_cart:    { en: "Add to Cart", ar: "أضف للسلة" },
  mart_added_toast:    { en: "Added to cart", ar: "تمت الإضافة للسلة" },
  mart_cart_title:     { en: "Your Cart", ar: "سلتك" },
  mart_cart_empty:     { en: "Your cart is empty.", ar: "سلتك فارغة." },
  mart_cart_subtotal:  { en: "Subtotal", ar: "الإجمالي" },
  mart_cart_checkout:  { en: "Checkout", ar: "إتمام الطلب" },
  mart_cart_continue:  { en: "Continue Shopping", ar: "مواصلة التسوق" },
  mart_cart_remove:    { en: "Remove", ar: "إزالة" },
  mart_cart_close:     { en: "Close", ar: "إغلاق" },
  mart_checkout_title: { en: "Complete your order", ar: "أكمل طلبك" },
  mart_checkout_sub:   { en: "We'll confirm by WhatsApp right after.", ar: "سنؤكد طلبك معك عبر واتساب فورًا." },
  mart_btn_place_order:{ en: "Place Order", ar: "تأكيد الطلب" },
  mart_checkout_success:{ en: "Your order was placed successfully! ✅", ar: "تم تسجيل طلبك بنجاح! ✅" },
  mart_item_singular:  { en: "item", ar: "منتج" },
  mart_item_plural:    { en: "items", ar: "منتجات" },
  mart_cart_whatsapp_btn:{ en: "Send WhatsApp Confirmation (optional)", ar: "إرسال تأكيد واتساب (اختياري)" },
  mart_loading:        { en: "Loading products…", ar: "جارٍ تحميل المنتجات…" },
  mart_empty:          { en: "No products available right now — check back soon!", ar: "لا توجد منتجات متاحة حاليًا — عُد قريبًا!" },
  mart_load_error:     { en: "Couldn't load products. Check your connection and refresh.", ar: "تعذّر تحميل المنتجات. تحقق من الاتصال وحدّث الصفحة." },
  mart_out_of_stock:   { en: "Out of stock", ar: "نفذت الكمية" },

  // ---------- mart admin ----------
  adm_title:           { en: "Mart Admin", ar: "إدارة المارت" },
  adm_sub:             { en: "Add, edit and manage Try Shoppy Mart products.", ar: "أضف وعدّل وأدر منتجات تراي شوبي مارت." },
  adm_login_title:     { en: "Admin access", ar: "دخول الإدارة" },
  adm_login_sub:       { en: "Log in with your staff account to manage products.", ar: "سجّل الدخول بحساب الموظف الخاص بك لإدارة المنتجات." },
  adm_user_label:      { en: "Username", ar: "اسم المستخدم" },
  adm_key_label:       { en: "Password", ar: "كلمة المرور" },
  adm_key_btn:         { en: "Log In", ar: "دخول" },
  adm_key_wrong:       { en: "Wrong username or password.", ar: "اسم المستخدم أو كلمة المرور غير صحيحة." },
  adm_add_product:     { en: "Add Product", ar: "إضافة منتج" },
  adm_edit_product:    { en: "Edit Product", ar: "تعديل منتج" },
  adm_name_en:         { en: "Name (English)", ar: "الاسم (إنجليزي)" },
  adm_name_ar:         { en: "Name (Arabic)", ar: "الاسم (عربي)" },
  adm_category:        { en: "Category", ar: "الفئة" },
  adm_price:           { en: "Price (EGP)", ar: "السعر (ج.م)" },
  adm_old_price:       { en: "Old Price (EGP)", ar: "السعر قبل الخصم (ج.م)" },
  adm_stock:           { en: "Stock Quantity", ar: "الكمية بالمخزن" },
  adm_image:           { en: "Image URL", ar: "رابط الصورة" },
  adm_image_hint:      { en: "Paste a direct image link (ends with .jpg / .png / .webp). Tip: upload to imgur.com or postimages.org and copy the direct link.", ar: "الصق رابط صورة مباشرًا (ينتهي بـ .jpg / .png / .webp). نصيحة: ارفع الصورة على imgur.com أو postimages.org وانسخ الرابط المباشر." },
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
  adm_logout:          { en: "Lock", ar: "خروج" },
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
  policy_back_home:    { en: "Back to Home", ar: "العودة إلى الرئيسية" },
  policy_related_t:    { en: "Related policies", ar: "سياسات ذات صلة" },
  policy_contact_t:    { en: "Questions about this policy?", ar: "لديك سؤال عن هذه السياسة؟" },
  policy_contact_cta:  { en: "Chat with us on WhatsApp", ar: "تواصل معنا على واتساب" },

  // ---------- calculator page ----------
  brand_slogan:        { en: "Your Global Shopping Partner", ar: "شريكك العالمي للتسوق" },
  calc_title:          { en: "Calculate & Confirm Order", ar: "حساب وتأكيد الطلب" },
  calc_link_label:     { en: "Product Link", ar: "رابط المنتج" },
  calc_qty_label:      { en: "Quantity", ar: "الكمية" },
  calc_country_label:  { en: "Country", ar: "دولة الشراء" },
  calc_country_usa:    { en: "USA 🇺🇸", ar: "أمريكا 🇺🇸" },
  calc_country_other:  { en: "Other Countries", ar: "دول أخرى" },
  calc_country_msg:    { en: "Sorry, we only serve orders from USA currently.", ar: "نعتذر، نوفر حاليًا الطلبات من أمريكا فقط." },
  calc_price_label:    { en: "Total Price in USD *", ar: "السعر شامل شحن الموقع ($) *" },
  // 🆕 مفتاح منفصل لـ calculator.html بس — الصفحة دي فيها حقل كمية،
  // والكود بيضرب السعر × الكمية، فلازم العميل يفهم إنه يكتب سعر
  // القطعة الواحدة مش الإجمالي (نفس صياغة DirectOrder.html بالظبط).
  // calculatorOP.html بتفضل على calc_price_label لأنها مفيهاش كمية أصلاً.
  calc_unit_price_label: { en: "Price per item in USD (incl. store shipping) *", ar: "سعر القطعة الواحدة شامل شحن الموقع ($) *" },
  calc_weight_label:   { en: "Weight (g) *", ar: "الوزن (جرام) *" },
  calc_weight_ph:      { en: "e.g. 500", ar: "مثلًا: 500" },
  calc_category_label: { en: "Category *", ar: "الفئة *" },
  calc_category_select:{ en: "Select category...", ar: "اختر الفئة..." },
  calc_desc_label:     { en: "Additional Description (optional)", ar: "وصف إضافي (اختياري)" },
  calc_size_ph:        { en: "Size", ar: "المقاس" },
  calc_color_ph:       { en: "Color", ar: "اللون" },
  calc_notes_ph:       { en: "Other Notes", ar: "ملاحظات أخرى" },
  calc_btn_calculate:  { en: "Calculate Price", ar: "احسب السعر النهائي" },
  calc_result_total_label:{ en: "Total Cost (Shipping & Customs included)", ar: "إجمالي التكلفة شاملة الشحن والجمارك" },
  calc_result_cod_note:{ en: "Cash on Delivery up to 10,000 EGP, no extra charge ✓ | Final confirmation after review", ar: "الدفع عند الاستلام حتى 10000 ج.م دون أي زيادة ✓ | التأكيد النهائي بعد المراجعة" },
  calc_result_deposit_note:{ en: "Over 10,000 EGP: a deposit is required before we buy | Final confirmation after review", ar: "الطلبات التي تتجاوز 10000 ج.م: يُطلب عربون قبل الشراء | التأكيد النهائي بعد المراجعة" },
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
  calc_btn_whatsapp:   { en: "Send WhatsApp Confirmation", ar: "إرسال رسالة تأكيد عبر واتساب" },
  calc_btn_track:      { en: "Track Your Order", ar: "تتبع شحنتك" },
  calc_alert_country:  { en: "Orders available from USA only", ar: "الطلبات متاحة من أمريكا فقط حاليًا" },
  calc_alert_missing:  { en: "Please enter the price, category, and actual weight (grams)", ar: "يُرجى إدخال السعر والفئة والوزن الفعلي (بالجرام)" },
  calc_alert_name:     { en: "Please enter your name", ar: "يُرجى إدخال الاسم" },
  co_err_name:    { en: "Please enter your full name", ar: "يُرجى كتابة اسمك بالكامل" },
  co_err_phone:   { en: "Enter a valid Egyptian mobile number, e.g. 01012345678", ar: "يُرجى كتابة رقم هاتف مصري صحيح، مثال: 01012345678" },
  co_err_email:   { en: "This email doesn't look right — fix it or leave it empty", ar: "يبدو أن البريد الإلكتروني غير صحيح — صحّحه أو اتركه فارغًا" },
  co_err_gov:     { en: "Please choose your governorate", ar: "يُرجى اختيار المحافظة" },
  co_err_address: { en: "Please write your address in detail (area, street, building)", ar: "يُرجى كتابة العنوان بالتفصيل (المنطقة، الشارع، رقم المبنى)" },
  calc_err_qty:   { en: "Quantity must be 1 or more", ar: "يجب أن تكون الكمية 1 أو أكثر" },
  calc_err_link:  { en: "The product link must start with https://", ar: "يجب أن يبدأ رابط المنتج بـ https://" },
  /* ── calculator v6 ── */
  c2_sec1:        { en: "The product", ar: "المنتج" },
  c2_sec2:        { en: "Type & weight", ar: "النوع والوزن" },
  c2_sec3:        { en: "Size, color & notes", ar: "المقاس واللون والملاحظات" },
  c2_optional:    { en: "optional", ar: "اختياري" },
  c2_price_label: { en: "Price of ONE item (USD)", ar: "سعر القطعة الواحدة بالدولار" },
  c2_price_hint:  { en: "The price of a single piece as shown on the store. If the store charges shipping inside the US, add it. Ordering 3? Keep the price of one and set quantity to 3.", ar: "سعر القطعة الواحدة كما هو مكتوب في المتجر. إذا كان المتجر يحتسب شحنًا داخل أمريكا فأضفه إليه. تطلب 3 قطع؟ اكتب سعر القطعة الواحدة واجعل الكمية 3." },
  c2_usa_only:    { en: "We currently buy from US stores only.", ar: "نشتري حاليًا من المتاجر الأمريكية فقط." },
  c2_category_label: { en: "Category", ar: "الفئة" },
  c2_weight_label:{ en: "Weight of ONE item", ar: "وزن القطعة الواحدة" },
  c2_weight_hint: { en: "On Amazon it is listed as Item Weight or Shipping Weight, often in lb or oz — just pick that unit next to the box. Not sure? Enter your best estimate; we review every order before buying.", ar: "في أمازون تجده تحت Item Weight أو Shipping Weight، وغالبًا بوحدة lb أو oz — اختر الوحدة نفسها بجانب الخانة. لست متأكدًا؟ اكتب تقديرك، فنحن نراجع كل طلب قبل الشراء." },
  c2_volume_label:{ en: "Bottle size (ONE item)", ar: "حجم العبوة الواحدة" },
  c2_u_ml:        { en: "ml", ar: "مل" },
  c2_u_g:         { en: "g", ar: "جم" },
  c2_u_kg:        { en: "kg", ar: "كجم" },
  c2_u_cm:        { en: "cm", ar: "سم" },
  c2_u_in:        { en: "in", ar: "بوصة" },
  c2_dims_title:  { en: "Box dimensions", ar: "أبعاد الكرتونة" },
  c2_dims_hint:   { en: "Only matters for big, light items (a pillow, a toy in a large box). Carriers charge the bigger of the real weight and the box size. Don't know them? Leave empty.", ar: "مهمة فقط للأغراض الكبيرة الخفيفة (وسادة، لعبة في كرتونة كبيرة). يُحتسب الشحن على الأكبر: الوزن الفعلي أو حجم الكرتونة. لا تعرفها؟ اتركها فارغة." },
  c2_size_ex:     { en: "e.g. M, 42", ar: "مثلًا: M أو 42" },
  c2_color_ex:    { en: "e.g. Black", ar: "مثلًا: أسود" },
  c2_notes_ex:    { en: "Anything we should know", ar: "أي معلومة يجب أن نعرفها" },
  c2_wait_t:      { en: "Your final price appears here", ar: "سيظهر السعر النهائي هنا" },
  c2_need:        { en: "Still needed:", ar: "ينقص:" },
  calcop_weight_hint: { en: "Type the weight exactly as the store shows it and pick the same unit (lb, oz, kg…) — no manual conversion needed.", ar: "اكتب الوزن كما هو مكتوب في المتجر تمامًا واختر الوحدة نفسها (lb، oz، كجم…) دون تحويل يدوي." },
  calcop_link_note: { en: "Add the link if you're unsure what the product is (battery, spray, perfume, chemicals, supplements…) — the quick check reads the product name from it and warns you right away.", ar: "من المهم إضافة الرابط إذا كنت تشك في نوع المنتج (بطارية، بخاخ، عطر، كيماويات، مكملات…)؛ فالفحص السريع يقرأ اسم المنتج منه وينبهك فورًا." },
  calcop_copy:    { en: "📋 Copy price for the customer", ar: "📋 انسخ السعر للعميل" },
  c2_req_msg:     { en: "This field is required", ar: "هذه الخانة مطلوبة" },
  c2_m_price:     { en: "price of one item", ar: "سعر القطعة" },
  c2_m_cat:       { en: "category", ar: "الفئة" },
  c2_m_weight:    { en: "weight", ar: "الوزن" },
  c2_err_link_req:{ en: "Paste the product link so we know exactly what to buy", ar: "أضف رابط المنتج لنتمكن من شرائه بدقة" },
  calc_recalc_note: { en: "You changed the details — press Calculate again", ar: "غيّرت البيانات — اضغط «احسب السعر» مرة أخرى" },
  mart_cart_updated: { en: "Your cart was updated with the latest prices and stock — please review it", ar: "تم تحديث السلة بأحدث الأسعار والمخزون — راجعها قبل التأكيد" },
  mart_max_stock: { en: "That's all we have in stock", ar: "هذه كل الكمية المتاحة في المخزون" },
  calc_alert_confirmed:{ en: "Your order was placed successfully! A confirmation email will be sent to you. Sending a WhatsApp message is optional.", ar: "تم تسجيل طلبك بنجاح! وستصلك رسالة تأكيد على البريد الإلكتروني. إرسال رسالة واتساب اختياري." },

  // ---------- cart flow (multi-item calculator) ----------
  calc_btn_addcart:    { en: "➕ Add to Cart", ar: "➕ أضف للسلة" },
  calc_cart_title:     { en: "Your Cart", ar: "سلة طلباتك" },
  calc_cart_item_qty:  { en: "Qty", ar: "الكمية" },
  calc_cart_remove:    { en: "Remove", ar: "حذف" },
  calc_cart_total:     { en: "Total", ar: "الإجمالي" },
  calc_btn_additem:    { en: "➕ Add Another Item", ar: "➕ أضف منتجًا آخر" },
  calc_btn_checkout:   { en: "✅ Checkout", ar: "✅ إتمام الطلب" },
  calc_btn_back_cart:  { en: "← Back to Cart", ar: "← العودة إلى السلة" },
  calc_btn_confirm_all: { en: "Confirm All Orders", ar: "تأكيد كل الطلبات" },
  calc_alert_added:    { en: "Added to cart ✓", ar: "تمت الإضافة للسلة ✓" },
  calc_alert_cart_empty: { en: "Your cart is empty — add at least one item first", ar: "السلة فارغة — أضف منتجًا واحدًا على الأقل أولًا" },
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
  sup_opt_gummies:     { en: "Gummies", ar: "حلوى مضغ (جمي)" },
  sup_opt_powder:      { en: "Powder", ar: "مسحوق" },
  sup_opt_liquid:      { en: "Liquid", ar: "سوائل" },
  sup_unit_tablets:    { en: "tablets", ar: "كبسولة" },
  sup_unit_gummies:    { en: "gummies", ar: "حبة جمي" },
  calc_sup_note_powder:{ en: "Please enter the exact weight in grams", ar: "يُرجى إدخال الوزن بالجرام بدقة" },
  calc_sup_note_liquid:{ en: "Enter the bottle size in ml (or fl oz) exactly as the store shows it", ar: "اكتب حجم العبوة بالمليلتر (أو fl oz) كما هو مكتوب في المتجر" },
  calc_sup_note_auto:  { en: "Weight auto-set", ar: "تم تحديد الوزن تلقائيًا" },
  calc_sup_note_auto2: { en: "based on piece count", ar: "حسب عدد الحبات" },

  // ---------- ops calculator (calculatorOP.html — internal tool) ----------
  calcop_badge:        { en: "INTERNAL TOOL", ar: "أداة داخلية" },
  calcop_title:        { en: "Quick Price Estimate", ar: "تقدير سريع للسعر" },
  calcop_sub:          { en: "For staff use — estimates only, no order is created.", ar: "للاستخدام الداخلي فقط — تقدير سعر بدون إنشاء طلب." },
  calc_dims_label:     { en: "Dimensions in CM (optional)", ar: "الأبعاد بالسنتيمتر (اختياري)" },
  calc_length_ph:      { en: "Length", ar: "الطول" },
  calc_width_ph:       { en: "Width", ar: "العرض" },
  calc_height_ph:      { en: "Height", ar: "الارتفاع" },
  calcop_alert_missing:{ en: "Please enter Price, Category & Weight", ar: "يُرجى إدخال السعر والفئة والوزن" },
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
  trk_inputPlaceholder: { en: "TRY12345678", ar: "TRY12345678" },
  trk_inputHint:        { en: "You can search by order number (e.g. TRY12345678)", ar: "يمكنك البحث برقم الطلب (مثال: TRY12345678)" },
  trk_trackBtn:         { en: "Track Now", ar: "تتبع الآن" },
  trk_searching:        { en: "Searching...", ar: "جارٍ البحث..." },
  trk_emptyInput:       { en: "Please enter an order number", ar: "يرجى إدخال رقم الطلب" },
  trk_connError:        { en: "Connection Error", ar: "خطأ في الاتصال" },
  trk_invalidOrder:     { en: "Invalid Order Number", ar: "رقم الطلب غير صحيح" },
  trk_orderLabel:       { en: "Order No.", ar: "رقم الطلب" },
  trk_qtyLabel:         { en: "Quantity", ar: "الكمية" },
  trk_arrivalLabel:     { en: "Expected Arrival", ar: "موعد الوصول المتوقع" },
  trk_canceledMsg:      { en: "This order has been canceled", ar: "تم إلغاء هذا الطلب" },
  trk_delayedMsg:       { en: "This order is slightly delayed — we're following up on it", ar: "هذا الطلب متأخر قليلًا عن الموعد المتوقع، ونعمل على متابعته." },
  trk_onHoldMsg:        { en: "This order is on hold — it needs a review or some extra information before it can continue. Our team will contact you.", ar: "الطلب متوقف مؤقتًا، ويحتاج إلى مراجعة أو معلومات إضافية قبل استكماله، وسيتواصل معك فريقنا." },
  trk_returnedMsg:      { en: "This order has been returned. Our team will contact you with the details.", ar: "تم إرجاع هذا الطلب، وسيتواصل معك فريقنا بالتفاصيل." },
  trk_lostMsg:          { en: "There's an issue with this shipment and we're following up with the carrier. Our team will contact you with the details.", ar: "حدثت مشكلة في شحنة هذا الطلب، ونتابعها مع شركة الشحن، وسيتواصل معك فريقنا بالتفاصيل." },
  trk_historyTitle:     { en: "Update History", ar: "سجل التحديثات" },
  trk_siblingsTitle:    { en: "Your other in-progress orders", ar: "طلباتك الجارية الأخرى" },
  trk_helpQuestion:     { en: "Have a question about your order?", ar: "هل لديك استفسار عن طلبك؟" },
  trk_helpCta:          { en: "Contact us on WhatsApp 💬", ar: "تواصل معنا على واتساب 💬" },
  trk_pieceWord:        { en: "pcs", ar: "قطعة" },
  trk_currency:         { en: "EGP", ar: "ج.م" },

  /* ═══════════════════════════════════════════════════════════
     v5 redesign — new copy. Nothing below replaces a business
     rule; it only names things that already existed on the site
     but had no label of their own.
     ═══════════════════════════════════════════════════════════ */

  // ---------- hero: order preview card ----------
  hc_head:         { en: "Order preview", ar: "معاينة الطلب" },
  hc_live:         { en: "Example", ar: "مثال" },
  hc_chip_link:    { en: "Link received", ar: "وصلنا الرابط" },
  hc_chip_track:   { en: "Tracked to your door", ar: "متابعة حتى باب المنزل" },
  hc_row_item:     { en: "Item price", ar: "سعر المنتج" },
  hc_row_ship:     { en: "Shipping", ar: "الشحن" },
  hc_row_customs:  { en: "Customs & handling", ar: "الجمارك والتخليص" },
  hc_total:        { en: "Total in EGP", ar: "الإجمالي بالجنيه" },
  hc_status:       { en: "Confirmed", ar: "تم التأكيد" },

  // ---------- hero: trust strip ----------
  tstrip_1:        { en: "We buy on your behalf.", ar: "نشتري نيابةً عنك." },
  tstrip_2:        { en: "One clear EGP number.", ar: "رقم واحد واضح بالجنيه." },
  tstrip_3:        { en: "Consolidated where applicable.", ar: "نجمعها في شحنة واحدة عند الإمكان." },
  tstrip_4:        { en: "Check anytime with your order number.", ar: "تابع في أي وقت برقم الطلب." },

  // ---------- home: metallic strip ----------
  ms_1:            { en: "Shop global", ar: "تسوّق من العالم" },
  ms_2:            { en: "One price", ar: "سعر واحد" },
  ms_3:            { en: "Delivered to your door", ar: "يصل إلى باب منزلك" },

  // ---------- home: calculator band ----------
  calcband_eyebrow:{ en: "PRICE CALCULATOR", ar: "حاسبة السعر" },
  calcband_title:  { en: "Know the full EGP price before you commit", ar: "اعرف السعر الكامل بالجنيه قبل الموافقة" },
  calcband_sub:    { en: "Enter the product details and the calculator gives you one final price in Egyptian pounds — item, applicable shipping and customs together. Add several items to one cart, then confirm.", ar: "أدخل بيانات المنتج، وستمنحك الحاسبة سعرًا نهائيًا واحدًا بالجنيه المصري يشمل المنتج والشحن والجمارك المطبقة. يمكنك إضافة أكثر من منتج إلى السلة نفسها، ثم التأكيد." },
  calcband_f1:     { en: "From any supported US store", ar: "من أي متجر أمريكي متاح" },
  calcband_f2_t:   { en: "Quantity, weight & dimensions", ar: "الكمية والوزن والأبعاد" },
  calcband_f2:     { en: "Used to work out shipping", ar: "تُستخدم في حساب الشحن" },
  calcband_f3:     { en: "Clothes, electronics, cosmetics and more", ar: "ملابس، إلكترونيات، مستحضرات تجميل وغيرها" },
  calcband_out_t:  { en: "Final price in EGP", ar: "السعر النهائي بالجنيه" },
  calcband_out:    { en: "Shipping & customs included", ar: "شامل الشحن والجمارك" },

  // ---------- home: Try Shoppy Mart band ----------
  mart_badge:      { en: "ALREADY IN EGYPT", ar: "متوفر في مصر" },
  mart_sub_home:   { en: "Selected products that are already here in Egypt — including discounted, outlet, open-box and returned items from previous Try Shoppy orders. Browse, order, and get them without the international wait.", ar: "منتجات مختارة موجودة بالفعل في مصر، منها منتجات مخفضة وأوتليت وعبوات مفتوحة ومرتجعات من طلبات تراي شوبي السابقة. تصفّح واطلب واستلم دون انتظار الشحن الدولي." },
  mart_pt_1:       { en: "Discounted, outlet, open-box and returned items from earlier orders", ar: "منتجات مخفضة وأوتليت وعبوات مفتوحة ومرتجعات من طلبات سابقة" },
  mart_pt_2:       { en: "Already in Egypt — no international shipping step", ar: "موجودة في مصر بالفعل، دون مرحلة الشحن الدولي" },
  mart_pt_3:       { en: "Organized by category, with condition and availability on every product", ar: "مقسمة حسب الفئة، مع حالة المنتج وتوفره على كل منتج" },
  mart_vs_intl:    { en: "Looking for something from a US store instead?", ar: "تبحث عن منتج من متجر أمريكي بدلًا من ذلك؟" },

  // ---------- home: stores + payments ----------
  stores_disclaimer:{ en: "Shown as examples of stores our customers shop from. Try Shoppy is not affiliated with, endorsed by, or a partner of these companies. Some products are restricted — see our <a href=\"restricted-items.html\">Restricted Items</a> list.", ar: "معروضة كأمثلة على المتاجر التي يشتري منها عملاؤنا. تراي شوبي ليست تابعة لهذه الشركات ولا شريكة لها ولا معتمدة منها. توجد منتجات ممنوعة — راجع <a href=\"restricted-items.html\">قائمة المنتجات الممنوعة</a>." },
  pay_sub:         { en: "Choose the method that suits you when you confirm your order.", ar: "اختر الطريقة التي تناسبك عند تأكيد الطلب." },

  // ---------- home: FAQ ----------
  faq_eyebrow:     { en: "SUPPORT", ar: "الدعم" },
  faq_title:       { en: "Frequently asked questions", ar: "الأسئلة الشائعة" },
  faq_q1:          { en: "How long does delivery take?", ar: "كم يستغرق وصول الطلب؟" },
  faq_a1:          { en: "Estimated delivery time is 7–21 days from purchase confirmation, depending on the store, the international carrier schedule, and customs processing. Full details are in our <a href=\"shipping-policy.html\">Shipping Policy</a>.", ar: "مدة التوصيل المتوقعة من 7 إلى 21 يومًا من تأكيد الشراء، حسب المتجر وجدول شركة الشحن الدولي والإجراءات الجمركية. التفاصيل الكاملة في <a href=\"shipping-policy.html\">سياسة الشحن</a>." },
  faq_q2:          { en: "Do I need an international credit card?", ar: "هل أحتاج إلى بطاقة دولية؟" },
  faq_a2:          { en: "No. Try Shoppy buys the product on your behalf and you pay us in Egypt — Cash on Delivery, InstaPay, Visa, Mastercard, PayPal or bank transfer.", ar: "لا. تشتري تراي شوبي المنتج نيابةً عنك، وتدفع لنا داخل مصر: الدفع عند الاستلام، أو إنستاباي، أو فيزا، أو ماستركارد، أو باي بال، أو تحويل بنكي." },
  faq_q3:          { en: "Does the price include shipping and customs?", ar: "هل السعر شامل الشحن والجمارك؟" },
  faq_a3:          { en: "Yes. The calculator combines the item price with the applicable shipping and customs into a single EGP price, shown to you before you confirm the order.", ar: "نعم. تجمع الحاسبة سعر المنتج مع الشحن والجمارك المطبقة في سعر واحد بالجنيه، ويظهر لك قبل تأكيد الطلب." },
  faq_q4:          { en: "Where do I find my order number?", ar: "من أين أحصل على رقم الطلب؟" },
  faq_a4:          { en: "Orders from US stores look like <b class=\"mono\">TRY12345678</b>, and Try Shoppy Mart orders look like <b class=\"mono\">MART123456</b>. You receive your number when the order is confirmed, and you can enter it on the <a href=\"track.html\">Track Order</a> page at any time.", ar: "رقم طلبات المتاجر الأمريكية يكون بهذا الشكل <b class=\"mono\">TRY12345678</b>، وطلبات تراي شوبي مارت بهذا الشكل <b class=\"mono\">MART123456</b>. يصلك الرقم عند تأكيد الطلب، ويمكنك إدخاله في صفحة <a href=\"track.html\">تتبع الطلب</a> في أي وقت." },
  faq_q5:          { en: "Can I cancel an order?", ar: "هل يمكنني إلغاء الطلب؟" },
  faq_a5:          { en: "Cancelling before we purchase the item is free of charge. After purchase, the terms in our <a href=\"cancellation-policy.html\">Cancellation Policy</a> apply.", ar: "الإلغاء قبل شراء المنتج مجاني تمامًا. وبعد الشراء تُطبق شروط <a href=\"cancellation-policy.html\">سياسة الإلغاء</a>." },
  faq_q6:          { en: "Are any products restricted?", ar: "هل توجد منتجات ممنوعة؟" },
  faq_a6:          { en: "Yes — some categories cannot be shipped for compliance reasons. Please check the <a href=\"restricted-items.html\">Restricted Items</a> list before ordering.", ar: "نعم، توجد فئات لا يمكننا شحنها لأسباب تتعلق بالامتثال. يُرجى مراجعة <a href=\"restricted-items.html\">قائمة المنتجات الممنوعة</a> قبل الطلب." },
  faq_more:        { en: "Still have a question?", ar: "ما زال لديك سؤال؟" },

  // ---------- footer ----------
  foot_made:       { en: "Made for shoppers in Egypt 🇪🇬", ar: "مصممة لعملائنا في مصر 🇪🇬" },

  // ---------- track page (redesign) ----------
  trk_eyebrow:     { en: "ORDER TRACKING", ar: "تتبع الطلب" },
  trk_hero_title:  { en: "Track Your Order", ar: "تتبع طلبك" },
  trk_hero_sub:    { en: "Enter the order number you received when your order was confirmed.", ar: "أدخل رقم الطلب الذي وصلك عند تأكيد طلبك." },
  trk_format_note: { en: "Orders from US stores start with TRY, and Try Shoppy Mart orders start with MART.", ar: "تبدأ طلبات المتاجر الأمريكية بـ TRY، وتبدأ طلبات تراي شوبي مارت بـ MART." },
  trk_help_t:      { en: "Can't find your order number?", ar: "لا تجد رقم طلبك؟" },
  trk_help_d:      { en: "It is sent to you when the order is confirmed, and it is listed in your account under My Orders.", ar: "يُرسل إليك عند تأكيد الطلب، ويمكنك أيضًا العثور عليه في حسابك ضمن «طلباتي»." },
  trk_open_account:{ en: "Open my account", ar: "افتح حسابي" },
  trk_stage_title: { en: "Order progress", ar: "مراحل الطلب" },

  // ---------- calculator (redesign) ----------
  calc_step_1:     { en: "Product", ar: "المنتج" },
  calc_step_2:     { en: "Cart", ar: "السلة" },
  calc_step_3:     { en: "Details", ar: "بياناتك" },
  calc_step_4:     { en: "Done", ar: "تم" },
  calc_hero_sub:   { en: "Item, applicable shipping and customs — one final price in EGP before you commit.", ar: "المنتج والشحن والجمارك المطبقة — سعر نهائي واحد بالجنيه قبل موافقتك." },
  calc_link_hint:  { en: "Copy the product page link from the US store and paste it here.", ar: "انسخ رابط صفحة المنتج من المتجر الأمريكي والصقه هنا." },
  calc_sec_product:{ en: "Product details", ar: "بيانات المنتج" },
  calc_sec_ship:   { en: "Shipping basis", ar: "أساس حساب الشحن" },
  calc_sec_extra:  { en: "Optional details", ar: "بيانات اختيارية" },
  calc_help_d:     { en: "Our team is on WhatsApp if you need a hand with a link, a category or a price.", ar: "فريقنا متاح على واتساب إذا احتجت إلى مساعدة بخصوص رابط أو فئة أو سعر." },

  // ---------- login (redesign) ----------
  auth_side_t:     { en: "Your orders, in one place", ar: "كل طلباتك في مكان واحد" },
  auth_side_1:     { en: "Track every order with its TRY number", ar: "تابع كل طلب برقم TRY الخاص به" },
  auth_side_2:     { en: "Save your delivery details for faster checkout", ar: "احفظ بيانات التوصيل ليصبح طلبك أسرع" },
  auth_side_3:     { en: "See your full order history any time", ar: "اطّلع على سجل طلباتك كاملًا في أي وقت" },
  auth_back_home:  { en: "Back to home", ar: "العودة إلى الرئيسية" },

  // ---------- 404 ----------
  nf_title:        { en: "This page doesn't exist", ar: "هذه الصفحة غير موجودة" },
  nf_sub:          { en: "The link may be old, or the product may no longer be available. Everything else is still here.", ar: "ربما يكون الرابط قديمًا، أو لم يعد المنتج متاحًا. كل شيء آخر ما زال في مكانه." },
  nf_home:         { en: "Back to home", ar: "العودة إلى الرئيسية" }
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
