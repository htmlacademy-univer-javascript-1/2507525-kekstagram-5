import { applyFilters, resetFilters, resetScale } from './imageEditor.mjs';

export function initForm() {
  const form = document.querySelector('.img-upload__form');
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__error',
    successClass: 'img-upload__success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__error-text'
  });

  const hashtags = form.querySelector('[name="hashtags"]');
  pristine.addValidator(hashtags, (value) => {
    if (!value) {
      return true;
    }
    const tags = value.split(' ');
    const uniqueTags = new Set(tags);

    if (tags.length > 5) {
      return false;
    }

    if (tags.length !== uniqueTags.size) {
      return false;
    }

    for (const tag of tags) {
      if (!/^#[a-zA-Z0-9]{1,19}$/.test(tag)) {
        return false;
      }
    }
    return true;
  }, 'Хэш-тег должен начинаться с #, содержать только буквы и цифры, не более 20 символов, быть уникальным и не более 5 штук.');

  const description = form.querySelector('[name="description"]');
  pristine.addValidator(description, (value) => value.length <= 140, 'Комментарий не должен превышать 140 символов');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (pristine.validate()) {
      form.submit();
    } else {
      return false;
    }
  });

  const cancelButton = document.getElementById('upload-cancel');
  const fileInput = document.getElementById('upload-file');
  const overlay = document.querySelector('.img-upload__overlay');
  const body = document.body;

  const closeForm = () => {
    pristine.reset();
    overlay.classList.add('hidden');
    body.classList.remove('modal-open');
    form.reset();
    fileInput.value = '';
    resetFilters();
    resetScale();
  };

  cancelButton.addEventListener('click', closeForm);

  const onEscKeyDown = (e) => {
    const isHashtagsFocused = hashtags === document.activeElement;
    const isDescriptionFocused = description === document.activeElement;

    if (e.key === 'Escape' && !isHashtagsFocused && !isDescriptionFocused) {
      closeForm();
    }
  };

  document.addEventListener('keydown', onEscKeyDown);

  hashtags.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
    }
  });

  description.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
    }
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      overlay.classList.remove('hidden');
      body.classList.add('modal-open');
      const reader = new FileReader();
      reader.onload = function (e) {
        const imagePreview = document.querySelector('.img-upload__preview img');
        imagePreview.src = e.target.result;
        applyFilters(imagePreview);
      };
      reader.readAsDataURL(file);
    }
  });
}
