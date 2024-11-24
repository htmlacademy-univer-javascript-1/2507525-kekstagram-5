import { generatePhotos } from './data.mjs';
import { renderPhotos } from './renderPhotos.mjs';

const photos = generatePhotos();
renderPhotos(photos);
