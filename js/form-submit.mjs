import { sendRequest } from './util.mjs';
import { showSuccessMessage, showErrorMessage } from './messages.mjs';

const POST_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/';

const submitForm = (form, pristine) => {
  const submitButton = document.querySelector('.img-upload__submit');

  form.addEventListener('input', () => {
    submitButton.disabled = !pristine.validate();
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(form);
    submitButton.disabled = true;

    sendRequest({
      url: POST_URL,
      method: 'POST',
      body: formData,
      onSuccess: () => showSuccessMessage(),
      onError: () => showErrorMessage(),
      onFinally: () => {
        submitButton.disabled = false;
      },
    });
  });
};

export { submitForm };
