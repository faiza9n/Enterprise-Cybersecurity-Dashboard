// app.js
// Starts the application and handles the parts that belong to the whole page:
// navigation, the date, the loading screen, the profile menu and logout.

document.addEventListener("DOMContentLoaded", () => {
  initializeModal();
  initializeNotifications();
  initializeNavigation();
  initializeCharts();
  initializeThreats();
  initializeUsers();
  initializeReports();
  initializeSettings();
  initializeProfile();
  initializeProfileMenu();
  initializeMobileMenu();
  showCurrentDate();
  showLoadingScreen();
});

/* ---------- Navigation ---------- */

function initializeNavigation() {
  for (const link of document.querySelectorAll(".sidebar nav a")) {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      if (link.id === "sidebarLogoutBtn") {
        confirmLogout();
      } else {
        switchPage(link.getAttribute("href").substring(1)); // "#users" -> "users"
      }
    });
  }
}

// Shows one section and hides the rest. This is what makes it a single-page application.
function switchPage(sectionId) {
  const target = document.getElementById(sectionId);
  if (!target) return;

  for (const section of document.querySelectorAll(".page-section")) {
    section.classList.toggle("active-page", section === target);
  }

  for (const link of document.querySelectorAll(".sidebar nav a")) {
    link.classList.toggle("active", link.getAttribute("href") === `#${sectionId}`);
  }
}

/* ---------- Slide menu for phones and tablets ---------- */

// The CSS does the sliding. JavaScript only adds or removes the class "menu-open" on the body.
function setMenuOpen(isOpen) {
  document.body.classList.toggle("menu-open", isOpen);
  document.getElementById("menuBtn").setAttribute("aria-expanded", isOpen);
}

function initializeMobileMenu() {
  const desktop = window.matchMedia("(min-width: 993px)");

  document.getElementById("menuBtn").addEventListener("click", () => {
    setMenuOpen(!document.body.classList.contains("menu-open"));
  });

  // Close when the user taps the dark area, picks a page, or presses Escape.
  document.getElementById("sidebarOverlay").addEventListener("click", () => setMenuOpen(false));

  for (const link of document.querySelectorAll(".sidebar nav a")) {
    link.addEventListener("click", () => setMenuOpen(false));
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuOpen(false);
  });

  // If the window is made wide again, the desktop sidebar takes over.
  desktop.addEventListener("change", () => setMenuOpen(false));
}

/* ---------- Header ---------- */

function showCurrentDate() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  document.querySelector(".current-date span").textContent = today;
}

function initializeProfileMenu() {
  const button = document.getElementById("profileBtn");
  const menu = document.getElementById("profileDropdown");

  // Each menu item and what it does.
  const actions = {
    profilePageBtn: () => switchPage("profile"),
    settingsPageBtn: () => switchPage("settings"),
    darkModeBtn: toggleDarkMode,
    logoutBtn: confirmLogout,
  };

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    menu.classList.toggle("show");
  });

  for (const [buttonId, action] of Object.entries(actions)) {
    document.getElementById(buttonId).addEventListener("click", () => {
      menu.classList.remove("show");
      action();
    });
  }

  closeOnOutsideClick(menu, button);
}

/* ---------- Logout and loading screen ---------- */

function confirmLogout() {
  showConfirm("Logout", "Are you sure you want to logout?", () => {
    showToast("Logged out successfully.");
  });
}

function showLoadingScreen() {
  const loadingScreen = document.querySelector(".loading-screen");

  loadingScreen.style.display = "flex";
  setTimeout(() => {
    loadingScreen.style.display = "none";
  }, 1000);
}
