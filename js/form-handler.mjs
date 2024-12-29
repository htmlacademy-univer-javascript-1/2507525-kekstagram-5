import { isEscapeKey } from './util.mjs';
import { initializeValidation } from './validation.mjs';
import { submitForm } from './form-submit.mjs';
import { resetScale } from './image-scale.mjs';
import { resetEffect } from './image-effects.mjs';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = document.querySelector('.img-upload__input');
const imageEditForm = document.querySelector('.img-upload__overlay');
const closeEditFormButton = document.querySelector('.img-upload__cancel');
const imageScale = document.querySelector('.scale__control--value');
const effectLevel = document.querySelector('.effect-level__value');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const effectButtons = document.querySelectorAll('.effects__radio');
const previewImage = document.querySelector('.img-upload__preview img');
const previewElements = document.querySelectorAll('.effects__preview');

let isErrorMessageOpen = false;

const pristine = initializeValidation(uploadForm, hashtagsInput, descriptionInput);
submitForm(uploadForm, pristine);

imageUploadInput.addEventListener('change', () => {
  if (imageUploadInput.files.length > 0) {
    pristine.reset();
    const file = imageUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const imgUrl = URL.createObjectURL(file);
      previewImage.src = imgUrl;
      previewElements.forEach((element) => {
        element.style.backgroundImage = `url(${imgUrl})`;
      });
      imageEditForm.classList.remove('hidden');
      document.body.classList.add('modal-open');
    }
  }
});

const resetFormFields = () => {
  imageUploadInput.value = '';
  imageScale.value = '100%';
  effectLevel.value = '';
  effectButtons.forEach((button) => {
    button.checked = button.id === 'effect-none';
  });
  hashtagsInput.value = '';
  descriptionInput.value = '';
};

const closeOverlay = () => {
  imageEditForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetFormFields();
  pristine.reset();
  resetScale();
  resetEffect();

  closeEditFormButton.removeEventListener('click', closeOverlay);
};

const isInputFieldFocused = (evt) => evt.target === hashtagsInput || evt.target === descriptionInput;

const setErrorMessageStatus = (status) => {
  isErrorMessageOpen = status;
};

const onEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt) && !isInputFieldFocused(evt) && !isErrorMessageOpen) {
    closeOverlay();
  }
};

const addEventListeners = () => {
  closeEditFormButton.addEventListener('click', closeOverlay);
  document.addEventListener('keydown', onEscapeKeyDown);
};

addEventListeners();

export { closeOverlay, setErrorMessageStatus };
