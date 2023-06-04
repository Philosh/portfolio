// Utilities functions for tasks
//Add any utility funtion here
const strToWholeNum = (dataArr) => {
  return dataArr.map((data) => {
    return Math.floor(data);
  });
};

const getPrimeNums = (max) => {
  let sieve = [],
    i,
    j,
    primes = [];
  for (i = 2; i <= max; ++i) {
    if (!sieve[i]) {
      // i has not been marked -- it is prime
      primes.push(i);
      for (j = i << 1; j <= max; j += i) {
        sieve[j] = true;
      }
    }
  }
  return primes;
};

//////

module.exports = {
  strToWholeNum,
  getPrimeNums,
};
