import { isEscapeKey } from './util.mjs';
import { initializeValidation } from './input-validator.mjs';
import { handleSubmitForm } from './form-submit.mjs';
import { resetScale } from './photo-scaler.mjs';
import { resetImageFilters } from './photo-effects.mjs';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadFormElement = document.querySelector('.img-upload__form');
const imageInputElement = document.querySelector('.img-upload__input');
const imageEditOverlay = document.querySelector('.img-upload__overlay');
const closeOverlayButton = document.querySelector('.img-upload__cancel');
const imageScaleControl = document.querySelector('.scale__control--value');
const effectSliderValue = document.querySelector('.effect-level__value');
const hashtagsInputField = document.querySelector('.text__hashtags');
const descriptionInputField = document.querySelector('.text__description');
const effectRadioBtns = document.querySelectorAll('.effects__radio');
const imagePreviewElement = document.querySelector('.img-upload__preview img');
const effectPreviewElements = document.querySelectorAll('.effects__preview');

let isErrorMessageVisible = false;

const validationInstance = initializeValidation(uploadFormElement, hashtagsInputField, descriptionInputField);
handleSubmitForm(uploadFormElement, validationInstance);

imageInputElement.addEventListener('change', () => {
  if (imageInputElement.files.length > 0) {
    validationInstance.reset();
    const file = imageInputElement.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      imagePreviewElement.src = imageUrl;
      effectPreviewElements.forEach((element) => {
        element.style.backgroundImage = `url(${imageUrl})`;
      });
      imageEditOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }
});

const resetFormFields = () => {
  imageInputElement.value = '';
  imageScaleControl.value = '100%';
  effectSliderValue.value = '';
  effectRadioBtns.forEach((button) => {
    button.checked = button.id === 'effect-none';
  });
  hashtagsInputField.value = '';
  descriptionInputField.value = '';
};

const closeOverlay = () => {
  imageEditOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormFields();
  validationInstance.reset();
  resetScale();
  resetImageFilters();


};

const isInputFieldFocused = (event) => event.target === hashtagsInputField || event.target === descriptionInputField;

const setErrorMessageVisibility = (status) => {
  isErrorMessageVisible = status;
};

const onEscapeKeyDown = (event) => {
  if (isEscapeKey(event) && !isInputFieldFocused(event) && !isErrorMessageVisible) {
    closeOverlay();
  }
};

const addEventListeners = () => {
  closeOverlayButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onEscapeKeyDown);
};

addEventListeners();

export { closeOverlay, setErrorMessageVisibility };
