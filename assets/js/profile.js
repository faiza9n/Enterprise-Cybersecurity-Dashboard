/* ==========================================
   DOM ELEMENTS
========================================== */

const profileForm = document.querySelector(".profile-form");

const fullNameInput = profileForm.querySelector(
  'input[placeholder="Full Name"]',
);

const emailInput = profileForm.querySelector('input[placeholder="Email"]');

const phoneInput = profileForm.querySelector(
  'input[placeholder="Phone Number"]',
);

const departmentInput = profileForm.querySelector(
  'input[placeholder="Department"]',
);

const designationInput = profileForm.querySelector(
  'input[placeholder="Designation"]',
);

initializeProfile();

function initializeProfile() {
  loadProfile();

  profileForm.addEventListener("submit", saveProfile);
}

/* ==========================================
   SAVE PROFILE
========================================== */

function saveProfile(event) {

    event.preventDefault();

    const profileData = {

        fullName: fullNameInput.value.trim(),

        email: emailInput.value.trim(),

        phone: phoneInput.value.trim(),

        department: departmentInput.value.trim(),

        designation: designationInput.value.trim()

    };

    if (
        !profileData.fullName ||
        !profileData.email ||
        !profileData.phone ||
        !profileData.department ||
        !profileData.designation
    ) {

        // alert("Please fill in all fields.");
        showToast("Please fill in all fields.", "error");

        return;

    }

    localStorage.setItem(
        "userProfile",
        JSON.stringify(profileData)
    );

    // alert("Profile saved successfully.");
    showToast("Profile saved successfully.");

}

/* ==========================================
   LOAD PROFILE
========================================== */

function loadProfile() {

    const savedProfile = JSON.parse(
        localStorage.getItem("userProfile")
    );

    if (!savedProfile) {
        return;
    }

    fullNameInput.value = savedProfile.fullName;

    emailInput.value = savedProfile.email;

    phoneInput.value = savedProfile.phone;

    departmentInput.value = savedProfile.department;

    designationInput.value = savedProfile.designation;

}

