export function displayFullPhoto(photoData) {
  const modalElement = document.querySelector('.big-picture');
  const pageBody = document.querySelector('body');

  function populatePhotoDetails() {
    const imgElement = modalElement.querySelector('.big-picture__img img');
    imgElement.src = photoData.url;
    imgElement.alt = photoData.description;

    modalElement.querySelector('.likes-count').textContent = photoData.likes;
    modalElement.querySelector('.comments-count').textContent = photoData.comments.length;
    modalElement.querySelector('.social__caption').textContent = photoData.description;
  }

  function renderComments() {
    const commentsList = modalElement.querySelector('.social__comments');
    commentsList.textContent = '';

    photoData.comments.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = 'social__comment';

      listItem.innerHTML = `
        <img class="social__picture" src="${item.avatar}" alt="${item.name}" width="35" height="35">
        <p class="social__text">${item.message}</p>
      `;
      commentsList.appendChild(listItem);
    });
  }

  function hideCommentControls() {
    modalElement.querySelector('.social__comment-count').style.display = 'none';
    modalElement.querySelector('.comments-loader').style.display = 'none';
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

  populatePhotoDetails();
  renderComments();
  hideCommentControls();

  modalElement.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  setupCloseHandlers();
}
