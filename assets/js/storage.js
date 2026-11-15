// storage.js
// All reading and writing of Local Storage happens here.
// Every other file calls load() and save() instead of using localStorage directly.

const STORAGE_KEYS = {
  users: "dashboardUsers",
  settings: "dashboardSettings",
  profile: "userProfile",
  notifications: "dashboardNotifications",
};

// Returns the saved value for a key, or the fallback if nothing usable is saved.
function load(key, fallback) {
  try {
    const text = localStorage.getItem(key);
    return text === null ? fallback : JSON.parse(text);
  } catch (error) {
    // Saved text was damaged. Start fresh instead of breaking the page.
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
