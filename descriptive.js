class StatsCalc {
  constructor(dataSet) {
    this.dataSet = dataSet;
  }

  mean() {
    let sum = 0;
    for (let i = 0; i < this.dataSet.length; i++) {
      sum += this.dataSet[i];
    }
    return sum / this.dataSet.length;
  }

  median() {
    const sortedDataSet = this.dataSet.slice().sort((a, b) => a - b);
    const isEven = sortedDataSet.length % 2 === 0;

    if (isEven) {
      const middle1 = sortedDataSet.length / 2 - 1;
      const middle2 = sortedDataSet.length / 2;
      return (sortedDataSet[middle1] + sortedDataSet[middle2]) / 2;
    } else {
      const middle = Math.floor(sortedDataSet.length / 2);
      return sortedDataSet[middle];
    }
  }

  mode() {
    const frequencyMap = new Map();

    for (const value of this.dataSet) {
      frequencyMap.set(value, (frequencyMap.get(value) || 0) + 1);
    }

    let maxFrequency = 0;
    let modes = [];

    frequencyMap.forEach((frequency, value) => {
      if (frequency > maxFrequency) {
        maxFrequency = frequency;
        modes = [value];
      } else if (frequency === maxFrequency) {
        modes.push(value);
      }
    });

    return modes;
  }

  range() {
    const sortedDataSet = this.dataSet.slice().sort((a, b) => a - b);
    return sortedDataSet[sortedDataSet.length - 1] - sortedDataSet[0];
  }

  variance() {
    const meanValue = this.mean();
    const squaredDifferences = this.dataSet.map((value) =>
      Math.pow(value - meanValue, 2)
    );
    return (
      squaredDifferences.reduce((acc, value) => acc + value, 0) /
      this.dataSet.length
    );
  }

  standardDeviation() {
    return Math.sqrt(this.variance());
  }

  quartiles() {
    const sortedDataSet = this.dataSet.slice().sort((a, b) => a - b);
    const Q1 = this.median(
      sortedDataSet.slice(0, Math.floor(sortedDataSet.length / 2))
    );
    const Q2 = this.median(sortedDataSet);
    const Q3 = this.median(
      sortedDataSet.slice(Math.ceil(sortedDataSet.length / 2))
    );
    return { Q1, Q2, Q3 };
  }

  interquartileRange() {
    const { Q1, Q3 } = this.quartiles();
    return Q3 - Q1;
  }
}

const dataSet = [55, 45, 35, 65, 25, 75, 85, 95, 55, 75, 35];
const stats = new StatsCalc(dataSet);

let mean = stats.mean();
let median = stats.median();
let modes = stats.mode();
let dataRange = stats.range();
let dataVariance = stats.variance();
let standardDev = stats.standardDeviation();
let quartiles = stats.quartiles();
let interquartileRange = stats.interquartileRange();

console.log("Mean:", mean);
console.log("Median:", median);
console.log("Mode:", modes);
console.log("Range:", dataRange);
console.log("Variance:", dataVariance);
console.log("Standard Deviation:", standardDev);
console.log("Quartiles:", quartiles);
console.log("Interquartile Range:", interquartileRange);
