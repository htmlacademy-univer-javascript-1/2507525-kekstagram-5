import { sendRequest } from './util.mjs';
import { showSuccessMessage, showErrorMessage } from './message-handler.mjs';

const POST_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/';

const handleSubmitForm = (formElement, validationInstance) => {
  const submitBtn = document.querySelector('.img-upload__submit');

  formElement.addEventListener('input', () => {
    submitBtn.disabled = !validationInstance.validate();
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(formElement);
    submitBtn.disabled = true;

    sendRequest({
      url: POST_URL,
      method: 'POST',
      body: formData,
      onSuccess: () => showSuccessMessage(),
      onError: () => showErrorMessage(),
      onFinally: () => {
        submitBtn.disabled = false;
      },
    });
  });
};

export { handleSubmitForm };
