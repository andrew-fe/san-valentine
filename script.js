const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const response = document.getElementById('response');
const imageContainer = document.getElementById('imageContainer');
const container = document.querySelector('.container');

let isFirstClick = true; // Flag to track the first click
let isHoverActive = false; // Flag para activar el movimiento con hover

const isTouchDevice = () => {
  return (
    (typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        (window.DocumentTouch && typeof document === 'object' && document instanceof window.DocumentTouch))) ||
    (typeof navigator !== 'undefined' &&
      (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0))
  );
};

yesButton.addEventListener('click', () => {
  // Clear everything in the container
  container.innerHTML = '';

  // Create a new div for the grid and message
  const gridContainer = document.createElement('div');
  gridContainer.classList.add('image-grid');

  // Add REAL Hello Kitty images from reliable sources
  const images = [
    'https://wallpapers.com/images/high/hello-kitty-valentine-love-illustration-7jqou4r5q4yug8ae.webp',
    'https://wallpapers.com/images/high/hello-kitty-valentines-day-heart-c3y8sz1ahvfzxxmk.webp',
    'https://wallpapers.com/images/high/hello-kitty-valentines-day-celebration-23thz7ncbz2rptmd.webp',
    'https://wallpapers.com/images/high/hello-kitty-valentines-day-celebration-xgg6rdibf8zpuwtc.webp',
    'https://wallpapers.com/images/high/hello-kitty-valentines-day-celebration-yd1xbag7aw1cjiat.webp',
    'https://wallpapers.com/images/high/fruit-slice-and-hello-kitty-pfp-4i9g4nb0qv3j77gz.webp',
  ];

  images.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Cute Hello Kitty Image';
    img.style.width = '150px';
    img.style.height = '150px';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '10px';
    gridContainer.appendChild(img);
  });

  // Add the grid to the container
  container.appendChild(gridContainer);

  // Add the response message
  const message = document.createElement('p');
  message.id = 'response';
  message.textContent = "Me haces la persona más feliz del mundo, TE AMO! 🤍";
  container.appendChild(message);
});

function moveNoButton() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const buttonWidth = noButton.offsetWidth;
  const buttonHeight = noButton.offsetHeight;

  // Calculate random positions within the visible screen area
  const maxX = screenWidth - buttonWidth;
  const maxY = screenHeight - buttonHeight;

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  // Set the new position
  noButton.style.position = 'fixed';
  noButton.style.left = `${randomX}px`;
  noButton.style.top = `${randomY}px`;
}

// Evento para el botón "No"
noButton.addEventListener('click', () => {
  if (isFirstClick) {
    // Apply a transition effect on the first click
    noButton.style.transition = 'transform 0.5s ease';
    noButton.style.transform = 'scale(1.2)';
    setTimeout(() => {
      noButton.style.transform = 'scale(1)';
      isFirstClick = false; // Mark the first click as done
      
      // Activar el comportamiento para dispositivos no táctiles
      if (!isTouchDevice()) {
        isHoverActive = true;
        // Mostrar imagen y mensaje
        imageContainer.innerHTML = '<img src="https://i.pinimg.com/736x/26/a9/89/26a989b40c21f4abd29323c89a0c43f5.jpg" alt="Hello Kitty sorprendida" style="width: 200px; height: auto; border-radius: 10px;">';
        response.textContent = "Jaja, no puedes tocar el botón 🤣";
        // Mover el botón una vez después del clic
        moveNoButton();
      }
    }, 500);
  }
  
  // Para dispositivos táctiles
  if (isTouchDevice()) {
    imageContainer.innerHTML = '<img src="https://i.pinimg.com/736x/26/a9/89/26a989b40c21f4abd29323c89a0c43f5.jpg" alt="Hello Kitty sorprendida" style="width: 200px; height: auto; border-radius: 10px;">';
    response.textContent = "Jaja, no puedes tocar el botón 🤣";
    moveNoButton();
  }
});

// Evento mouseenter (cuando el cursor ENTRA al botón) - solo en computador
if (!isTouchDevice()) {
  noButton.addEventListener('mouseenter', () => {
    // Solo si ya pasó el primer clic
    if (isHoverActive) {
      imageContainer.innerHTML = '<img src="https://i.pinimg.com/736x/26/a9/89/26a989b40c21f4abd29323c89a0c43f5.jpg" alt="Hello Kitty sorprendida" style="width: 200px; height: auto; border-radius: 10px;">';
      response.textContent = "Jaja, no puedes tocar el botón 🤣";
      moveNoButton();
    }
  });
}

const darkModeToggle = document.getElementById('darkModeToggle');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Update button text based on the current mode
  if (document.body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = 'Modo Claro ☀️';
  } else {
    darkModeToggle.textContent = 'Modo Oscuro 🌙';
  }
});