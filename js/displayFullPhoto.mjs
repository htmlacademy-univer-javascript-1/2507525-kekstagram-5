export function displayFullPhoto(photoData) {
  const modalElement = document.querySelector('.big-picture');
  const pageBody = document.querySelector('body');
  const COMMENTS_LOAD_STEP = 5;
  const commentsList = modalElement.querySelector('.social__comments');
  const commentTemplate = commentsList.querySelector('.social__comment');
  const loadCommentsButton = modalElement.querySelector('.comments-loader');
  const сommentsCountData = modalElement.querySelector('.social__comment-count');

  let displayedCommentsCount = COMMENTS_LOAD_STEP;
  let allComments = [];

  function populatePhotoDetails() {
    const imgElement = modalElement.querySelector('.big-picture__img img');
    imgElement.src = photoData.url;
    imgElement.alt = photoData.description;

    modalElement.querySelector('.likes-count').textContent = photoData.likes;
    modalElement.querySelector('.comments-count').textContent = photoData.comments.length;
    modalElement.querySelector('.social__caption').textContent = photoData.description;
    allComments = photoData.comments.slice();
  }

  function createCommentElement(comment) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    return commentElement;
  }

  function renderComments() {
    commentsList.innerHTML = '';
    const commentsFragment = document.createDocumentFragment();
    displayedCommentsCount = Math.min(displayedCommentsCount, allComments.length);
    const commentsToDisplay = allComments.slice(0, displayedCommentsCount);
    сommentsCountData.innerHTML = `${displayedCommentsCount} из <span class="comments-count">${allComments.length}</span> комментариев`;;

    if (allComments.length <= COMMENTS_LOAD_STEP || displayedCommentsCount >= allComments.length) {
      loadCommentsButton.classList.add('hidden');
    } else {
      loadCommentsButton.classList.remove('hidden');
    }

    commentsToDisplay.forEach((comment) => {
      commentsFragment.appendChild(createCommentElement(comment));
    });
    commentsList.appendChild(commentsFragment);
  }

  function onLoadCommentsButtonClick() {
    displayedCommentsCount += COMMENTS_LOAD_STEP;
    renderComments();
  }

  function hideCommentControls() {
    modalElement.querySelector('.social__comment-count').style.display = 'none';
    loadCommentsButton.style.display = 'none';
  }

  function setupCloseHandlers() {
    const closeButton = modalElement.querySelector('.big-picture__cancel');

    function closeModal() {
      modalElement.classList.add('hidden');
      pageBody.classList.remove('modal-open');
      document.removeEventListener('keydown', handleEscKey);
      closeButton.removeEventListener('click', closeModal);
    }

    function handleEscKey(evt) {
      if (evt.key === 'Escape') {
        closeModal();
      }
    }

    closeButton.addEventListener('click', closeModal);
    document.addEventListener('keydown', handleEscKey);
  }

  function addEventListeners() {
    loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);
  }

  function openBigPicture(picture) {
    populatePhotoDetails();
    renderComments();
    addEventListeners();

    modalElement.classList.remove('hidden');
    pageBody.classList.add('modal-open');
    setupCloseHandlers();
  }

  loadCommentsButton.addEventListener('click', onLoadCommentsButtonClick);

  openBigPicture(photoData);
}
