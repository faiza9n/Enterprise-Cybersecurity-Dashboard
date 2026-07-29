/* ==========================================
   DOM ELEMENTS
========================================== */

const threatSearchInput = document.getElementById("threatSearch");

const severityFilter = document.getElementById("severityFilter");

const threatRows = document.querySelectorAll("#threats tbody tr");

const noThreatsFound = document.getElementById("noThreatsFound");

/* ==========================================
   THREAT MONITORING INITIALIZATION
========================================== */

function initializeThreats() {
  initializeThreatSearch();

  initializeThreatFilter();
}

/* ==========================================
   SEARCH
========================================== */

function initializeThreatSearch() {
  if (!threatSearchInput) {
    return;
  }

  threatSearchInput.addEventListener("input", filterThreats);
}

/* ==========================================
   FILTER
========================================== */

function initializeThreatFilter() {
  if (!severityFilter) {
    return;
  }

  severityFilter.addEventListener("change", filterThreats);
}

/* ==========================================
   THREAT FILTERING
========================================== */

function filterThreats() {
  if (!threatSearchInput || !severityFilter || !noThreatsFound) {
    return;
  }

  const searchValue = threatSearchInput.value.toLowerCase().trim();

  const selectedSeverity = severityFilter.value.toLowerCase();

  let visibleRows = 0;

  threatRows.forEach((row) => {
    const rowText = row.textContent.toLowerCase();

    const severity = row.children[2].textContent.toLowerCase();

    const matchesSearch = rowText.includes(searchValue);

    const matchesSeverity =
      selectedSeverity === "all severity" || severity === selectedSeverity;

    const visible = matchesSearch && matchesSeverity;

    row.style.display = visible ? "" : "none";

    if (visible) {
      visibleRows++;
    }
  });

  noThreatsFound.classList.toggle("hidden", visibleRows > 0);
}
