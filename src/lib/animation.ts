
/**
 * Animation utility with conditional implementation based on route
 */
export const initScrollAnimations = () => {
  // Don't initialize animations on the news page
  if (window.location.pathname === '/news') {
    return () => {};
  }

  const animateElements = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight - 100;
      
      if (isVisible) {
        element.classList.add('animated');
      }
    });
  };

  // Initial check
  animateElements();

  // Add scroll listener
  window.addEventListener('scroll', animateElements);

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', animateElements);
  };
};
