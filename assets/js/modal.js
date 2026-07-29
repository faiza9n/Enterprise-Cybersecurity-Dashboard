/* ==========================================
   DOM ELEMENTS
========================================== */

const customModal = document.getElementById("customModal");

const modalTitle = document.getElementById("modalTitle");

const modalBody = document.getElementById("modalBody");

const modalCancelBtn = document.getElementById("modalCancelBtn");

const modalConfirmBtn = document.getElementById("modalConfirmBtn");

/* ==========================================
   MODAL FUNCTIONS
========================================== */

function openModal(title, content) {
  modalTitle.textContent = title;

  modalBody.innerHTML = content;

  customModal.classList.add("show");
}

function closeModal() {
  customModal.classList.remove("show");
}


/* ==========================================
   CONFIRM BUTTON
========================================== */

let confirmCallback = null;

modalConfirmBtn.addEventListener("click", () => {

    if (confirmCallback) {

        confirmCallback();

    }

    closeModal();

});

/* ==========================================
   CANCEL BUTTON
========================================== */

modalCancelBtn.addEventListener("click", () => {

    closeModal();

});

/* ==========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================== */

customModal.addEventListener("click", (event) => {

    if (event.target === customModal) {

        closeModal();

    }

});

/* ==========================================
   ALERT MODAL
========================================== */

function showAlert(title, message) {

    openModal(

        title,

        `<p>${message}</p>`

    );

    modalCancelBtn.style.display = "none";

    modalConfirmBtn.textContent = "OK";

    confirmCallback = null;

}

/* ==========================================
   CONFIRM MODAL
========================================== */

function showConfirm(title, message, callback) {

    openModal(

        title,

        `<p>${message}</p>`

    );

    modalCancelBtn.style.display = "inline-flex";

    modalConfirmBtn.textContent = "Confirm";

    confirmCallback = callback;

}


/* ==========================================
   USER FORM MODAL
========================================== */

function showUserForm(title, user = {}, callback) {

    openModal(

        title,

        `
        <input
            id="modalName"
            type="text"
            placeholder="Full Name"
            value="${user.name || ""}">

        <input
            id="modalDepartment"
            type="text"
            placeholder="Department"
            value="${user.department || ""}">

        <input
            id="modalRole"
            type="text"
            placeholder="Role"
            value="${user.role || ""}">
        `
    );

    modalCancelBtn.style.display = "inline-flex";

    modalConfirmBtn.textContent = "Save";

    confirmCallback = () => {

        const name =
            document.getElementById("modalName").value.trim();

        const department =
            document.getElementById("modalDepartment").value.trim();

        const role =
            document.getElementById("modalRole").value.trim();

        if (!name || !department || !role) {

            alert("Please fill in all fields.");

            return;

        }

        callback({

            name,
            department,
            role

        });

    };

}
// showAlert("Success", "Custom modal is working!");