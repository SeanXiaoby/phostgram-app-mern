const getTimeDiff = (date) => {
  const timeDiff = Math.abs(new Date().getTime() - date.getTime());
  const oneYear = 1000 * 60 * 60 * 24 * 365;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const oneDay = 1000 * 60 * 60 * 24;
  const oneHour = 1000 * 60 * 60;

  if (timeDiff >= oneYear) {
    return `${Math.floor(timeDiff / oneYear)} years ago`;
  } else if (timeDiff >= oneWeek) {
    return `${Math.floor(timeDiff / oneWeek)} weeks  ago`;
  } else if (timeDiff >= oneDay) {
    return `${Math.floor(timeDiff / oneDay)} days  ago`;
  } else {
    return `${Math.floor(timeDiff / oneHour)} hours  ago`;
  }
};

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 去掉小于10的前导零
  const formattedMonth = month < 10 ? month.toString().substr(0, 1) : month;
  const formattedDay = day < 10 ? day.toString().substr(0, 1) : day;
  const formattedHours = hours < 10 ? "0" + hours : hours;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

  return `${year}.${formattedMonth}.${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export { getTimeDiff, formatDate };
