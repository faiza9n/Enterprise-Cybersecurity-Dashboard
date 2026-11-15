// ui.js
// Small helpers and the three shared feedback parts: toast, modal, notifications.

// Creates an element in one line: el("td", { className: "x", text: "hello" })
function el(tag, options = {}) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text; // textContent is safe from XSS
  if (options.type) node.type = options.type;
  return node;
}

/* ---------- Toast ---------- */

const TOAST_ICONS = {
  success: "fa-solid fa-circle-check",
  error: "fa-solid fa-circle-xmark",
  info: "fa-solid fa-circle-info",
};

let toastTimer;

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");

  addNotification(message);

  toast.className = `toast ${type} show`;
  document.getElementById("toastMessage").textContent = message;
  document.getElementById("toastIcon").className = TOAST_ICONS[type] || TOAST_ICONS.info;

  // Restart the 3-second countdown every time a new toast is shown.
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

/* ---------- Modal ---------- */

// The function to run when Confirm is pressed.
// If it returns false, the modal stays open (used for form validation).
let onModalConfirm = null;

function openModal({ title, content, confirmText = "Confirm", showCancel = true, onConfirm = null }) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalBody").replaceChildren(...content);
  document.getElementById("modalConfirmBtn").textContent = confirmText;
  document.getElementById("modalCancelBtn").style.display = showCancel ? "inline-flex" : "none";

  onModalConfirm = onConfirm;
  document.getElementById("customModal").classList.add("show");
}

function closeModal() {
  document.getElementById("customModal").classList.remove("show");
}

function showAlert(title, content) {
  openModal({ title, content, confirmText: "OK", showCancel: false });
}

function showConfirm(title, message, onConfirm) {
  openModal({ title, content: [el("p", { text: message })], onConfirm });
}

function initializeModal() {
  const modal = document.getElementById("customModal");

  document.getElementById("modalConfirmBtn").addEventListener("click", () => {
    const keepOpen = onModalConfirm !== null && onModalConfirm() === false;
    if (!keepOpen) closeModal();
  });

  document.getElementById("modalCancelBtn").addEventListener("click", closeModal);

  // A click on the dark area outside the box also closes the modal.
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

/* ---------- Notifications ---------- */

let notifications = [];

function addNotification(message) {
  notifications.unshift({ message, time: "Just now" });
  save(STORAGE_KEYS.notifications, notifications);
  renderNotifications();
}

function renderNotifications() {
  const badge = document.getElementById("notificationBadge");

  const items = notifications.map((notification) => {
    const item = el("div", { className: "notification-item" });
    item.append(el("h4", { text: notification.message }), el("p", { text: notification.time }));
    return item;
  });

  document.getElementById("notificationList").replaceChildren(...items);
  document.getElementById("notificationEmptyState").classList.toggle("hidden", notifications.length > 0);

  badge.textContent = notifications.length;
  badge.style.display = notifications.length > 0 ? "flex" : "none";
}

function initializeNotifications() {
  const button = document.getElementById("notificationBtn");
  const panel = document.getElementById("notificationPanel");

  notifications = load(STORAGE_KEYS.notifications, []);
  renderNotifications();

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    panel.classList.toggle("show");
  });

  document.getElementById("clearNotificationsBtn").addEventListener("click", () => {
    notifications = [];
    save(STORAGE_KEYS.notifications, notifications);
    renderNotifications();
  });

  closeOnOutsideClick(panel, button);
}

// Hides a pop-up panel when the user clicks anywhere outside it.
function closeOnOutsideClick(panel, button) {
  document.addEventListener("click", (event) => {
    if (!panel.contains(event.target) && !button.contains(event.target)) {
      panel.classList.remove("show");
    }
  });
}
