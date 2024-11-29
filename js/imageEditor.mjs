export const previewImage = document.querySelector('.img-upload__preview');

export function applyFilters(image) {
  const effectValue = document.querySelector('.effect-level__value').value;
  const currentEffect = document.querySelector('input[name="effect"]:checked').value;

  if (image) {
    switch (currentEffect) {
      case 'chrome':
        image.style.filter = `grayscale(${effectValue / 100})`;
        break;
      case 'sepia':
        image.style.filter = `sepia(${effectValue / 100})`;
        break;
      case 'marvin':
        image.style.filter = `invert(${effectValue}%)`;
        break;
      case 'phobos':
        image.style.filter = `blur(${effectValue / 33}px)`;
        break;
      case 'heat':
        image.style.filter = `brightness(${1 + (effectValue / 100) * 2})`;
        break;
      default:
        image.style.filter = 'none';
        break;
    }
  }
}

export function resetFilters() {
  previewImage.style.filter = 'none';
  const effectLevelSliderS = document.querySelector('.effect-level__slider');
  if (effectLevelSliderS) {
    effectLevelSliderS.noUiSlider.set(100);
  }
}

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
let currentScale = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');

const updateScale = () => {
  previewImage.style.transform = `scale(${currentScale / 100})`;
  scaleControlValue.value = `${currentScale}%`;
};

export const resetScale = () => {
  currentScale = 100;
  updateScale();
};

scaleControlSmaller.addEventListener('click', () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
});

const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

if (effectLevelSlider) {
  noUiSlider.create(effectLevelSlider, {
    range: { min: 0, max: 100 },
    start: 100,
    connect: 'lower',
  });

  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    applyFilters(previewImage);
  });
}

const effectsRadio = document.querySelectorAll('.effects__radio');
effectsRadio.forEach((radio) => {
  radio.addEventListener('change', () => {
    applyFilters(previewImage);
  });
});

const fileInput = document.getElementById('upload-file');
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      applyFilters(previewImage);
    };
    reader.readAsDataURL(file);
  }
});
