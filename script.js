// Inject header and footer
function includeHTML(id, file) {
  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      return res.text();
    })
    .then(html => {
      document.getElementById(id).innerHTML = html;

      // Attach hamburger logic after header loads
      if (id === "header-placeholder") {
        const menuIcon = document.getElementById("mobile-menu-icon");
        const navLinks = document.querySelector(".nav-links");
        if (menuIcon && navLinks) {
          menuIcon.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }
      }
    })
    .catch(console.error);
}

// Scroll to Top Button
function initScrollButton() {
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.onscroll = () => {
    scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
  };
  scrollBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
}

document.addEventListener("DOMContentLoaded", () => {
  includeHTML("header-placeholder", "partials/header.html");
  includeHTML("footer-placeholder", "partials/footer.html");
  initScrollButton();
});

// Booking calculator (glamping or camping)
function initBookingCalculator() {
  const form = document.getElementById('glampForm') || document.getElementById('campForm');
  const result = document.getElementById('glampPriceResult');
  if (!form || !result) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const adults = parseInt(form.querySelector('#adults').value) || 0;
    const child5 = parseInt(form.querySelector('#child5').value) || 0;
    const child10 = parseInt(form.querySelector('#child10').value) || 0;
    const stayDate = new Date(form.querySelector('input[type="date"]').value);
    const isWeekend = [0, 6].includes(stayDate.getDay());

    // Detect page type
    const isCamp = form.id === 'campForm';

    // Dynamic pricing
    const adultRate = isCamp ? (isWeekend ? 1099 : 849) : (isWeekend ? 1499 : 1249);
    const child10Rate = adultRate * 0.5;
    const child5Rate = 0;

    const total =
      adults * adultRate +
      child10 * child10Rate +
      child5 * child5Rate;

    result.textContent = `Total Price: ₹${total.toFixed(0)}`;
  });
}


// WhatsApp Redirect for Contact Form
function initContactForm() {
  const form = document.querySelector('.contact-form-section form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const name = encodeURIComponent(form.querySelector('#name').value.trim());
    const email = encodeURIComponent(form.querySelector('#email').value.trim());
    const message = encodeURIComponent(form.querySelector('#message').value.trim());

    const text = `Hello! I would like to reach out:\nName: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const url = `https://wa.me/917558640623?text=${text}`;

    window.location.href = url;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // ...existing init calls...
  initContactForm();
  // existing inits...
   initBookingCalculator();
});

function initGalleryLightbox() {
  const images = document.querySelectorAll('.photo-item img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');

  if (!images.length || !lightbox || !lightboxImg || !closeBtn) return;

  images.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initGalleryLightbox();
});


  
