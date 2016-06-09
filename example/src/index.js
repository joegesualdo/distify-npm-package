export default function({percent = 100, amount = 20} = {}) {
  const percentOff = (percent / 100) * amount;
  console.log(percentOff)
  return percentOff;
};
