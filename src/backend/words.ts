async function getWords(group: number, page: number) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?group=${group}&page=${page}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function chunk(start: number) {
  return { page: Math.floor(start / 20), withWord: start % 20 };
}

function countRequest(startnum: number, quantitynum: number) {
  if (startnum === quantitynum) {
    return Math.floor(quantitynum / 20);
  }
  return Math.floor(quantitynum / 20) + 1;
}

export default async (group: number, startWith: number, quantity: number) => {
  const totalWords = Array(countRequest(startWith, quantity));

  const { page, withWord } = chunk(startWith);

  for (let i = 0; i < totalWords.length; i += 1) {
    totalWords[i] = getWords(group, page + i);
  }
  const words = await (await Promise.all(totalWords)).flat();

  return words.slice(withWord, quantity + withWord);
};
