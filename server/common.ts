const prefix = (number:number, standard:number) => number < standard ? `0${number}` : `${number}`; 

export const getDateStr = (input?:Date) => {
  const day = input || new Date();
  const year = day.getFullYear();
  const month = prefix(day.getMonth() + 1, 10);
  const date = prefix(day.getDate(), 10);
  
  return `${year}-${month}-${date}`;
}

export const getFullDateStr = (input?:Date) => {
  const day = input || new Date();
  const year = day.getFullYear();
  const month = prefix(day.getMonth() + 1, 10);
  const date = prefix(day.getDate(), 10);
  const hours = prefix(day.getHours(), 10);
  const minutes = prefix(day.getMinutes(), 10);

  return `${year}-${month}-${date} ${hours}:${minutes}`;
}