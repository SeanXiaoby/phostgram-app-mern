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

export { getTimeDiff };
