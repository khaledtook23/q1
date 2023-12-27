// script.js

// Function to handle the QR code scanning
function onScanSuccess(qrCodeMessage) {
  // Display the scanned URL
  document.getElementById('result').innerHTML = `<p>Scanned URL: <a href="${qrCodeMessage}" target="_blank">${qrCodeMessage}</a></p>`;

  // Open the scanned URL in a new tab/window
  window.open(qrCodeMessage, '_blank');

  // Pause for a moment (you can adjust the delay)
  setTimeout(() => {
    // Clear the result container
    document.getElementById('result').innerHTML = '';

    // Start scanning again
    html5QrcodeScanner.start();
  }, 2000); // 2 seconds delay before scanning again
}

// Initialize the QR code scanner
const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader", // Reader container id
  { fps: 10, qrbox: 250 } // Optional parameters
);

// Start the QR code scanner
html5QrcodeScanner.render(onScanSuccess);
