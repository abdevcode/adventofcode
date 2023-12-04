const fs = require('node:fs');
const readline = require('node:readline');

const filename = 'input.txt'

const fileStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const regDigit = /\d/g;
const calibrationValues = []
rl.on('line', (line) => {
    const values = line.match(regDigit)

    calibrationValues.push(values[0] + values[values.length-1])
});

rl.on('close', () => {
    const result = calibrationValues.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0)

    console.log(result);
});