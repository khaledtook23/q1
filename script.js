document.addEventListener('DOMContentLoaded', (event) => {
  const video = document.getElementById('video');
  const scanResult = document.getElementById('scan-result');

  // Check if the browser supports mediaDevices and getUserMedia
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        video.srcObject = stream;
        video.play();
        scanQRCode();
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  } else {
    console.error('getUserMedia is not supported in this browser');
  }

  function scanQRCode() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    function scan() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        scanResult.textContent = 'Scanned QR Code: ' + code.data;

        // Execute the URL (replace with your logic)
        window.location.href = code.data;

        // Clear the result after a delay (adjust as needed)
        setTimeout(() => {
          scanResult.textContent = '';
        }, 3000);
      }

      requestAnimationFrame(scan);
    }

    scan();
  }
});
