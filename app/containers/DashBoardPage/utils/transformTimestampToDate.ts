/**
 * @param listTimestamp Đầu vào là 1 mảng các timestamp
 * @return Trả về 1 mảng timestamp đã được convert sang định dạng YYYY.MM.DD
 */
export function transformTimestampToDate(listTimestamp: number[]) {
  return listTimestamp.map(item => {
    if (typeof item === 'number') {
      const time = new Date(item * 1000);
      return `${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()}`;
    }
  });
}
