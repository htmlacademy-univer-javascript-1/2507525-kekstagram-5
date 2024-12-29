import { isEscapeKey } from './util.mjs';
import { replaceAllComments, updateDisplayedCommentsCount, renderComments, onLoadCommentsButtonClick } from './comment-handler.mjs';

const COMMENTS_LOAD_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  updateDisplayedCommentsCount(COMMENTS_LOAD_STEP);
  replaceAllComments();
};

const onEscapeKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();

    document.removeEventListener('keydown', onEscapeKeyDown);
    loadCommentsButton.removeEventListener('click', onLoadCommentsButtonClick);
  }
};

const onCloseBigPictureClick = () => {
  closeBigPicture();

  document.removeEventListener('keydown', onEscapeKeyDown);
  loadCommentsButton.removeEventListener('click', onLoadCommentsButtonClick);
};

const addEventListeners = () => {
  document.addEventListener('keydown', onEscapeKeyDown);
  loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);
};

const openBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__comment-total-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  replaceAllComments(picture.comments.slice());

  renderComments();
  addEventListeners();

  document.body.classList.add('modal-open');
};

closeBigPictureButton.addEventListener('click', onCloseBigPictureClick);

export { openBigPicture };
