export function applyHoverEffectToImages() {
  document.querySelectorAll('.image-wrapper').forEach(wrapper => {
    wrapper.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    wrapper.style.position = 'relative';
    wrapper.style.transformOrigin = 'top center';

    wrapper.addEventListener('mouseenter', () => {
      const angle = (Math.random() - 0.5) * 10; // -5 to +5 degrees
      wrapper.style.transform = `rotate(${angle}deg) scale(1.03)`;
      wrapper.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
      wrapper.style.zIndex = '20';
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'rotate(0deg) scale(1)';
      wrapper.style.boxShadow = 'none';

      // Delay resetting z-index until transition is done
      setTimeout(() => {
        wrapper.style.zIndex = '0';
      }, 300); // Match the transition duration (300ms)
    });

    wrapper.addEventListener('mousedown', () => {
      wrapper.style.transform += ' scale(0.98)';
      wrapper.style.zIndex = '11';
    });

    wrapper.addEventListener('mouseup', () => {
      wrapper.style.transform = wrapper.style.transform.replace(' scale(0.98)', '');
      wrapper.style.zIndex = '10';
    });
  });
}
