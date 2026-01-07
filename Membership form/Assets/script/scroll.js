  // Get the button
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  // Show the button when scrolled down 100px
  window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
          scrollToTopBtn.style.display = "block";
      } else {
          scrollToTopBtn.style.display = "none";
      }
  };
  
  // When the button is clicked, scroll to the top
  scrollToTopBtn.addEventListener("click", function() {
      window.scrollTo({
          top: 0,
          behavior: "smooth" // Smooth scrolling effect
      });
  });
  
//   //Restriction
//   document.addEventListener('keydown', function(e) {
//     if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
//         e.preventDefault();
//     }
//     if (e.key === 's') {
//         e.preventDefault();
//     }
//     if (e.key === 'c') {
//         e.preventDefault();
//     }
//   });

//   document.addEventListener('contextmenu', event => {
//     event.preventDefault();
// });

// document.querySelectorAll('.disabled').forEach(element => {
//     element.style.pointerEvents = 'none';
// });

// document.addEventListener('contextmenu', event => {
//     event.preventDefault();
// });

// document.querySelectorAll('.disabled').forEach(element => {
//     element.style.pointerEvents = 'none';
// });
