const previewImageElement = document.querySelector('.img-upload__preview img');
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
const effectValueElement = document.querySelector('.effect-level__value');

const resetImageFilters = () => {
  effectSliderContainer.style.display = 'none';
  previewImageElement.style.filter = '';
  effectValueElement.value = '';
};

const setImageEffect = (effectType, intensity) => {
  switch (effectType) {
    case 'chrome':
      previewImageElement.style.filter = `grayscale(${intensity})`;
      break;
    case 'sepia':
      previewImageElement.style.filter = `sepia(${intensity})`;
      break;
    case 'marvin':
      previewImageElement.style.filter = `invert(${intensity}%)`;
      break;
    case 'phobos':
      previewImageElement.style.filter = `blur(${intensity}px)`;
      break;
    case 'heat':
      previewImageElement.style.filter = `brightness(${intensity})`;
      break;
    default:
      resetImageFilters();
      break;
  }
};

export { resetImageFilters, setImageEffect };
