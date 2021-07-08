export function transformTitle(word: string) {
  const upperCaseChar = word.charAt(0).toUpperCase() + word.slice(1);
  return upperCaseChar.concat('', 's');
}
