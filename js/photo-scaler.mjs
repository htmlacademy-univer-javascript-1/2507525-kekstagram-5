const MIN_SCALE = 25;
const MAX_SCALE = 100;
const STEP_SCALE = 25;
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
let scaleValue = MAX_SCALE;

const updateScale = () => {
  scaleValueInput.value = `${scaleValue}%`;
  imagePreview.style.transform = `scale(${scaleValue / 100})`;
};

const resetScale = () => {
  scaleValue = MAX_SCALE;
  updateScale();
};

const changeScale = (delta) => {
  scaleValue = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scaleValue + delta));
  updateScale();
};

const onImageInputChange = () => {
  resetScale();
};

document.querySelector('.img-upload__input').addEventListener('change', onImageInputChange);

smallerButton.addEventListener('click', () => changeScale(-STEP_SCALE));
biggerButton.addEventListener('click', () => changeScale(STEP_SCALE));

export { resetScale };
