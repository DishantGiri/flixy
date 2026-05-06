// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Buy button functionality
const buyButtons = document.querySelectorAll('.buy-btn, .hero-buy-btn, .offer-buy-btn, .floating-buy-btn');
buyButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Redirect to purchase page
    window.location.href = 'http://secureofficialsite.store/buy-flixy';
  });
});

// Show/hide floating button based on scroll
const floatingBtn = document.getElementById('floatingBuyBtn');
let lastScrollTop = 0;

window.addEventListener('scroll', function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Show button after scrolling down 300px
  if (scrollTop > 300) {
    floatingBtn.style.opacity = '1';
    floatingBtn.style.visibility = 'visible';
  } else {
    floatingBtn.style.opacity = '0';
    floatingBtn.style.visibility = 'hidden';
  }

  lastScrollTop = scrollTop;
});

// Initialize floating button as hidden
floatingBtn.style.opacity = '0';
floatingBtn.style.visibility = 'hidden';
floatingBtn.style.transition = 'opacity 0.3s, visibility 0.3s';

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  const navHeight = document.querySelector('.navbar').offsetHeight;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - navHeight - 100;
    const sectionHeight = section.clientHeight;

    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      link.classList.remove('active');
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    }
  });
});

// Add shine effect to floating button
floatingBtn.addEventListener('mouseenter', function () {
  this.style.background = 'linear-gradient(135deg, #ff0a16 0%, var(--netflix-red) 100%)';
});

floatingBtn.addEventListener('mouseleave', function () {
  this.style.background = 'linear-gradient(135deg, var(--netflix-red) 0%, #ff0a16 100%)';
});

console.log('Flixy TV Stick - Website Loaded Successfully! 🎬');

// FAQ Accordion Functionality + Mobile Navbar Toggle + Hero Scroll Animation
document.addEventListener('DOMContentLoaded', function () {
  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionHeader = item.querySelector('.faq-question-header');
    if (questionHeader) {
      questionHeader.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faqItem => faqItem.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Mobile navbar toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
      navbar.classList.toggle('nav-open');
    });

    // Close menu when a link is clicked (on small screens)
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('nav-open');
      });
    });
  }



  // Auto-update last updated date to today's date
  const lastUpdatedElement = document.getElementById('last-updated-date');
  if (lastUpdatedElement) {
    const today = new Date();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = months[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
    lastUpdatedElement.textContent = `${month} ${day}, ${year}`;
  }

  // Auto-update copyright year to current year
  const copyrightYearElement = document.getElementById('copyright-year');
  if (copyrightYearElement) {
    const currentYear = new Date().getFullYear();
    copyrightYearElement.textContent = currentYear;
  }

  // Video Tab Functionality
  const videoTabs = document.querySelectorAll('.video-tab');
  const featureVideos = document.querySelectorAll('.feature-video');
  const contentBlocks = document.querySelectorAll('.content-block');
  let currentVideoIndex = 0;

  function switchVideo(index) {
    // Remove active class from all tabs, videos, and content blocks
    videoTabs.forEach(tab => tab.classList.remove('active'));
    featureVideos.forEach(video => {
      video.classList.remove('active');
      video.pause();
      video.currentTime = 0;
    });
    contentBlocks.forEach(block => block.classList.remove('active'));

    // Add active class to selected tab, video, and content block
    videoTabs[index].classList.add('active');
    featureVideos[index].classList.add('active');
    contentBlocks[index].classList.add('active');

    // Play the selected video
    featureVideos[index].play().catch(err => {
      console.log('Video autoplay prevented:', err);
    });

    currentVideoIndex = index;
  }

  // Tab click handlers
  videoTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      switchVideo(index);
    });
  });

  // Auto-advance to next video when current video ends
  featureVideos.forEach((video, index) => {
    video.addEventListener('ended', () => {
      const nextIndex = (index + 1) % featureVideos.length;
      switchVideo(nextIndex);
    });
  });

  // Start playing the first video
  if (featureVideos.length > 0) {
    featureVideos[0].play().catch(err => {
      console.log('Video autoplay prevented:', err);
    });
  }
});
