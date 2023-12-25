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
      }).then(result => {
        const url = result.codeResult.code;
        new Audio('beep.mp3').play(); // Play a sound

        // Perform actions with the URL, e.g., open it in a new tab
        window.open(url, '_blank');

        qrCanvas.style.display = 'none'; // Hide the canvas
      })
      .catch(err => {
        console.error('Error decoding QR code:', err);
        // Handle errors, e.g., display an error message
      })
      .finally(() => {
        stream.getTracks().forEach(track => track.stop()); // Stop camera stream after scanning
      });
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
      // Handle camera access errors, e.g., display an error message
    });
});

// Handle window resizing for responsive canvas
window.addEventListener('resize', () => {
  qrCanvas.width = window.innerWidth;
  qrCanvas.height = window.innerHeight - scanButton.offsetHeight - 40;
});
