const fs = require('node:fs');
const readline = require('node:readline');

const filename = 'input.txt'

const fileStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const powers = []

rl.on('line', (line) => {
    const [ game, subsets ] = line.split(':')
    const [ _, gameID] = game.trim().split(' ')

    const sets = subsets.split(';')

    const colorCubeCounter = {
        'red': 0,
        'green': 0,
        'blue': 0,
    }

    for (set of sets) {
        const setCubes = set.split(',')

        for (setCube of setCubes) {
            const [ quantity, color ] = setCube.trim().split(' ')

            if (parseInt(quantity) > colorCubeCounter[color]) colorCubeCounter[color] = parseInt(quantity)
        }
    }

    const power = colorCubeCounter.red * colorCubeCounter.green * colorCubeCounter.blue
    powers.push(power)
});

rl.on('close', () => {
    const result = powers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    console.log(powers, result);
});
