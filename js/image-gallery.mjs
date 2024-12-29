import { openBigPicture } from './photo-viewer.mjs';
import { sendRequest, filterDefault, filterRandom, filterDiscussed, debounce } from './util.mjs';
import { showDataLoadError } from './message-handler.mjs';

const DATA_URL = 'https://29.javascript.htmlacademy.pro/kekstagram/data';
const DEFAULT_DEBOUNCE_DELAY = 500;
const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const imgFilters = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

let allPictures = [];
let currentPictures = [];

const createPictureElement = (picture) => {
  const newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__img').alt = picture.description;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;

  newPicture.addEventListener('click', () => {
    openBigPicture(picture);
  });

  return newPicture;
};

const createPicturesFragment = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.appendChild(pictureElement);
  });
  return fragment;
};

const renderPictures = (pictures) => {
  currentPictures.forEach((pictureElement) => {
    picturesList.removeChild(pictureElement);
  });
  const fragment = createPicturesFragment(pictures);
  picturesList.appendChild(fragment);

  currentPictures = [...picturesList.querySelectorAll('.picture')];
};

const fetchPictures = async () => {
  allPictures = await sendRequest({
    url: DATA_URL,
    onError: () => showDataLoadError()
  });
  if (!allPictures) {
    return;
  }
  renderPictures(allPictures);
  imgFilters.classList.remove('img-filters--inactive');
};

const onFilterChange = (filter) => {
  let filteredPictures;
  switch (filter) {
    case 'filter-random':
      filteredPictures = filterRandom(allPictures);
      break;
    case 'filter-discussed':
      filteredPictures = filterDiscussed(allPictures);
      break;
    default:
      filteredPictures = filterDefault(allPictures);
  }
  renderPictures(filteredPictures);
};

filterButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
    evt.target.classList.add('img-filters__button--active');
    const filter = evt.target.id;
    debounce(() => onFilterChange(filter), DEFAULT_DEBOUNCE_DELAY)();
  });
});

export { fetchPictures };
