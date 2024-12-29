import { isEscapeKey } from './util.mjs';
import { closeOverlay, setErrorMessageVisibility } from './form-handler.mjs';

const Z_INDEX = 999;
const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const showDataLoadError = () => {
  const existingError = document.querySelector('.data-error');
  if (existingError) {
    existingError.remove();
  }
  const errorMessage = document.createElement('div');
  errorMessage.classList.add('data-error');
  errorMessage.textContent = 'Ошибка загрузки данных';

  Object.assign(errorMessage.style, {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '18px',
    color: 'white',
    backgroundColor: '#d9534f',
    padding: '15px 25px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: Z_INDEX,
    border: '2px solid #c9302c',
  });

  document.body.appendChild(errorMessage);
};

const createMessage = (template, type, closeCallback) => {
  const message = template.content.cloneNode(true);
  const section = message.querySelector(type);
  const button = message.querySelector(`${type}__button`);
  document.body.appendChild(message);

  button.addEventListener('click', () => {
    section.remove();
    closeCallback();
  });

  const onEscapeKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      section.remove();
      closeCallback();
    }
  };
  document.addEventListener('keydown', onEscapeKeyDown);

  section.addEventListener('click', (evt) => {
    if (evt.target === section) {
      section.remove();
      closeCallback();
    }
  });
};

const showSuccessMessage = () => {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  createMessage(successTemplate, '.success', closeOverlay);
};

const showErrorMessage = () => {
  setErrorMessageVisibility(true);
  createMessage(errorTemplate, '.error', () => setErrorMessageVisibility(false));
};

export { showDataLoadError, showSuccessMessage, showErrorMessage };
