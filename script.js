const scanButton = document.getElementById('scanButton');
const qrCanvas = document.getElementById('qr-canvas');

scanButton.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      qrCanvas.getContext('2d').fillRect(0, 0, qrCanvas.width, qrCanvas.height); // Clear canvas
      qrCanvas.style.display = 'block'; // Show the canvas

      // Adjust canvas size for mobile screens
      qrCanvas.width = window.innerWidth;
      qrCanvas.height = window.innerHeight - scanButton.offsetHeight - 40; // Account for button and margins

      Quagga.decodeSingle({
        locate: true,
        decoder: { readers: ['code_128_reader'] },
        inputStream: stream,
        // Potentially adjust options for mobile performance
      }).then(result => {
        // ... (rest of the code
