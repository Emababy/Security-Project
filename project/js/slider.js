// Hero Carousel
const slider1 = document.querySelector('#glide_1');
const landing = document.querySelector('.landing');

const glide = new Glide(slider1, {
  type: 'carousel',
  startAt: 1,
  autoplay: 8000,
  gap: 0,
  hoverpause: true,
  perView: 1,
  animationDuration: 800,
  animationTimingFunc: 'linear',
});

// Listen to Glide's run.after event
glide.on('run.before', () => {
  const imageSrc = document.querySelector('.glide__slide--active').dataset.image;

  landing.style.backgroundImage = `url(${imageSrc})`;
});

glide.mount();
