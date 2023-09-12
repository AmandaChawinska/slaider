console.log("Witam wszystkich zainteresowanych :)");

const activeSlideIndexes = [0, 1, 2, 3, 4, 5, 6];
const slides = document.querySelectorAll(".slide");
const totalSlides = slides.length;
let interval;
let isAutoPlay = true;
let activeDotIndex = 0;

const dots = document.querySelectorAll(".dot");
const playButton = document.querySelector("#pause");

const updateActiveDot = () => {
  dots.forEach((dot, index) => {
    if (index === activeDotIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
};

const showSlide = () => {
  for (let i = 0; i < totalSlides; i++) {
    slides[i].classList.remove("active");
  }
  for (let i = 0; i < activeSlideIndexes.length; i++) {
    slides[activeSlideIndexes[i]].classList.add("active");
  }
};

const showNextSlide = () => {
  for (let i = 0; i < activeSlideIndexes.length; i++) {
    slides[activeSlideIndexes[i]].classList.remove("active");
    activeSlideIndexes[i] = (activeSlideIndexes[i] + 1) % totalSlides;
  }
  showSlide();
  activeDotIndex = activeDotIndex < dots.length - 1 ? activeDotIndex + 1 : 0;
  updateActiveDot();
};

const showPreviousSilde = () => {
  for (let i = 0; i < activeSlideIndexes.length; i++) {
    slides[activeSlideIndexes[i]].classList.remove("active");
    activeSlideIndexes[i] =
      (activeSlideIndexes[i] - 1 + totalSlides) % totalSlides;
  }
  showSlide();
  activeDotIndex = activeDotIndex > 0 ? activeDotIndex - 1 : dots.length - 1;
  updateActiveDot();
};

const setSlideIndexes = (dotIndex) => {
  activeSlideIndexes = [];
  for (let i = dotIndex; i < dotIndex + 7; i++) {
    activeSlideIndexes.push(i % totalSlides);
  }
  showSlide();
};

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    stopAutoSlideShow();
    setSlideIndexes(index);
    activeDotIndex = index;
    updateActiveDot();
    startAutoSlideShow();
  });
});

const startAutoSlideShow = () => {
  interval = setInterval(showNextSlide, 3000);
};

startAutoSlideShow();

const stopAutoSlideShow = () => {
  clearInterval(interval);
};

playButton.addEventListener("click", () => {
  if (isAutoPlay) {
    stopAutoSlideShow();
  } else {
    startAutoSlideShow();
  }
  isAutoPlay = !isAutoPlay;
});

const arrowRight = document.querySelector(".arrow-right");
const arrowLeft = document.querySelector(".arrow-left");
arrowRight.addEventListener("click", () => {
  stopAutoSlideShow();
  showNextSlide();
  startAutoSlideShow();
});

arrowLeft.addEventListener("click", () => {
  stopAutoSlideShow();
  showPreviousSilde();
  startAutoSlideShow();
});
