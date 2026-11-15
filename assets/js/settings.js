// settings.js
// The settings page and dark mode. Every change is saved immediately.

// The three simple on/off settings. Dark mode is handled separately because it changes the page.
const SETTING_TOGGLES = [
  { id: "notificationsToggle", key: "notifications", label: "Notifications" },
  { id: "autoLogoutToggle", key: "autoLogout", label: "Auto Logout" },
  { id: "twoFactorToggle", key: "twoFactor", label: "Two-Factor Authentication" },
];

function initializeSettings() {
  const saved = load(STORAGE_KEYS.settings, {});

  for (const toggle of SETTING_TOGGLES) {
    const checkbox = document.getElementById(toggle.id);
    checkbox.checked = Boolean(saved[toggle.key]);

    checkbox.addEventListener("change", () => {
      showToast(`${toggle.label} ${checkbox.checked ? "Enabled" : "Disabled"}`);
      saveSettings();
    });
  }

  setDarkMode(Boolean(saved.darkMode));

  document.getElementById("darkModeToggle").addEventListener("change", (event) => {
    setDarkMode(event.target.checked);
    saveSettings();
  });

  document.getElementById("themeToggleBtn").addEventListener("click", toggleDarkMode);
}

function isDarkMode() {
  return document.body.classList.contains("dark-mode");
}

// The one place that changes the theme. It keeps the page, the checkbox and the header icon in step.
function setDarkMode(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  document.getElementById("darkModeToggle").checked = isDark;
  document.querySelector("#themeToggleBtn i").className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
}

function toggleDarkMode() {
  setDarkMode(!isDarkMode());
  saveSettings();
}

function saveSettings() {
  const settings = { darkMode: isDarkMode() };

  for (const toggle of SETTING_TOGGLES) {
    settings[toggle.key] = document.getElementById(toggle.id).checked;
  }

  save(STORAGE_KEYS.settings, settings);
}
