/* ==========================================
   DOM ELEMENTS
========================================== */

const notificationsToggle = document.getElementById("notificationsToggle");

const autoLogoutToggle = document.getElementById("autoLogoutToggle");

const twoFactorToggle = document.getElementById("twoFactorToggle");

const darkModeToggle = document.getElementById("darkModeToggle");

const themeToggleBtn = document.getElementById("themeToggleBtn");

const darkModeIcon = themeToggleBtn?.querySelector("i");

/* ==========================================
   SETTINGS INITIALIZATION
========================================== */

function initializeSettings() {
  initializeNotifications();

  initializeAutoLogout();

  initializeTwoFactor();

  initializeDarkMode();

  loadSettings();
}

function initializeNotifications() {
  if (!notificationsToggle) {
    return;
  }

  notificationsToggle.addEventListener("change", () => {
    const status = notificationsToggle.checked ? "Enabled" : "Disabled";

    // alert(`Notifications ${status}`);
    showToast(`Notifications ${status}`);
    saveSettings();
  });
}

function initializeAutoLogout() {
  if (!autoLogoutToggle) {
    return;
  }

  autoLogoutToggle.addEventListener("change", () => {
    const status = autoLogoutToggle.checked ? "Enabled" : "Disabled";

    // alert(`Auto Logout ${status}`);
    showToast(`Auto Logout ${status}`);
    saveSettings();
  });
}

function initializeTwoFactor() {
  if (!twoFactorToggle) {
    return;
  }

  twoFactorToggle.addEventListener("change", () => {
    const status = twoFactorToggle.checked ? "Enabled" : "Disabled";

    // alert(`Two-Factor Authentication ${status}`);
    showToast(`Two-Factor Authentication ${status}`);
    saveSettings();
  });
}

function initializeDarkMode() {
  if (!darkModeToggle) {
    return;
  }

  darkModeToggle.addEventListener("change", () => {
    updateDarkMode(darkModeToggle.checked);
    saveSettings();
  });
}

function updateDarkMode(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  darkModeToggle.checked = isDark;

  if (darkModeIcon) {
    darkModeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }
}


if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", () => {
      // console.log("Moon clicked");

    updateDarkMode(!document.body.classList.contains("dark-mode"));
    saveSettings();
  });
}

/* ==========================================
   LOCAL STORAGE
========================================== */

function saveSettings() {

    const settings = {

        notifications: notificationsToggle.checked,

        autoLogout: autoLogoutToggle.checked,

        twoFactor: twoFactorToggle.checked,

        darkMode: darkModeToggle.checked

    };

    localStorage.setItem(
        "dashboardSettings",
        JSON.stringify(settings)
    );

}

function loadSettings() {

    const settings = JSON.parse(
        localStorage.getItem("dashboardSettings")
    );

    if (!settings) {
        return;
    }

    notificationsToggle.checked = settings.notifications;

    autoLogoutToggle.checked = settings.autoLogout;

    twoFactorToggle.checked = settings.twoFactor;

    updateDarkMode(settings.darkMode);

}