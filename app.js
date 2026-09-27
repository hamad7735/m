/* 
  JavaScript Interactive Logic for Contracting Website in Eastern Province
  Enhanced for Full Mobile Responsiveness & Touch Interactions
*/

let currentGalleryImages = [];
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initLightbox();
});

// Mobile menu toggle & Auto-close on link click
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('mobile-open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('mobile-open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close menu when clicking any nav link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }
}

// Lightbox functionality with Keyboard & Mobile Swipe Support
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    // Mobile Swipe Gesture Recognition
    modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  if (prevBtn) prevBtn.addEventListener('click', showPrevImage);
  if (nextBtn) nextBtn.addEventListener('click', showNextImage);

  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showPrevImage(); // RTL logic
    if (e.key === 'ArrowLeft') showNextImage();
  });
}

function handleSwipe() {
  const swipeThreshold = 50;
  if (touchEndX < touchStartX - swipeThreshold) {
    // Swiped Left -> Next Image in RTL
    showNextImage();
  }
  if (touchEndX > touchStartX + swipeThreshold) {
    // Swiped Right -> Prev Image in RTL
    showPrevImage();
  }
}

function openLightbox(imagesList, index) {
  currentGalleryImages = imagesList;
  currentImageIndex = index;
  updateLightboxContent();
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function showNextImage() {
  if (currentGalleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
  updateLightboxContent();
}

function showPrevImage() {
  if (currentGalleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const imgElem = document.getElementById('lightboxImg');
  const counterElem = document.getElementById('lightboxCounter');

  if (imgElem && currentGalleryImages[currentImageIndex]) {
    imgElem.src = currentGalleryImages[currentImageIndex];
  }
  if (counterElem) {
    counterElem.textContent = `${currentImageIndex + 1} / ${currentGalleryImages.length}`;
  }
}
