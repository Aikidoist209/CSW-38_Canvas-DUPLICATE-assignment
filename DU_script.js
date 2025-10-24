
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

  // Animated Canvas Setup
  const canvas = document.getElementById('animatedCanvas');
  const ctx = canvas.getContext('2d');
  
  // Animation variables
  let animationId;
  const dots = [];
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  
  // Dot creation timer
  let lastDotTime = 0;
  const dotInterval = 100; // Create new dot every 100ms
  
  function createDot() {
    const angle = Math.random() * Math.PI * 2; // Random direction
    const speed = Math.random() * 2 + 1; // Random speed between 1-3
    
    dots.push({
      x: centerX,
      y: centerY,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      radius: Math.random() * 3 + 2, // Small dots, radius 2-5
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
      opacity: 1
    });
  }
  
  function animateCanvas(currentTime) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Create new dots periodically
    if (currentTime - lastDotTime > dotInterval) {
      createDot();
      lastDotTime = currentTime;
    }
    
    // Update and draw dots
    for (let i = dots.length - 1; i >= 0; i--) {
      const dot = dots[i];
      
      // Update position
      dot.x += dot.dx;
      dot.y += dot.dy;
      
      // Calculate distance from center for opacity fade
      const distanceFromCenter = Math.sqrt(
        Math.pow(dot.x - centerX, 2) + Math.pow(dot.y - centerY, 2)
      );
      const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
      dot.opacity = 1 - (distanceFromCenter / maxDistance);
      
      // Remove dots that reach the edges
      if (dot.x < 0 || dot.x > canvas.width || 
          dot.y < 0 || dot.y > canvas.height || 
          dot.opacity <= 0) {
        dots.splice(i, 1);
        continue;
      }
      
      // Draw dot
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
      ctx.fillStyle = dot.color.replace('60%)', `60%, ${dot.opacity})`);
      ctx.fill();
    }
    
    // Draw center point for reference
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    
    // Continue animation
    animationId = requestAnimationFrame(animateCanvas);
  }
  
  // Start animation
  animateCanvas();

});
