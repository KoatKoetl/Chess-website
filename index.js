function createCarousel(
  carouselSelector,
  sectionWrapperSelector,
  carouselContainerSelector,
  carouselItemSelector,
  buttonNextSelector,
  buttonPrevSelector,
  desktopMultiplier,
  tabletMultiplier,
  mobileMultiplier,
  dotsWrapperSelector = '',
  dotSelector = '',
  addDots = false,
  addCounter = false,
  currentCountSelector = '',
  totalCountSelector = '',
  autoCycle = false,
  cycleInterval = 4000
) {
  let count = 0;
  let increment = 0;
  let margin = 0;
  let itemDisplay = 0;
  let intervalId = null;

  let carousel = document.getElementsByClassName(carouselSelector)[0];
  let wrapper = document.getElementsByClassName(sectionWrapperSelector)[0];
  let wrapperWidth = wrapper.offsetWidth;
  let carouselContainer = document.getElementsByClassName(carouselContainerSelector)[0];
  let buttonNext = document.getElementsByClassName(buttonNextSelector)[0];
  let buttonPrev = document.getElementsByClassName(buttonPrevSelector)[0];
  let dotsWrapper = document.getElementsByClassName(dotsWrapperSelector)[0];
  let item = document.getElementsByClassName(carouselItemSelector);

  if (screen.width > 1000) {
    itemDisplay = carouselContainer.getAttribute('item-display-d');
    margin = itemDisplay * desktopMultiplier;
  }

  if (screen.width >= 645 && screen.width <= 1000) {
    itemDisplay = carouselContainer.getAttribute('item-display-t');
    margin = itemDisplay * tabletMultiplier;
  }

  if (screen.width < 645) {
    itemDisplay = carouselContainer.getAttribute('item-display-m');
    margin = itemDisplay * mobileMultiplier;
  }

  let countDots = Math.round(item.length / itemDisplay);

  let itemsLeft = item.length % itemDisplay;
  let itemSlide = Math.floor(item.length / itemDisplay) - 1;

  for (let i = 0; i < item.length; i++) {
    item[i].style.width = wrapperWidth / itemDisplay - margin + 'px';
  }

  function nextSlide() {
    if (increment < itemSlide) {
      increment++;
      count -= wrapperWidth;
    } else if (increment === itemSlide && itemsLeft > 0) {
      increment++;
      count -= (wrapperWidth / itemDisplay) * itemsLeft;
    } else {
      increment = 0;
      count = 0;
    }
    carousel.style.left = count + 'px';

    if (addDots === true) {
      updateDots();
    }
    if (addCounter === true) {
      updateCounter();
    }
  }

  buttonNext.addEventListener('click', () => {
    nextSlide();
    clearInterval(intervalId);
  });

  function prevSlide() {
    if (increment > 0) {
      if (increment === itemSlide + 1 && itemsLeft > 0) {
        increment--;
        count += (wrapperWidth / itemDisplay) * itemsLeft;
      } else {
        increment--;
        count += wrapperWidth;
      }
    }
    carousel.style.left = count + 'px';

    if (addDots === true) {
      updateDots();
    }
    if (addCounter === true) {
      updateCounter();
    }
  }

  buttonPrev.addEventListener('click', () => {
    prevSlide();
    clearInterval(intervalId);
  });

  if (addDots === true) {
    for (let i = 0; i < countDots; i++) {
      let dot = document.createElement('div');

      dot.classList.add(dotSelector);
      dot.style.width = '10px';
      dot.style.height = '10px';
      dot.style.borderRadius = '100%';

      dotsWrapper.appendChild(dot);
    }

    function updateDots() {
      let dots = document.querySelectorAll('.' + dotSelector);

      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === increment);
      });
    }

    updateDots();
  }

  if (addCounter === true) {
    function updateCounter() {
      let currentCount;
      let totalCount;
      currentCount = document.getElementsByClassName(currentCountSelector)[0];
      totalCount = document.getElementsByClassName(totalCountSelector)[0];

      totalCount.textContent = item.length;

      currentCount.classList.add('down');
      totalCount.classList.add('down');

      setTimeout(() => {
        currentCount.textContent = Math.min(item.length, (increment + 1) * itemDisplay);
        totalCount.textContent = item.length;

        currentCount.classList.remove('down');
        totalCount.classList.remove('down');
        currentCount.classList.add('new');
        totalCount.classList.add('new');
      }, 300);

      setTimeout(() => {
        currentCount.classList.remove('new');
        totalCount.classList.remove('new');
      }, 600);
    }

    if (autoCycle) {
      intervalId = setInterval(() => {
        nextSlide();
      }, cycleInterval);

      carousel.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
      });

      carousel.addEventListener('mouseleave', () => {
        intervalId = setInterval(() => {
          nextSlide();
        }, cycleInterval);
      });
    }

    updateCounter();
  }
}

createCarousel(
  'stages-carousel_width',
  'stages_wrapper',
  'stages-carousel_container',
  'stages-carousel_item',
  'stages-carousel_button--next',
  'stages-carousel_button--prev',
  5,
  10,
  12.5,
  'stages-carousel_dots',
  'stages-carousel_dot',
  true,
  false
);

createCarousel(
  'participants-carousel_width',
  'participants_wrapper',
  'participants-carousel_container',
  'participants_carousel-item',
  'participants-carousel_button--next',
  'participants-carousel_button--prev',
  28.5,
  1,
  1,
  '',
  '',
  false,
  true,
  'participants-carousel_counter-current',
  'participants-carousel_counter-total',
  true,
  4000
);
