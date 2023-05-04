function sortByIsoDate(arr) {
  arr.sort(function (a, b) {
    return new Date(b.created_at) - new Date(a.created_at);
  });
  return arr;
}

module.exports = { sortByIsoDate };
