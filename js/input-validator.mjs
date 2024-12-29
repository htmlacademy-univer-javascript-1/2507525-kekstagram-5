import { validateHashtagsCount, validateHashtagsUnique, validateHashtagsPattern, validateDescriptionLength } from './util.mjs';

const initializeValidation = (form, hashtagsInput, descriptionInput) => {
  const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'img-upload__error-text'
  });

  const validators = [
    { input: hashtagsInput, validator: validateHashtagsPattern, message: 'Неверный формат хэш-тега' },
    { input: hashtagsInput, validator: validateHashtagsCount, message: 'Не более 5 хэш-тегов' },
    { input: descriptionInput, validator: validateDescriptionLength, message: 'Комментарий не должен превышать 140 символов' },
    { input: hashtagsInput, validator: validateHashtagsUnique, message: 'Хэш-теги должны быть уникальными' }
  ];

  validators.forEach(({ input, validator, message }) => {
    pristine.addValidator(input, validator, message);
  });

  return pristine;
};

export { initializeValidation };

