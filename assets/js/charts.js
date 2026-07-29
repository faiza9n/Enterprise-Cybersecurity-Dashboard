/* ==========================================
   CHART.JS INITIALIZATION
========================================== */

function initializeCharts() {
  createThreatTrendChart();

  createThreatCategoryChart();

  createLoginChart();

  createIncidentChart();

  createDeviceChart();
}

/* ==========================================
   THREAT TREND CHART
========================================== */

function createThreatTrendChart() {
  const canvas = document.getElementById("threatTrendChart");

  if (!canvas) {
    return;
  }

  new Chart(canvas, {
    type: "line",

    data: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

      datasets: [
        {
          label: "Threats",

          data: [14, 18, 12, 20, 15, 10, 17],

          borderColor: "#2563eb",

          backgroundColor: "rgba(37, 99, 235, 0.15)",

          fill: true,

          tension: 0.4,
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}

/* ==========================================
   THREAT CATEGORY CHART
========================================== */

function createThreatCategoryChart() {
  const canvas = document.getElementById("threatCategoryChart");

  if (!canvas) {
    return;
  }

  new Chart(canvas, {
    type: "doughnut",

    data: {
      labels: ["Malware", "Phishing", "DDoS", "Ransomware"],

      datasets: [
        {
          data: [35, 25, 20, 20],

          backgroundColor: ["#2563eb", "#16a34a", "#f59e0b", "#dc2626"],
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}

/* ==========================================
   LOGIN ACTIVITY CHART
========================================== */

function createLoginChart() {
  const canvas = document.getElementById("loginChart");

  if (!canvas) {
    return;
  }

  new Chart(canvas, {
    type: "bar",

    data: {
      labels: ["Morning", "Afternoon", "Evening", "Night"],

      datasets: [
        {
          label: "Logins",

          data: [220, 380, 270, 120],

          backgroundColor: "#2563eb",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}

/* ==========================================
   MONTHLY INCIDENTS CHART
========================================== */

function createIncidentChart() {
  const canvas = document.getElementById("incidentChart");

  if (!canvas) {
    return;
  }

  new Chart(canvas, {
    type: "bar",

    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],

      datasets: [
        {
          label: "Incidents",

          data: [24, 19, 30, 18, 22, 15],

          backgroundColor: "#dc2626",
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}

/* ==========================================
   DEVICE DISTRIBUTION CHART
========================================== */

function createDeviceChart() {
  const canvas = document.getElementById("deviceChart");

  if (!canvas) {
    return;
  }

  new Chart(canvas, {
    type: "pie",

    data: {
      labels: ["Desktop", "Laptop", "Mobile", "Server"],

      datasets: [
        {
          data: [28, 34, 22, 16],

          backgroundColor: ["#2563eb", "#16a34a", "#f59e0b", "#8b5cf6"],
        },
      ],
    },

    options: {
      responsive: true,

      maintainAspectRatio: false,
    },
  });
}
