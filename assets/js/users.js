/* ==========================================
   DOM ELEMENTS
========================================== */

const usersTableBody = document.getElementById("usersTableBody");

const addUserBtn = document.getElementById("addUserBtn");

const noUsersFound = document.getElementById("noUsersFound");

/* ==========================================
   USER MANAGEMENT INITIALIZATION
========================================== */

function initializeUsers() {

  loadUsers();

  initializeAddUser();

  initializeViewUser();

  initializeEditUser();

  initializeDeleteUser();

  updateEmptyState();
}


function initializeAddUser() {
  if (!addUserBtn) {
    return;
  }

  addUserBtn.addEventListener("click", () => {
    showUserForm(
      "Add User",

      {},

      (user) => {
        const userRow = createUserRow(
          user.name,

          user.department,

          user.role,
        );

        usersTableBody.appendChild(userRow);

        saveUsers();

        updateEmptyState();

        showToast("User added successfully.");
      },
    );
  });
}

function initializeViewUser() {
  if (!usersTableBody) {
    return;
  }

  usersTableBody.addEventListener("click", (event) => {
    if (!event.target.classList.contains("view-btn")) {
      return;
    }

    const userRow = event.target.closest("tr");

    if (!userRow) {
      return;
    }

    const userData = getUserData(userRow);

    showAlert(
      "User Details",

      `
        <p><strong>Name:</strong> ${userData.name}</p>

        <p><strong>Department:</strong> ${userData.department}</p>

        <p><strong>Role:</strong> ${userData.role}</p>

        <p><strong>Status:</strong> ${userData.status}</p>

        <p><strong>Last Login:</strong> ${userData.lastLogin}</p>
    `
    );
  });
}


function initializeEditUser() {
  if (!usersTableBody) {
    return;
  }

  usersTableBody.addEventListener("click", (event) => {
    if (!event.target.classList.contains("edit-btn")) {
      return;
    }

    const userRow = event.target.closest("tr");

    if (!userRow) {
      return;
    }

    const userData = getUserData(userRow);

    showUserForm(
      "Edit User",

      userData,

      (user) => {
        updateUserRow(
          userRow,

          user.name,

          user.department,

          user.role,
        );

        saveUsers();

        showToast("User updated successfully.");
      },
    );
  });
}


function initializeDeleteUser() {
  if (!usersTableBody) {
    return;
  }

  usersTableBody.addEventListener("click", (event) => {
    if (!event.target.classList.contains("delete-btn")) {
      return;
    }

    const userRow = event.target.closest("tr");

    if (!userRow) {
      return;
    }

    showConfirm(
      "Delete User",

      "Are you sure you want to delete this user?",

      () => {
        userRow.remove();

        saveUsers();

        updateEmptyState();

        showToast("User deleted successfully.");
      }
    );
  });
}

function updateEmptyState() {
  if (!usersTableBody || !noUsersFound) {
    return;
  }

  const remainingUsers = usersTableBody.querySelectorAll("tr").length;

  if (remainingUsers === 0) {
    noUsersFound.classList.remove("hidden");
  } else {
    noUsersFound.classList.add("hidden");
  }
}

function getUserData(userRow) {
  const cells = userRow.querySelectorAll("td");

  return {
    name: cells[0].textContent.trim(),

    department: cells[1].textContent.trim(),

    role: cells[2].textContent.trim(),

    status: cells[3].textContent.trim(),

    lastLogin: cells[4].textContent.trim(),
  };
}

function updateUserRow(userRow, name, department, role) {
  const cells = userRow.querySelectorAll("td");

  cells[0].textContent = name;

  cells[1].textContent = department;

  cells[2].textContent = role;
}

function createUserRow(name, department, role) {
  const row = document.createElement("tr");

  row.innerHTML = `
        <td>${name}</td>
        <td>${department}</td>
        <td>${role}</td>
        <td>
            <span class="status active">
                Active
            </span>
        </td>
        <td>Just Now</td>
        <td>
            <button type="button" class="btn view-btn">
                View
            </button>

            <button type="button" class="btn edit-btn">
                Edit
            </button>

            <button type="button" class="btn delete-btn">
                Delete
            </button>
        </td>
    `;

  return row;
}

/* ==========================================
   LOCAL STORAGE
========================================== */

function saveUsers() {
  const users = [];

  const rows = usersTableBody.querySelectorAll("tr");

  rows.forEach((row) => {
    const userData = getUserData(row);

    users.push(userData);
  });

  localStorage.setItem("dashboardUsers", JSON.stringify(users));
}



function loadUsers() {
  const users = JSON.parse(localStorage.getItem("dashboardUsers"));

  if (!users) {
    return;
  }

  usersTableBody.innerHTML = "";

  users.forEach((user) => {
    const row = createUserRow(user.name, user.department, user.role);

    row.querySelectorAll("td")[3].innerHTML = `
            <span class="status active">
                ${user.status}
            </span>
        `;

    row.querySelectorAll("td")[4].textContent = user.lastLogin;

    usersTableBody.appendChild(row);
  });
}