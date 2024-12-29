const previewImageElement = document.querySelector('.img-upload__preview img');
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const resetImageFilters = () => {
  effectSliderContainer.style.display = 'none';
  previewImageElement.style.filter = '';
  effectValueElement.value = '';
};

const effectsMap = {
  chrome: (intensity) => `grayscale(${intensity})`,
  sepia: (intensity) => `sepia(${intensity})`,
  marvin: (intensity) => `invert(${intensity}%)`,
  phobos: (intensity) => `blur(${intensity}px)`,
  heat: (intensity) => `brightness(${intensity})`,
};

const setImageEffect = (effectType, intensity) => {
  const effect = effectsMap[effectType];
  if (effect) {
    previewImageElement.style.filter = effect(intensity);
  } else {
    resetImageFilters();
  }
};

export { resetImageFilters, setImageEffect };
