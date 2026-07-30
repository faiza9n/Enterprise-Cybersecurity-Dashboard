/* ==========================================
   DOM ELEMENTS
========================================== */

const profileBtn = document.getElementById("profileBtn");

const profileDropdown = document.getElementById("profileDropdown");

const profilePageBtn = document.getElementById("profilePageBtn");

const settingsPageBtn = document.getElementById("settingsPageBtn");

const darkModeBtn = document.getElementById("darkModeBtn");

const logoutBtn = document.getElementById("logoutBtn");

/* ==========================================
   INITIALIZE
========================================== */

function initializeProfileDropdown() {
  if (!profileBtn) {
    return;
  }

  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    profileDropdown.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    if (
      !profileDropdown.contains(event.target) &&
      !profileBtn.contains(event.target)
    ) {
      profileDropdown.classList.remove("show");
    }
  });

  profilePageBtn.addEventListener("click", () => {
    switchPage("profile");

    profileDropdown.classList.remove("show");
  });

  settingsPageBtn.addEventListener("click", () => {
    switchPage("settings");

    profileDropdown.classList.remove("show");
  });

  darkModeBtn.addEventListener("click", () => {
    document.getElementById("darkModeToggle").click();

    profileDropdown.classList.remove("show");
  });

  logoutBtn.addEventListener("click", () => {
    profileDropdown.classList.remove("show");

    showConfirm(
      "Logout",

      "Are you sure you want to logout?",

      () => {
        showToast("Logged out successfully.");
      },
    );
  });
}
