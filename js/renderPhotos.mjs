export function renderPhotos(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureTemplate = document.querySelector('#picture').content;
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
}
