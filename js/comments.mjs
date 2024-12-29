const COMMENTS_LOAD_STEP = 5;
const bigPicture = document.querySelector('.big-picture');
const commentsList = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const loadCommentsButton = bigPicture.querySelector('.comments-loader');
const сommentsCountData = bigPicture.querySelector('.social__comment-count');

let displayedCommentsCount = COMMENTS_LOAD_STEP;
let allComments = [];

const replaceAllComments = (newComments = []) => {
  allComments = newComments;
};

const updateDisplayedCommentsCount = (newCount) => {
  displayedCommentsCount = newCount;
};

const createCommentElement = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};

const updateCommentsCountData = () => {
  сommentsCountData.innerHTML = `<span class="social__comment-shown-count">${displayedCommentsCount}</span> из <span class="social__comment-total-count">${allComments.length}</span> комментариев`;
};

const renderComments = () => {
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  displayedCommentsCount = Math.min(displayedCommentsCount, allComments.length);
  const commentsToDisplay = allComments.slice(0, displayedCommentsCount);
  updateCommentsCountData();

  if (allComments.length <= COMMENTS_LOAD_STEP || displayedCommentsCount >= allComments.length) {
    loadCommentsButton.classList.add('hidden');
  } else {
    loadCommentsButton.classList.remove('hidden');
  }

  commentsToDisplay.forEach((comment) => {
    commentsFragment.appendChild(createCommentElement(comment));
  });
  commentsList.appendChild(commentsFragment);
};

const onLoadCommentsButtonClick = () => {
  displayedCommentsCount += COMMENTS_LOAD_STEP;
  renderComments();
};

export { replaceAllComments, updateDisplayedCommentsCount, renderComments, onLoadCommentsButtonClick };
