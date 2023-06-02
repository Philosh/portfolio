const BigNumber = require("bignumber.js");

const validateData = (dataArr) => {
  return dataArr.every((data) => {
    return data;
  });
};

const validateIsWholeNum = (dataArr) => {
  return dataArr.every((data) => {
    return !/\D/.test(data);
  });
};

// Threshold Inclusive
const validateThreshold = (
  dataArr,
  lowT = -Number.MAX_VALUE,
  highT = Number.MAX_VALUE
) => {
  const sortedData = dataArr.sort((a, b) => {
    return a - b;
  });
  return sortedData[0] >= lowT && sortedData[sortedData.length - 1] <= highT;
};

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

const task1 = (a, b) => {
  const isValidData = validateData([a, b]);
  if (!isValidData) {
    console.log("Data is not valid", a, b);
    throw new Error(
      "Data is not valid. Please enter whole numbers between 2 and 100 inclusive."
    );
  }

  const isWholeNum = validateIsWholeNum([a, b]);

  if (!isWholeNum) {
    console.log("Data is not a whole number", a, b);
    throw new Error(
      "Data is not a whole number. Please enter whole numbers between 2 and 100 inclusive."
    );
  }

  const isWithinRange = validateThreshold([a, b], 2, 100);

  if (!isWithinRange) {
    console.log("Out of range", a, b);
    throw new Error(
      "Data is out of range. Please enter whole numbers between 2 and 100 inclusive."
    );
  }

  const validData = strToWholeNum([a, b]).sort((a, b) => a - b);
  const combinations = [];

  for (let i = validData[0]; i <= validData[1]; i++) {
    for (let j = validData[0]; j <= validData[1]; j++) {
      combinations.push(Math.pow(i, j));
    }
  }

  const uniqueItems = combinations
    .filter((item, idx) => combinations.indexOf(item) === idx)
    .sort((a, b) => a - b);

  return uniqueItems.length;
};

const task2 = (maxN) => {
  const isWithinRange = validateThreshold([maxN], 2, 100000);

  if (!isWithinRange) {
    console.log("Out of range");
    throw new Error(
      "The upper limit is out of range. Please enter a number between 2 and 100000"
    );
  }
  const maxPrime = maxN;
  const primeList = getPrimeNums(maxPrime);

  const iterateSum = (n) => {
    let found = false;
    for (let i = 0; primeList[i] <= n; i++) {
      const sumNum = primeList[i];
      for (let j = 0; sumNum + 2 * Math.pow(j, 2) <= n; j++) {
        const sum = sumNum + 2 * Math.pow(j, 2);
        if (sum === n) {
          console.log("this number does have a sum", n);
          console.log("the sum is", sumNum + "+" + "2 * " + j + "^2 = " + sum);
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
    }
    if (!found) {
      console.log("this number does not have a sum", n);
    }
    return found;
  };

  for (let i = 2; i <= maxN; i++) {
    const isComposite = !primeList.includes(i);
    const isOdd = i % 2 !== 0;
    if (!isOdd || !isComposite) {
      continue;
    }

    const found = iterateSum(i);
    if (!found) {
      console.log("The number without sum is", i);
      break;
    }
  }
  return primeList;
};

const task3 = (nMax) => {
  let sum = 0;

  for (let i = 1; i <= nMax; i++) {
    const sqrt = Math.sqrt(i);
    const numIsSquare = Math.ceil(sqrt) === Math.floor(sqrt);
    if (numIsSquare) {
      continue;
    }
    BigNumber.config({ DECIMAL_PLACES: 110 });
    const bigN = new BigNumber(i);
    const preciseSqrt = bigN.sqrt();
    const decimals = preciseSqrt.c
      .slice(1)
      .reduce((acc, value) => acc + value, "");

    console.log("prevDec", decimals);

    console.log(decimals.substring(0, 99));

    let decimalSum = 0;
    for (let i = 0; i < 98; i++) {
      const decimalInt = Number(decimals.charAt(i));
      decimalSum += decimalInt;
    }
    console.log("sqrt of ", i, " = ", preciseSqrt);
    console.log("decimals", decimals);
    return decimalSum;
  }
};

module.exports = {
  task1,
  task2,
  task3,
};
/* GET users listing. */

// router.get("/", function (req, res, next) {
//   const answer1 = task1(2, "100");
//   console.log("answer1", answer1);

//   //const answer2 = task2(10000);
//   //console.log("answer2", answer2);

//   const answer3 = task3(2);
//   console.log("answer3", answer3);
// });

// module.exports = router;
