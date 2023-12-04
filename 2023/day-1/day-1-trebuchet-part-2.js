const fs = require('node:fs');
const readline = require('node:readline');

const filename = 'input.txt'
const validDigits = []
validDigits['one'] = 1
validDigits['two'] = 2
validDigits['three'] = 3
validDigits['four'] = 4
validDigits['five'] = 5
validDigits['six'] = 6
validDigits['seven'] = 7
validDigits['eight'] = 8
validDigits['nine'] = 9

const fileStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const regDigit = /\d|one|two|three|four|five|six|seven|eight|nine/g;
const calibrationValues = []
rl.on('line', (line) => {
    const values = line.match(regDigit)
    let firstDigit = (validDigits[values[0]] ?? values[0])
    let lastDigit = (validDigits[values[values.length-1]] ?? values[values.length-1])
    calibrationValues.push(`${firstDigit}${lastDigit}`)
});

rl.on('close', () => {
    const result = calibrationValues.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0)

    console.log(result);
});
