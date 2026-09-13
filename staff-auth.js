/* ============================================================
   TRY SHOPPY — staff-auth.js  (secure replacement for users.js)
   ------------------------------------------------------------
   OLD behaviour (removed): fetched EVERY staff member's PLAINTEXT
   password into the browser on page load — before anyone even
   attempted to log in. Anyone who opened the dashboard, or anyone
   who called the old Apps Script URL directly, could read every
   staff password in clear text.

   NEW behaviour: the browser only ever sends a username + password
   guess and gets back { success, label } — nothing else. The actual
   password list never leaves the Google Apps Script backend. Login
   is verified server-side with a salted SHA-256 hash, exactly like
   customer login on the main site (backend/Users_Code.gs), plus a
   brute-force lockout after repeated failed attempts.

   See backend/Staff_Code.gs + backend/STAFF_SETUP.md.
   ============================================================ */

// ⚠️ Paste your Staff Apps Script /exec URL here after deploying
// backend/Staff_Code.gs as its own Web App (see STAFF_SETUP.md).
const STAFF_API_URL = "https://script.google.com/macros/s/AKfycbz3eNsySiw8ZoiDrq6aRmn2h-JT4wm4mNr7TlfEEYTZo0EXSEyOXXV7G0l4phYUm4bYhg/exec";

function tsStaffApi(payload) {
  return fetch(STAFF_API_URL, {
    method: "POST",
    body: JSON.stringify(payload)
  }).then(res => res.json());
}

/**
 * Verifies a username + password against the server.
 * Resolves to { success:true, label } on success, or
 * { success:false, message, code? } on failure.
 * Never resolves with any password/hash data.
 */
function tsStaffLogin(username, password) {
  return tsStaffApi({ action: "login", username, password });
}

/**
 * Safe staff directory — usernames + display names ONLY, no
 * credentials. Used to populate "responsible employee" dropdowns.
 * Resolves to an array like [{ username, label }, ...].
 */
function tsListStaff() {
  return tsStaffApi({ action: "listStaff" }).then(res => (res && res.staff) || []);
}
