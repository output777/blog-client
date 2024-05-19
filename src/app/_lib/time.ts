function toKST(date: Date) {
  const KST_OFFSET = 9 * 60 * 60 * 1000; // 한국 시간은 UTC+9
  return new Date(date.getTime() + KST_OFFSET);
}

export function timeAgo(inputTime: string) {
  const now = toKST(new Date()); // 현재 시간 KST로 변환
  const time = toKST(new Date(inputTime)); // 입력 시간 UTC로 해석 후 KST로 변환

  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  } else if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  } else {
    return `${diffInSeconds}초 전`;
  }
}

export function regTime(inputTime: string) {
  const time = toKST(new Date(inputTime)); // 입력 시간을 KST로 변환
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const date = String(time.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${date}`;
}

export function regFullTime(inputTime: string) {
  const time = toKST(new Date(inputTime)); // 입력 시간을 KST로 변환
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const date = String(time.getDate()).padStart(2, '0');
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  return `${year}. ${month}. ${date}. ${hours}:${minutes}`;
}
