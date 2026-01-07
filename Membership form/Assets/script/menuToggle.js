document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const closeMenu = document.getElementById('close-menu');
  
    // Open menu
    hamburgerMenu.addEventListener('click', () => {
      navMenu.classList.add('active');
      document.body.classList.add('no-scroll'); // Disable background scrolling
    });
  
    // Close menu
    closeMenu.addEventListener('click', () => {
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll'); // Enable background scrolling
    });
  });
