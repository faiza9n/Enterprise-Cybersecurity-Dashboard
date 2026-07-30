/* ==========================================
   DOM ELEMENTS
========================================== */

const notificationBtn = document.getElementById("notificationBtn");

const notificationPanel = document.getElementById("notificationPanel");

const notificationList = document.getElementById("notificationList");

const notificationBadge = document.getElementById("notificationBadge");

const notificationEmptyState = document.getElementById(
  "notificationEmptyState",
);

const clearNotificationsBtn = document.getElementById("clearNotificationsBtn");

/* ==========================================
   DATA
========================================== */

let notifications = [];

/* ==========================================
   INITIALIZE
========================================== */

function initializeNotificationPanel() {
    loadNotifications();
    // addNotification("Notification panel is working.");

  notificationBtn.addEventListener("click", (event) => {
    event.stopPropagation();

    notificationPanel.classList.toggle("show");
  });

  document.addEventListener("click", (event) => {
    if (
      !notificationPanel.contains(event.target) &&
      !notificationBtn.contains(event.target)
    ) {
      notificationPanel.classList.remove("show");
    }
  });

  clearNotificationsBtn.addEventListener("click", () => {
    notifications = [];

    saveNotifications();

    renderNotifications();
  });
}

/* ==========================================
   ADD
========================================== */

function addNotification(message) {
  notifications.unshift({
    message,

    time: "Just now",
  });

  saveNotifications();

  renderNotifications();
}

/* ==========================================
   RENDER
========================================== */

function renderNotifications() {
  notificationList.innerHTML = "";

  if (notifications.length === 0) {
    notificationEmptyState.classList.remove("hidden");
  } else {
    notificationEmptyState.classList.add("hidden");
  }

  notifications.forEach((notification) => {
    notificationList.innerHTML += `

            <div class="notification-item">

                <h4>${notification.message}</h4>

                <p>${notification.time}</p>

            </div>

        `;
  });

  notificationBadge.textContent = notifications.length;

  notificationBadge.style.display = notifications.length ? "flex" : "none";
}

/* ==========================================
   STORAGE
========================================== */

function saveNotifications() {
  localStorage.setItem("dashboardNotifications", JSON.stringify(notifications));
}

function loadNotifications() {
  notifications =
    JSON.parse(localStorage.getItem("dashboardNotifications")) || [];

  renderNotifications();
}


