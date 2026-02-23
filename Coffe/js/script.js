// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));

// Menu filter (menu.html)
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Add-to-cart animation (visual only)
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    btn.innerHTML = '<i class="fas fa-check"></i> Added';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-cart-plus"></i> Add';
    }, 2000);
  });
});

// Lightbox for gallery (gallery.html)
const galleryImages = document.querySelectorAll('.gallery-img');
const lightboxModal = document.getElementById('lightboxModal');
if (lightboxModal) {
  lightboxModal.addEventListener('show.bs.modal', (event) => {
    const img = event.relatedTarget;
    const src = img.getAttribute('src');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = src;
  });
}

// Contact form validation (contact.html)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const feedback = document.getElementById('formFeedback');
    if (name === '' || email === '' || message === '') {
      feedback.innerHTML = '<div class="alert alert-danger">All fields are required.</div>';
    } else if (!email.includes('@')) {
      feedback.innerHTML = '<div class="alert alert-danger">Enter a valid email.</div>';
    } else {
      feedback.innerHTML = '<div class="alert alert-success">Message sent! (demo)</div>';
      contactForm.reset();
    }
  });
}

// Reservation form (contact.html)
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
  reservationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Reservation request received (demo). We’ll confirm shortly.');
    reservationForm.reset();
  });
}

// Add active class to nav based on current page (optional, but we already set manually)
// However, we can also highlight dynamically:
const currentPage = window.location.pathname.split('/').pop();
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});