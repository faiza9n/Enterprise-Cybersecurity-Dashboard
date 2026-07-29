/* ==========================================
   DOM ELEMENTS
========================================== */

const downloadPdfBtn = document.getElementById("downloadPdfBtn");

const downloadExcelBtn = document.getElementById("downloadExcelBtn");

const downloadCsvBtn = document.getElementById("downloadCsvBtn");

/* ==========================================
   REPORTS INITIALIZATION
========================================== */

function initializeReports() {
  initializeDownloadPDF();

  initializeDownloadExcel();

  initializeDownloadCSV();
}

function initializeDownloadPDF() {
  if (!downloadPdfBtn) {
    return;
  }

  downloadPdfBtn.addEventListener("click", () => {
    simulateDownload(
      downloadPdfBtn,
      "Generating PDF Report...",
      "PDF Report Downloaded Successfully!",
    );
  });
}

function initializeDownloadExcel() {
  if (!downloadExcelBtn) {
    return;
  }

  downloadExcelBtn.addEventListener("click", () => {
    simulateDownload(
      downloadExcelBtn,
      "Generating Excel Report...",
      "Excel Report Downloaded Successfully!",
    );
  });
}

function initializeDownloadCSV() {
  if (!downloadCsvBtn) {
    return;
  }

  downloadCsvBtn.addEventListener("click", () => {
    simulateDownload(
      downloadCsvBtn,
      "Generating CSV Report...",
      "CSV Report Downloaded Successfully!",
    );
  });
}


/* ==========================================
   HELPER FUNCTIONS
========================================== */

function simulateDownload(
    button,
    loadingText,
    successMessage
) {

    const originalText = button.textContent;

    button.disabled = true;

    button.textContent = loadingText;

    setTimeout(() => {

        button.disabled = false;

        button.textContent = originalText;

        showToast(successMessage);

    }, 1500);

}