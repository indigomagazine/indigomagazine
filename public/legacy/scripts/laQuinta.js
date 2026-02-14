/// Image array with reveal groups
const imageArray = [
    { src: 'article photos/laQuinta/image1.JPG', alt: 'Abstract art piece',     revealGroup: 1 },
    { src: 'article photos/laQuinta/image2.JPG', alt: 'Emotional portrait',     revealGroup: 2 },
    { src: 'article photos/laQuinta/image3.JPG', alt: 'Urban scene',            revealGroup: 1 },
    { src: 'article photos/laQuinta/image4.JPG', alt: 'Nature landscape',       revealGroup: 3 },
    { src: 'article photos/laQuinta/image5.JPG', alt: 'Abstract texture',       revealGroup: 2 },
    { src: 'article photos/laQuinta/image6.JPG', alt: 'Emotional moment',       revealGroup: 4 },
    { src: 'article photos/laQuinta/image7.JPG', alt: 'Architectural detail',   revealGroup: 3 },
    { src: 'article photos/laQuinta/image8.JPG', alt: 'Atmospheric scene',      revealGroup: 4 },
    { src: 'article photos/laQuinta/image9.JPG', alt: 'Artistic photograph',    revealGroup: 1 },
    { src: 'article photos/laQuinta/image10.JPG',alt: 'Conceptual piece',       revealGroup: 2 },
    { src: 'article photos/laQuinta/image11.JPG',alt: 'Textural detail',        revealGroup: 3 },
    { src: 'article photos/laQuinta/image12.JPG',alt: 'Expressive portrait',    revealGroup: 4 }
  ];
  
  document.addEventListener('DOMContentLoaded', () => {
    initializeNightMode();
    initializeCarousels();
    setupCarouselScrolling();
  });
  
  // Night mode toggle
  function initializeNightMode() {
    const toggleButton = document.getElementById('night-mode-toggle');
    const htmlEl = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    toggleButton.textContent = savedTheme === 'light' ? '☾' : '☼';
  
    toggleButton.addEventListener('click', () => {
      const current = htmlEl.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      htmlEl.setAttribute('data-theme', next);
      toggleButton.textContent = next === 'light' ? '☾' : '☼';
      localStorage.setItem('theme', next);
    });
  }
  
  // Populate each carousel
  function initializeCarousels() {
    document.querySelectorAll('.photo-section').forEach(section => {
      const track = section.querySelector('.carousel-track');
      const groupId = parseInt(section.dataset.group, 10);
      imageArray.forEach(imgObj => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        if (imgObj.revealGroup === groupId) item.classList.add('revealed');
        const img = Object.assign(document.createElement('img'), {
          src: imgObj.src,
          alt: imgObj.alt
        });
        item.append(img);
        track.append(item);
      });
    });
  }
  
  // Enable dragging / glide effect
  function setupCarouselScrolling() {
    document.querySelectorAll('.carousel-container').forEach(carousel => {
      // Hint of scroll
      setTimeout(() => {
        carousel.scrollLeft = 40;
        setTimeout(() => { carousel.scrollLeft = 0; }, 800);
      }, 1000);
  
      let isDown = false, startX, scrollLeft;
      carousel.addEventListener('mousedown', e => {
        isDown = true;
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      });
      carousel.addEventListener('mouseleave', () => {
        isDown = false; carousel.style.cursor = 'grab';
      });
      carousel.addEventListener('mouseup', () => {
        isDown = false; carousel.style.cursor = 'grab';
      });
      carousel.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2;
        carousel.scrollLeft = scrollLeft - walk;
      });
    });
  }
  