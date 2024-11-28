import { generatePhotos } from './data.mjs';
import { renderPhotos } from './renderPhotos.mjs';
import { initForm } from './formValidation.mjs';

const photos = generatePhotos();
renderPhotos(photos);

document.addEventListener('DOMContentLoaded', () => {
  initForm();
});
