// profile.js
// The profile form: check the fields, save them, and fill them in again on the next visit.

const PROFILE_FIELDS = {
  fullName: "profileName",
  email: "profileEmail",
  phone: "profilePhone",
  department: "profileDepartment",
  designation: "profileDesignation",
};

function initializeProfile() {
  const saved = load(STORAGE_KEYS.profile, {});

  for (const [key, inputId] of Object.entries(PROFILE_FIELDS)) {
    document.getElementById(inputId).value = saved[key] || "";
  }

  document.querySelector(".profile-form").addEventListener("submit", saveProfile);
}

function saveProfile(event) {
  event.preventDefault(); // stop the browser from reloading the page

  const profile = {};
  for (const [key, inputId] of Object.entries(PROFILE_FIELDS)) {
    profile[key] = document.getElementById(inputId).value.trim();
  }

  const hasEmptyField = Object.values(profile).some((value) => value === "");
  if (hasEmptyField) {
    showToast("Please fill in all fields.", "error");
    return;
  }

  save(STORAGE_KEYS.profile, profile);
  showToast("Profile saved successfully.");
}
