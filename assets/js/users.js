// users.js
// User Management: add, view, edit and delete (CRUD).
// The "users" array is the real data. After every change we save it and redraw the table.

const DEFAULT_USERS = [
  { name: "Faizan Khan", department: "Security", role: "Administrator", status: "Active", lastLogin: "Today" },
];

let users = [];

function initializeUsers() {
  users = load(STORAGE_KEYS.users, DEFAULT_USERS);
  renderUsers();

  document.getElementById("addUserBtn").addEventListener("click", addUser);

  // Event delegation: one listener on the table body handles the buttons of every row,
  // including rows that are added later.
  document.getElementById("usersTableBody").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    const index = Number(button.closest("tr").dataset.index);

    if (button.classList.contains("view-btn")) viewUser(index);
    if (button.classList.contains("edit-btn")) editUser(index);
    if (button.classList.contains("delete-btn")) deleteUser(index);
  });
}

function saveAndRenderUsers() {
  save(STORAGE_KEYS.users, users);
  renderUsers();
}

function renderUsers() {
  const rows = users.map((user, index) => {
    const row = el("tr");
    row.dataset.index = index; // remembers which user this row belongs to

    const statusCell = el("td");
    statusCell.append(el("span", { className: "status active", text: user.status }));

    const actionCell = el("td");
    actionCell.append(
      el("button", { type: "button", className: "btn view-btn", text: "View" }),
      " ",
      el("button", { type: "button", className: "btn edit-btn", text: "Edit" }),
      " ",
      el("button", { type: "button", className: "btn delete-btn", text: "Delete" }),
    );

    row.append(
      el("td", { text: user.name }),
      el("td", { text: user.department }),
      el("td", { text: user.role }),
      statusCell,
      el("td", { text: user.lastLogin }),
      actionCell,
    );
    return row;
  });

  document.getElementById("usersTableBody").replaceChildren(...rows);
  document.getElementById("noUsersFound").classList.toggle("hidden", users.length > 0);
}

function addUser() {
  showUserForm("Add User", {}, (details) => {
    users.push({ ...details, status: "Active", lastLogin: "Just Now" });
    saveAndRenderUsers();
    showToast("User added successfully.");
  });
}

function viewUser(index) {
  const user = users[index];
  const lines = [
    ["Name", user.name],
    ["Department", user.department],
    ["Role", user.role],
    ["Status", user.status],
    ["Last Login", user.lastLogin],
  ];

  const content = lines.map(([label, value]) => {
    const line = el("p");
    line.append(el("strong", { text: `${label}:` }), ` ${value}`);
    return line;
  });

  showAlert("User Details", content);
}

function editUser(index) {
  showUserForm("Edit User", users[index], (details) => {
    users[index] = { ...users[index], ...details };
    saveAndRenderUsers();
    showToast("User updated successfully.");
  });
}

function deleteUser(index) {
  showConfirm("Delete User", "Are you sure you want to delete this user?", () => {
    users.splice(index, 1);
    saveAndRenderUsers();
    showToast("User deleted successfully.");
  });
}

// The same form is used for Add and Edit. For Edit it is filled with the current values.
function showUserForm(title, user, onSave) {
  const fields = [
    { key: "name", id: "modalName", placeholder: "Full Name" },
    { key: "department", id: "modalDepartment", placeholder: "Department" },
    { key: "role", id: "modalRole", placeholder: "Role" },
  ];

  const inputs = fields.map((field) => {
    const input = el("input", { type: "text" });
    input.id = field.id;
    input.placeholder = field.placeholder;
    input.value = user[field.key] || "";
    return input;
  });

  openModal({
    title,
    content: inputs,
    confirmText: "Save",
    onConfirm: () => {
      const [name, department, role] = inputs.map((input) => input.value.trim());

      if (!name || !department || !role) {
        showToast("Please fill in all fields.", "error");
        return false; // keep the form open so the user can fix it
      }

      onSave({ name, department, role });
    },
  });
}
