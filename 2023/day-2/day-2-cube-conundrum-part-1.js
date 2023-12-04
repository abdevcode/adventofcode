const fs = require('node:fs');
const readline = require('node:readline');

const filename = 'input.txt'

const fileStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const validGames = []

const totalCubes = {
    'red': 12,
    'green': 13,
    'blue': 14,
}

const checkQuantity = (color, quantity) => {
    return totalCubes[color] >= quantity
}

const checkSets = (subsets) => {
    const sets = subsets.split(';')

    for (set of sets) {
        const setCubes = set.split(',')

        for (setCube of setCubes) {
            const [ quantity, color ] = setCube.trim().split(' ')

            if (!checkQuantity(color, quantity)) return false
        }
    }

    return true
}

rl.on('line', (line) => {
    const [ game, subsets ] = line.split(':')
    const [ _, gameID] = game.trim().split(' ')

    if (checkSets(subsets)) {
        validGames.push(gameID)
    }
});

rl.on('close', () => {
    const result = validGames.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0)

    console.log(validGames, result);
});
