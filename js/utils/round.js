export function round(number, decimal) {
  return Number(`${Math.round(`${number}e${decimal}`)}e-${decimal}`);
}
