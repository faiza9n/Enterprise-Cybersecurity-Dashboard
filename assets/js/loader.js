/* ==========================================
   DOM ELEMENTS
========================================== */

const loadingScreen = document.querySelector(".loading-screen");

/* ==========================================
   LOADER
========================================== */

function showLoader() {
  if (!loadingScreen) {
    return;
  }

  loadingScreen.style.display = "flex";
}

function hideLoader() {
  if (!loadingScreen) {
    return;
  }

  loadingScreen.style.display = "none";
}

