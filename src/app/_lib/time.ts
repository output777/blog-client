export function timeAgo(inputTime: string) {
  const now = new Date(); 
  const time = new Date(inputTime);
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
  const time = new Date(inputTime);
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const date = String(time.getDate()).padStart(2, '0');
  return `${year}. ${month}. ${date}`;
}

export function regFullTime(inputTime: string) {
  const time = new Date(inputTime);
  const year = time.getFullYear();
  const month = String(time.getMonth() + 1).padStart(2, '0');
  const date = String(time.getDate()).padStart(2, '0');
  const hours = String(time.getHours()).padStart(2, '0');
  const minutes = String(time.getMinutes()).padStart(2, '0');
  return `${year}. ${month}. ${date}. ${hours}:${minutes}`;
}
