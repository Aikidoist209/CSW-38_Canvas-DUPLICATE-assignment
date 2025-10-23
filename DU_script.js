/(function () {
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

// i'm not totally sure what this does.
// 1. Wait for the page to load
document.addEventListener('DOMContentLoaded', () => {
  
  // 2. Select the element you want to animate
  // We're grabbing the div with the class "card-animate"
  const elementToAnimate = document.querySelector('.card-animate');

  // 3. Define the keyframes for the animation
  // This is what the animation will do (e.g., from 0 degrees to 360 degrees)
  const keyframes = [
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(360deg)' }
  ];

  // 4. Define the options for the animation
  // This controls how long it takes, how many times it repeats, etc.
  const options = {
    duration: 3000,    // Animation lasts 3 seconds (3000 milliseconds)
    iterations: Infinity // Repeat forever
  };

  // 5. Apply the animation to the element
  elementToAnimate.animate(keyframes, options);

});
