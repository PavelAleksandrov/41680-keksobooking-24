const getRandomNumber = (from, to) => {
  from = Math.floor(from);
  to = Math.ceil(to);
  if (from < 0 || to < 0) {
    // console.log('Ошибка, значения диапазона не могут быть отрицательными.');
    return;
  }
  if (to <= from) {
    // console.log('Ошибка, значение диапазона "до" меньше или равно значению "от".');
    return;
  }
  // console.log(Math.floor(Math.random() * (to - from + 1) + from));
  // eslint-disable-next-line no-undef
  return math.random(to, from);
};

getRandomNumber(1, 5);

// eslint-disable-next-line no-undef
const getRandomNumberWithDec = (from, to, decimal) => math.random(from, to).toFixed(decimal);

getRandomNumberWithDec(0, 50, 5);
