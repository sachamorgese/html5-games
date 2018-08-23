import KeyControls from '../lib/keyControls';

// Select the canvas onScreen
const canvas = document.querySelector('#board canvas');
// Select the context aka what API we will use
console.log(canvas);
const ctx = canvas.getContext('2d');
// Get width and height of the canvas element
const { width: w, height: h } = canvas;

// Game setup

// Center the object
let x = w / 2;
let y = h / 2;
// Initialize color
let color = 0;

// Create an instance of KeyControls
const controls = new KeyControls();

// Our loop!
function loopy(ms) {
  // Our loop on next frame
  requestAnimationFrame(loopy);

  // Moving our object
  x += controls.x;
  y += controls.y;

  // Bind action to color change
  if (controls.action) {
    color += 10;
    if (color > 360) {
      color -= 360;
    }
  }

  // Keep the background back
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, w, h);

  // Draw the rectangle
  ctx.fillStyle = `hsl(${color}, 50%, 50%)`;
  ctx.fillRect(x, y, 50, 50);
}

// Call loopy on the next frame
requestAnimationFrame(loopy);
