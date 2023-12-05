const fs = require('node:fs');
const readline = require('node:readline');

const filename = 'input.txt'

const fileStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const scratchcardsWorth = []
rl.on('line', (line) => {

    const [ card, values ] = line.split(':')
    const [ winningNumbers, numbers ] = values.split('|').map(value => value.match(/\d+/g))

    let result = -1
    for (const number of numbers) {
        if ( winningNumbers.includes(number) ) result++
    }

    if (result >= 0) scratchcardsWorth.push(Math.pow(2, result))
});

rl.on('close', () => {
    const result = scratchcardsWorth.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    console.log(result);
});