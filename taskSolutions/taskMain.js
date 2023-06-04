//Module to validate input data
const dataV = require("./dataValidation.js");

//Module to handle number with huge float point values
const BigNumber = require("bignumber.js");

//Module for simple utilities functions
const uFuncs = require("./utilitiesFunctions.js");

// Tasks Functions Starting here ///

///////////////////////////////////
//////////////////////////////////
const task1 = (a, b) => {
  const isValidData = dataV.validateData([a, b]);
  if (!isValidData) {
    throw new Error(
      "Data is not valid. Please enter whole numbers between 2 and 100 inclusive."
    );
  }

  const isWholeNum = dataV.validateIsWholeNum([a, b]);

  if (!isWholeNum) {
    throw new Error(
      "Data is not a whole number. Please enter whole numbers between 2 and 100 inclusive."
    );
  }

  const isWithinRange = dataV.validateThreshold([a, b], 2, 100);

  if (!isWithinRange) {
    throw new Error(
      "Data is out of range. Please enter whole numbers between 2 and 100 inclusive."
    );
  }

  const validData = uFuncs.strToWholeNum([a, b]).sort((a, b) => a - b);
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
  let answer = -1;
  const isWithinRange = dataV.validateThreshold([maxN], 2, 100000);

  if (!isWithinRange) {
    throw new Error(
      "The upper limit is out of range. Please enter a number between 2 and 100000"
    );
  }
  const maxPrime = maxN;
  const primeList = uFuncs.getPrimeNums(maxPrime);

  const iterateSum = (n) => {
    let found = false;
    for (let i = 0; primeList[i] <= n; i++) {
      const sumNum = primeList[i];
      for (let j = 0; sumNum + 2 * Math.pow(j, 2) <= n; j++) {
        const sum = sumNum + 2 * Math.pow(j, 2);
        if (sum === n) {
          found = true;
          break;
        }
      }
      if (found) {
        break;
      }
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
      answer = i;
      break;
    }
  }
  return answer;
};

const task3 = (nMax) => {
  const isValidData = dataV.validateData([nMax]);
  if (!isValidData) {
    throw new Error(
      "Data is not valid. Please enter natural numbers between 1 and 1000 inclusive."
    );
  }

  const isWholeNum = dataV.validateIsWholeNum([nMax]);

  if (!isWholeNum) {
    throw new Error(
      "Data is not a whole number. Please enter whole numbers between 1 and 1000 inclusive."
    );
  }

  const isWithinRange = dataV.validateThreshold([nMax], 1, 1000);

  if (!isWithinRange) {
    throw new Error(
      "Data is out of range. Please enter whole numbers between 1 and 1000 inclusive."
    );
  }

  let sum = 0;

  for (let i = 1; i <= nMax; i++) {
    const sqrt = Math.sqrt(i);
    const numIsSquare = Math.ceil(sqrt) === Math.floor(sqrt);

    //Handle in a different way if the number is q perfect square.
    if (numIsSquare) {
      continue;
    }
    BigNumber.config({ DECIMAL_PLACES: 110 });
    const bigN = new BigNumber(i);
    const preciseSqrt = bigN.sqrt();
    let decimals = preciseSqrt.c.slice(1).reduce((acc, value) => {
      value = value + "";
      if (value.length < 14) {
        value = value.padStart(14, "0");
      }
      return acc + value;
    }, "");

    //Adding the number before the decimal
    const finalDecimals = preciseSqrt.c[0].toString() + decimals;
    const nthDecimal = finalDecimals.substring(0, 100);

    let decimalSum = 0;
    for (let i = 0; i < 100; i++) {
      const decimalInt = Number(nthDecimal.charAt(i));
      decimalSum += decimalInt;
    }

    sum += decimalSum;
  }

  return sum;
};

const task4 = (nMax) => {
  const numList = [];
  const nWays = new Array(nMax + 1).fill(0);

  nWays[0] = 1;

  for (let i = 1; i < nMax + 1; i++) {
    numList.push(i);
  }

  for (let i = 0; i < numList.length - 1; i++) {
    const currentNum = numList[i];
    for (let j = 0; j < nWays.length - currentNum; j++) {
      nWays[j + currentNum] += nWays[j];
    }
  }

  return nWays[nWays.length - 1];
};

