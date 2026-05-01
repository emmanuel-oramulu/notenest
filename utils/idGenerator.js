const generateId = (arr) => {
  const maxId = arr.reduce((max, item) =>
    Math.max(max, item.id), 0);
  return maxId + 1;
};

module.exports = generateId;