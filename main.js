import './style.css'

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');
const scrollTopBtn = document.getElementById('scroll-top');
const inquiryModal = document.getElementById('inquiry-modal');
const contactForm = document.getElementById('contact-form');
const inquiryForm = document.getElementById('inquiry-form');
const newsletterForm = document.getElementById('newsletter-form');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('active');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  if (window.scrollY > 500) {
    scrollTopBtn.classList.add('active');
  } else {
    scrollTopBtn.classList.remove('active');
  }

  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(l => l.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

window.openInquiry = function(productName) {
  document.getElementById('product-name').textContent = productName;
  inquiryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
};

window.closeInquiry = function() {
  inquiryModal.classList.remove('active');
  document.body.style.overflow = 'auto';
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && inquiryModal.classList.contains('active')) {
    window.closeInquiry();
  }
});

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log('Contact form submitted:', data);

    showNotification('Thank you for your message! We will get back to you within 24 hours.');

    contactForm.reset();
  });
}

if (inquiryForm) {
  inquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(inquiryForm);
    const data = Object.fromEntries(formData);
    const productName = document.getElementById('product-name').textContent;

    console.log('Inquiry form submitted:', { product: productName, ...data });

    showNotification('Your inquiry has been submitted! We will send you a quote shortly.');

    inquiryForm.reset();
    window.closeInquiry();
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(newsletterForm);
    const email = formData.get('email');

    console.log('Newsletter subscription:', email);

    showNotification('Successfully subscribed to our newsletter!');

    newsletterForm.reset();
  });
}

function showNotification(message) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;

  const styles = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background-color: #2d5a3d;
    color: white;
    padding: 16px 32px;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 9999;
    transition: transform 0.3s ease;
    max-width: 90%;
    text-align: center;
    font-weight: 500;
  `;

  notification.style.cssText = styles;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);

  setTimeout(() => {
    notification.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.product-card, .benefit-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

console.log('Cashew Premium Website Loaded Successfully');
