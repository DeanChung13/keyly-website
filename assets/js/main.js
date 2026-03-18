document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-loaded');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.animate').forEach((el) => observer.observe(el));
});
