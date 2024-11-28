import { getRandomInt } from './util.mjs';
import { useNumbersImage } from './constants.mjs';
import { generateComment } from './comments.mjs';

export function generatePhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    let randomNumberImage;
    do {
      randomNumberImage = getRandomInt(1, 25);
    } while (useNumbersImage.includes(randomNumberImage));
    useNumbersImage.push(randomNumberImage);

    const photo = {
      id: i,
      url: `photos/${randomNumberImage}.jpg`,
      description: `Описание фотографии ${i}`,
      likes: getRandomInt(15, 200),
      comments: generateComment(),
    };
    photos.push(photo);
  }

  return photos;
}
