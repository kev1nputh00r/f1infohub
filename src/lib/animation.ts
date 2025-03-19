
/**
 * Animation utility to animate elements when they enter the viewport
 */
export const initScrollAnimations = () => {
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;
      
      if (elementPosition < screenPosition) {
        element.classList.add('animated');
      }
    });
  };

  window.addEventListener('scroll', animateOnScroll);
  // Initial check
  setTimeout(animateOnScroll, 100);
  
  return () => window.removeEventListener('scroll', animateOnScroll);
};
