/* ==========================================
   ENTERPRISE CYBERSECURITY DASHBOARD
   MAIN JAVASCRIPT FILE
========================================== */

/* ==========================================
   DOM ELEMENTS
========================================== */

const navLinks = document.querySelectorAll(".sidebar nav a");

const pageSections = document.querySelectorAll(".page-section");

const currentDate = document.querySelector(".current-date span");

const loadingScreen = document.querySelector(".loading-screen");

/* ==========================================
   APPLICATION INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initializeApplication();
});

/* ==========================================
   APPLICATION
========================================== */

function initializeApplication() {
  initializeNavigation();

  initializeDashboard();

  initializeCharts();

  initializeThreats();

  initializeUsers();

  initializeReports();

  initializeSettings();

  initializeProfile();

  initializeLoadingScreen();
}

/* ==========================================
   NAVIGATION
========================================== */

function initializeNavigation() {
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      switchPage(href.substring(1));
    });
  });
}

/* ==========================================
   DASHBOARD
========================================== */

function initializeDashboard() {

    updateCurrentDate();

}

/* ==========================================
   LOADING SCREEN
========================================== */

function initializeLoadingScreen() {

    if (!loadingScreen) {
        return;
    }

    loadingScreen.style.display = "flex";

    setTimeout(() => {

        loadingScreen.style.display = "none";

    }, 1000);

}

/* ==========================================
   HELPER FUNCTIONS
========================================== */

function switchPage(sectionId) {
  const targetSection = document.getElementById(sectionId);

  if (!targetSection) {
    return;
  }

  pageSections.forEach((section) => {
    section.classList.remove("active-page");
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  targetSection.classList.add("active-page");

  const activeLink = document.querySelector(`.sidebar a[href="#${sectionId}"]`);

  if (activeLink) {
    activeLink.classList.add("active");
  }
}

function updateCurrentDate() {
  if (!currentDate) {
    return;
  }

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  currentDate.textContent = today.toLocaleDateString("en-GB", options);
}


