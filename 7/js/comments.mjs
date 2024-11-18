import { getRandomInt } from './util.mjs';
import { useNumbersID, names, comments } from './constants.mjs';

export function generateComment() {
  const commentPersons = [];

  for (let i = 1; i <= getRandomInt(1, 30); i++) {
    let newID;
    do {
      newID = getRandomInt(1, 12345);
    } while (useNumbersID.includes(newID));
    useNumbersID.push(newID);

    const commentPerson = [];
    for (let j = 1; j <= getRandomInt(1, 2); j++) {
      commentPerson.push(comments[getRandomInt(0, comments.length - 1)]);
    }

    commentPersons.push({
      id: newID,
      avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
      message: commentPerson.join(' '),
      name: names[getRandomInt(0, names.length - 1)],
    });
  }

  return commentPersons;
}
