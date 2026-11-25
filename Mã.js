function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
  .setTitle('PQD Drawing Comparison - So sánh bản vẽ PDF')
  .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
  .addMetaTag('viewport', 'width=device-width, initial-scale=1, viewport-fit=cover');
  }

  var MAX_PDF_BYTES = 40 * 1024 * 1024;
  var FOLDER_NAME = 'PQD Drawing Comparisons';
  var KEEP_HOURS = 24; // temp files older than this are moved to Drive trash

  function getFolder_() {
  var folders = DriveApp.getFoldersByName(FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAME);
  }

  // Runs on every save; can also be put on a time-driven trigger.
  function cleanupOldComparisons() {
  var cutoff = Date.now() - KEEP_HOURS * 3600 * 1000;
  var files = getFolder_().getFiles();
  while (files.hasNext()) {
  var f = files.next();
  if (f.getDateCreated().getTime() < cutoff) f.setTrashed(true);
  }
  }

  function saveComparisonToDrive(base64Data, fileName) {
  try {
  // Web app is public: only accept real PDFs of bounded size into the owner's Drive.
  if (typeof base64Data !== 'string' || base64Data.indexOf('JVBERi0') !== 0) throw new Error('Dữ liệu không phải PDF');
  var decoded = Utilities.base64Decode(base64Data);
  if (decoded.length > MAX_PDF_BYTES) throw new Error('File quá lớn (> 40 MB)');
  var name = String(fileName || 'COMPARE.pdf').replace(/[\\\/:*?"<>|\r\n]+/g, '_').slice(0, 200);
  if (!/\.pdf$/i.test(name)) name += '.pdf';
  var blob = Utilities.newBlob(decoded, 'application/pdf', name);
  try { cleanupOldComparisons(); } catch (e) { console.warn(e); }
  var file = getFolder_().createFile(blob);
  return { success: true, fileUrl: file.getUrl(), fileName: file.getName() };
  } catch (error) {
  return { success: false, error: error.message || error.toString() };
  }
  }
