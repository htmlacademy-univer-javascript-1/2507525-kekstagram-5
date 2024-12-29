const LOAD_COMMENTS_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');
const commentsCountData = bigPicture.querySelector('.social__comment-count');

let displayedCommentsCount = LOAD_COMMENTS_STEP;
let allComments = [];

const replaceAllComments = (newComments = []) => {
  allComments = [...newComments];
};

const updateDisplayedCommentsCount = (newCount) => {
  displayedCommentsCount = newCount;
};

const createCommentElement = ({ avatar, name, message }) => {
  const commentElement = commentTemplate.cloneNode(true);
  const pictureElement = commentElement.querySelector('.social__picture');
  pictureElement.src = avatar;
  pictureElement.alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  return commentElement;
};

const updateCommentsCountData = () => {
  commentsCountData.innerHTML = `
    <span class="social__comment-shown-count">${displayedCommentsCount}</span> из
    <span class="social__comment-total-count">${allComments.length}</span> комментариев
  `;
};

const renderComments = () => {
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  displayedCommentsCount = Math.min(displayedCommentsCount, allComments.length);
  const commentsToDisplay = allComments.slice(0, displayedCommentsCount);

  updateCommentsCountData();

  if (displayedCommentsCount >= allComments.length) {
    loadCommentsButton.classList.add('hidden');
  } else {
    loadCommentsButton.classList.remove('hidden');
  }

  const commentElements = commentsToDisplay.map((comment) => createCommentElement(comment));
  commentElements.forEach((commentElement) => commentsFragment.appendChild(commentElement));

  commentsList.appendChild(commentsFragment);
};

const onLoadCommentsButtonClick = () => {
  displayedCommentsCount += LOAD_COMMENTS_STEP;
  renderComments();
};

export { replaceAllComments, updateDisplayedCommentsCount, renderComments, onLoadCommentsButtonClick };