const task5 = (percent, N) => {
  let bouncyN = 0;
  N = Number.MAX_SAFE_INTEGER;
  let num = 0;
  for (let i = 1; i < N + 1; i++) {
    let hasBounced = false;
    let hasIncreased = false;
    let hasDecreased = false;

    let currentNum = i;
    let prevDigit = currentNum % 10;
    currentNum = Math.floor(currentNum / 10);

    while (currentNum !== 0 && !hasBounced) {
      let currentDigit = currentNum % 10;
      if (prevDigit > currentDigit) {
        hasIncreased = true;
      } else if (prevDigit < currentDigit) {
        hasDecreased = true;
      }

      if ((hasIncreased && hasDecreased) || hasBounced) {
        bouncyN += 1;
        hasBounced = true;
      }

      prevDigit = currentDigit;
      currentNum = Math.floor(currentNum / 10);
    }

    if ((bouncyN / i) * 100 >= percent) {
      num = i;
      break;
    }
  }
  return num;
};

const task6 = (firstP, secondP, lMax, rMax) => {
  const getEllipseSlope = (x, y) => (-4 * x) / y;
  const getNormal = (m) => 1 / -m;
  const getSlopeByPoint = (firstP, secondP) =>
    (secondP.y - firstP.y) / (secondP.x - firstP.x);
  const getAngleBySlopes = (m1, m2) => Math.atan((m1 - m2) / (1 + m1 * m2));
  const getSlopeByAngle = (ang, m) =>
    (m - Math.tan(ang)) / (m * Math.tan(ang) + 1);
  const solveForX = (a, b, c) => {
    const px = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    const nx = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);

    return [px, nx];
  };

  let n = 0;
  const isValidData = [
    firstP.x,
    firstP.y,
    secondP.x,
    secondP.y,
    lMax,
    rMax,
  ].every((n) => !isNaN(Number(n)));

  if (!isValidData) {
    throw new Error(
      "Data is not valid. Please enter whole numbers between -5 and 5 inclusive for x Co-ordinate, numbers between 15 and -15 for y Co-ordinate and -5 to 5 for the limit."
    );
  }

  const isWithinRange1 = dataV.validateThreshold(
    [firstP.x, secondP.x, lMax, rMax],
    -5,
    5
  );

  const isWithinRange2 = dataV.validateThreshold(
    [firstP.y, secondP.y],
    -15,
    15
  );

  if (!isWithinRange1 || !isWithinRange2) {
    throw new Error(
      "Data is out of range. Please enter whole numbers between -5 and 5 inclusive for x Co-ordinate, numbers between 15 and -15 for y Co-ordinate and -5 to 5 for the limit."
    );
  }

  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i++) {
    n = i;
    if (Math.abs(secondP.x) <= 0.01 && secondP.y > 0) {
      break;
    }
    const m1 = getSlopeByPoint(firstP, secondP);
    const eSlope = getEllipseSlope(secondP.x, secondP.y);
    const normal = getNormal(eSlope);
    const angle1 = getAngleBySlopes(m1, normal);
    const m2 = getSlopeByAngle(angle1, normal);

    const c = secondP.y - m2 * secondP.x;
    const x3Str = solveForX(4 + m2 * m2, 2 * c * m2, c * c - 100).sort(
      (a, b) => Math.abs(secondP.x - a) - Math.abs(secondP.x - b)
    );

    const x3 = x3Str[1];

    const y3 = m2 * x3 + c;

    const p3 = { x: x3, y: y3 };

    firstP = secondP;
    secondP = p3;
  }

  return n;
};

const task7 = () => {
  return;
};

// Tasks Functions Ending here ///

///////////////////////////////////
//////////////////////////////////

module.exports = {
  task1,
  task2,
  task3,
  task4,
  task5,
  task6,
  task7,
};
