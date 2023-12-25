const scanButton = document.getElementById('scanButton');
const qrCanvas = document.getElementById('qr-canvas');

scanButton.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      qrCanvas.getContext('2d').fillRect(0, 0, qrCanvas.width, qrCanvas.height); // Clear canvas
      qrCanvas.style.display = 'block'; // Show the canvas

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
      }).catch(err => {
        console.error('Error decoding QR code:', err);
        // Handle errors, e.g., display an error message
      });
    })
    .catch(error => {
      console.error('Error accessing camera:', error);
      // Handle camera access errors, e.g., display an error message
    });
});

