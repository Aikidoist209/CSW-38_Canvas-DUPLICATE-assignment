
(function () {
    // Detect environment and show a simple message (helps confirm file encoding visually)
    const sample = 'UTF-8 check: ✓ — save this file as UTF-8';
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        console.log('Running in browser. document.charset =', document.characterSet || document.charset);
        console.log(sample);
    } else {
        console.log('Running in Node.js');
        console.log(sample);
    }
})();

// Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {

  // Add current date and time to Date-Box 4
  function updateDateTime() {
    const now = new Date();
    
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const timeString = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });

    const formattedDateTime = `${dateString}<br>${timeString}`;
    
    // Find the Date-Box 4 element and update its content
    const dateBoxes = document.querySelectorAll('.card');
    dateBoxes.forEach(box => {
      if (box.textContent.includes('Date-Box 4')) {
        box.innerHTML = `<strong>Current Date & Time:</strong><br>${formattedDateTime}`;
      }
    });
  }
  
  // Update immediately when page loads
  updateDateTime();
  
  // Update every second
  setInterval(updateDateTime, 1000);

});
