export const getLeftTime = (difference: number) => {
  const diff = difference < 0 ? 0 : difference;
  const secondInMs = Math.floor(diff / 1000);
  const minutesInMs = Math.floor(secondInMs / 60);
  const hoursInMs = Math.floor(minutesInMs / 60);
  const days = Math.floor(hoursInMs / 24);

  const seconds = secondInMs % 60;
  const minutes = minutesInMs % 60;
  const hours = hoursInMs % 24;

  const daysStr = `${days < 10 ? `0${days}` : days}`;
  const hoursStr = `${hours < 10 ? `0${hours}` : hours}`;
  const minutesStr = `${minutes < 10 ? `0${minutes}` : minutes}`;
  const secondsStr = `${seconds < 10 ? `0${seconds}` : seconds}`;

  return {
    daysStr,
    hoursStr,
    minutesStr,
    secondsStr,
  };
};