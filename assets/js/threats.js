// threats.js
// The threat list is kept as data. The table is drawn from it,
// and search and filter work on the data, not on the page.

const THREATS = [
  {
    id: "TH001",
    type: "Malware",
    severity: "Critical",
    status: "Blocked",
    statusClass: "blocked",
    source: "192.168.1.20",
    time: "09:15",
  },
  {
    id: "TH002",
    type: "Phishing",
    severity: "High",
    status: "Investigating",
    statusClass: "monitoring",
    source: "Email Gateway",
    time: "10:42",
  },
  {
    id: "TH003",
    type: "DDoS",
    severity: "Medium",
    status: "Resolved",
    statusClass: "resolved",
    source: "Firewall",
    time: "12:25",
  },
];

function initializeThreats() {
  document.getElementById("threatSearch").addEventListener("input", renderThreats);
  document.getElementById("severityFilter").addEventListener("change", renderThreats);
  renderThreats();
}

// A threat is shown only if it matches both the search text and the severity.
function getVisibleThreats() {
  const searchText = document.getElementById("threatSearch").value.toLowerCase().trim();
  const severity = document.getElementById("severityFilter").value;

  return THREATS.filter((threat) => {
    const allText = [threat.id, threat.type, threat.severity, threat.status, threat.source, threat.time]
      .join(" ")
      .toLowerCase();
    const matchesSearch = allText.includes(searchText);
    const matchesSeverity = severity === "All Severity" || threat.severity === severity;
    return matchesSearch && matchesSeverity;
  });
}

function renderThreats() {
  const visibleThreats = getVisibleThreats();

  const rows = visibleThreats.map((threat) => {
    const row = el("tr");
    const statusCell = el("td");
    statusCell.append(el("span", { className: `status ${threat.statusClass}`, text: threat.status }));

    row.append(
      el("td", { text: threat.id }),
      el("td", { text: threat.type }),
      el("td", { text: threat.severity }),
      statusCell,
      el("td", { text: threat.source }),
      el("td", { text: threat.time }),
    );
    return row;
  });

  document.getElementById("threatsTableBody").replaceChildren(...rows);
  document.getElementById("noThreatsFound").classList.toggle("hidden", visibleThreats.length > 0);
}
