document.addEventListener("DOMContentLoaded", () => {
  const floatingPhotos = document.querySelectorAll(".floating-photo-wrapper");
  const positions = [];

  const isOverlapping = (x, y, size) => {
    return positions.some(
      (pos) =>
        x < pos.x + size &&
        x + size > pos.x &&
        y < pos.y + size &&
        y + size > pos.y
    );
  };

  floatingPhotos.forEach((photo) => {
    let randomX, randomY;
    const size = 150; // Assuming square-sized photos
    
    // Generate random positions, avoiding overlap
    do {
      randomX = Math.floor(Math.random() * (window.innerWidth - size));
      randomY = Math.floor(Math.random() * (window.innerHeight - size));
    } while (isOverlapping(randomX, randomY, size));

    positions.push({ x: randomX, y: randomY });
    photo.style.left = `${randomX}px`;
    photo.style.top = `${randomY}px`;

    // Add randomized animation delay for natural staggered motion
    const randomDelay = Math.random() * 2; // Between 0-2 seconds
    photo.style.animationDelay = `${randomDelay}s`;
  });
});

// Smooth mouse movement interaction
let targetX = 0,
  targetY = 0;
let currentX = 0,
  currentY = 0;

// Smooth transition function
function smoothMove() {
  const wrappers = document.querySelectorAll(".floating-photo-wrapper");

  // Gradual interpolation to target positions
  currentX += (targetX - currentX) * 0.1;
  currentY += (targetY - currentY) * 0.1;

  wrappers.forEach((wrapper, index) => {
    const offsetX = currentX / (10 + index); // Gradual movement scaling
    const offsetY = currentY / (10 + index);

    wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });

  requestAnimationFrame(smoothMove);
}

// Capture mouse or touch movement
document.addEventListener("mousemove", (event) => {
  targetX = event.clientX - window.innerWidth / 2;
  targetY = event.clientY - window.innerHeight / 2;
});

document.addEventListener("touchmove", (event) => {
  const touch = event.touches[0];
  targetX = touch.clientX - window.innerWidth / 2;
  targetY = touch.clientY - window.innerHeight / 2;
});

// Start smooth movement loop
smoothMove();

"https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js">
"https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js">
$(function() {
  $('#aura-section').ripples({
      resolution: 512,
      dropRadius: 20,
      interactive: true,
      perturbance: 0.02,
  });

  // Update size on window resize
  $(window).resize(function() {
      $('#aura-section').ripples('updateSize');
  });
});


function changeColor() {
  const body = document.body;
  const changeModeBtn = document.querySelector(".change-mode");
  const themeLogoImg = document.querySelector(".logo");
  const h1Text = document.querySelectorAll("h1");
  const missionStatementText = document.querySelector(".mission-statement");
  const taskbarText = document.querySelectorAll(".taskbar-text");

  // Toggle the light mode class
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    changeModeBtn.textContent = "☼";
    themeLogoImg.src = "assets/logos/indigologoblack.png";
    h1Text.forEach(text => text.style.color = "black");
    missionStatementText.style.color = "#51289C";
    taskbarText.forEach(text => text.style.color = "black");
    body.style.backgroundColor = "white";
    localStorage.setItem('theme', 'light');
  } else {
    changeModeBtn.textContent = "☾";
    themeLogoImg.src = "assets/logos/indigologowhite.png";
    h1Text.forEach(text => text.style.color = "white");
    missionStatementText.style.color = "#C19EEA";
    taskbarText.forEach(text => text.style.color = "white");
    body.style.backgroundColor = "black";
    localStorage.setItem('theme', 'dark');
  }
}

// On page load, apply the saved theme
window.onload = () => {
  const h1Text = document.querySelectorAll("h1");
  const taskbarText = document.querySelectorAll(".taskbar-text");
  const missionStatementText = document.querySelector(".mission-statement");

  // Apply the saved theme or default
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add("light-mode");
    document.querySelector(".change-mode").textContent = "☼";
    document.querySelector(".logo").src = "assets/logos/indigologoblack.png";
    h1Text.forEach(text => text.style.color = "black");
    missionStatementText.style.color = "#51289C";
    taskbarText.forEach(text => text.style.color = "black");
    document.body.style.backgroundColor = "white";
  } else {
    document.querySelector(".change-mode").textContent = "☾";
    document.querySelector(".logo").src = "assets/logos/indigologowhite.png";
    h1Text.forEach(text => text.style.color = "white");
    missionStatementText.style.color = "#C19EEA";
    taskbarText.forEach(text => text.style.color = "white");
    document.body.style.backgroundColor = "black";
  }
};



let lastScrollTop = 0;
const taskbar = document.getElementById("Taskbar-container");
let ticking = false;

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    taskbar.classList.add('hidden');
    taskbar.classList.remove('visible');
  } else {
    taskbar.classList.remove('hidden');
    taskbar.classList.add('visible');
  }
  
  lastScrollTop = scrollTop;
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});


  window.addEventListener('load', function() {
    var video = document.getElementById('hero-video');
    video.play();
  });


  document.addEventListener("DOMContentLoaded", function () {
    const video = document.querySelector("video");
    video.play().then(() => {
      // If video plays, it will loop as intended
      video.style.display = "block";
    }).catch(() => {
      // If video cannot autoplay, show fallback image
      video.style.display = "none";
    });
  });
  
