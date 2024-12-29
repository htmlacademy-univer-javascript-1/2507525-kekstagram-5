const MAX_HASHTAGS = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const RANDOM_PICTURES_COUNT = 10;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getUniqueRandomInteger = (a, b, valuesArray) => {
  let randomNumber = getRandomInteger(a, b);
  while (valuesArray.includes(randomNumber)) {
    randomNumber = getRandomInteger(a, b);
    if (valuesArray.length >= (b - a + 1)) {
      throw new Error(`Уникальных значиний в диапазоне от ${a} до ${b} больше нет!`);
    }
  }
  valuesArray.push(randomNumber);
  return randomNumber;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const parseInput = (value) => value.trim().toLowerCase().split(/\s+/);

const validateHashtagsCount = (value) => {
  const hashtags = parseInput(value);
  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagsUnique = (value) => {
  const hashtags = parseInput(value);
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

const validateHashtagsPattern = (value) => {
  const hashtags = parseInput(value);
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/;
  return !value || hashtags[0] === '' || hashtags.every((hashtag) => hashtagPattern.test(hashtag));
};

const validateDescriptionLength = (value) => !value || value.length <= MAX_DESCRIPTION_LENGTH;

const sendRequest = ({ url, method = 'GET', body = null, onSuccess, onError, onFinally }) =>
  fetch(url, {
    method,
    body
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status}`);
    })
    .then((data) => {
      if (onSuccess) {
        onSuccess(data);
        document.body.classList.remove('modal-open');
      }
      return data;
    })
    .catch(() => {
      if (onError) {
        onError();
      }
    })
    .finally(() => {
      if (onFinally) {
        onFinally();
      }
    });

const filterDefault = (pictures) => pictures.slice();

const filterRandom = (pictures) => {
  const randomPictures = pictures.slice().sort(() => 0.5 - Math.random());
  return randomPictures.slice(0, RANDOM_PICTURES_COUNT);
};

const filterDiscussed = (pictures) => {
  const discussedPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  return discussedPictures;
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getUniqueRandomInteger,
  isEscapeKey,
  validateHashtagsCount,
  validateHashtagsUnique,
  validateHashtagsPattern,
  validateDescriptionLength,
  sendRequest,
  filterDefault,
  filterRandom,
  filterDiscussed,
  debounce
};
