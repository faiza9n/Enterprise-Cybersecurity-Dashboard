// charts.js
// The five analytics charts. Each chart is described as data,
// and one loop creates them all with Chart.js.

const COLORS = {
  blue: "#2563eb",
  green: "#16a34a",
  amber: "#f59e0b",
  red: "#dc2626",
  purple: "#8b5cf6",
};

const CHARTS = [
  {
    canvasId: "threatTrendChart",
    type: "line",
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    dataset: {
      label: "Threats",
      data: [14, 18, 12, 20, 15, 10, 17],
      borderColor: COLORS.blue,
      backgroundColor: "rgba(37, 99, 235, 0.15)",
      fill: true,
      tension: 0.4,
    },
  },
  {
    canvasId: "threatCategoryChart",
    type: "doughnut",
    labels: ["Malware", "Phishing", "DDoS", "Ransomware"],
    dataset: {
      data: [35, 25, 20, 20],
      backgroundColor: [COLORS.blue, COLORS.green, COLORS.amber, COLORS.red],
    },
  },
  {
    canvasId: "loginChart",
    type: "bar",
    labels: ["Morning", "Afternoon", "Evening", "Night"],
    dataset: { label: "Logins", data: [220, 380, 270, 120], backgroundColor: COLORS.blue },
  },
  {
    canvasId: "incidentChart",
    type: "bar",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    dataset: { label: "Incidents", data: [24, 19, 30, 18, 22, 15], backgroundColor: COLORS.red },
  },
  {
    canvasId: "deviceChart",
    type: "pie",
    labels: ["Desktop", "Laptop", "Mobile", "Server"],
    dataset: {
      data: [28, 34, 22, 16],
      backgroundColor: [COLORS.blue, COLORS.green, COLORS.amber, COLORS.purple],
    },
  },
];

function initializeCharts() {
  for (const chart of CHARTS) {
    const canvas = document.getElementById(chart.canvasId);
    if (!canvas) continue;

    new Chart(canvas, {
      type: chart.type,
      data: { labels: chart.labels, datasets: [chart.dataset] },
      options: { responsive: true, maintainAspectRatio: false },
    });
  }
}
