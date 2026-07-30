/* ==========================================
   DOM ELEMENTS
========================================== */

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toastMessage");

const toastIcon = document.getElementById("toastIcon");

let toastTimer;

/* ==========================================
   TOAST
========================================== */

function showToast(message, type = "success") {

    if (typeof addNotification === "function") {
      addNotification(message);
    }
    
  clearTimeout(toastTimer);

  toast.className = `toast ${type}`;

  toastMessage.textContent = message;

  switch (type) {
    case "success":
      toastIcon.className = "fa-solid fa-circle-check";

      break;

    case "error":
      toastIcon.className = "fa-solid fa-circle-xmark";

      break;

    default:
      toastIcon.className = "fa-solid fa-circle-info";
  }

  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}



// showToast("Toast notification is working!");
