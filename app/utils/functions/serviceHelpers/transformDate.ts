export function transformDate(date: string) {
  const currentDate = new Date(date);
  return currentDate.getFullYear() + '.' + (currentDate.getMonth() + 1) + '.' + currentDate.getDate();
}
