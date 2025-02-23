export function formatDateString(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-based month
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

export default formatDateString;
