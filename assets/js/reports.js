// reports.js
// The three download buttons. This version only shows the steps of a download;
// it does not create a real file.

const REPORT_BUTTONS = [
  { id: "downloadPdfBtn", format: "PDF" },
  { id: "downloadExcelBtn", format: "Excel" },
  { id: "downloadCsvBtn", format: "CSV" },
];

function initializeReports() {
  for (const report of REPORT_BUTTONS) {
    const button = document.getElementById(report.id);
    button.addEventListener("click", () => simulateDownload(button, report.format));
  }
}

function simulateDownload(button, format) {
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = `Generating ${format} Report...`;

  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
    showToast(`${format} Report Downloaded Successfully!`);
  }, 1500);
}
