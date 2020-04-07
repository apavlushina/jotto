export function getLetterMatchCount(guessedWord, secretWord) {
  const secretLetterSet = new Set(secretWord);
  const guessedLetterSet = new Set(guessedWord);
  return [...secretLetterSet].filter(letter => guessedLetterSet.has(letter))
    .length;
}
