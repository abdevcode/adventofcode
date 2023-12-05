const fs = require('node:fs');
const readline = require('node:readline');

const filename = 'input.txt'

const fileStream = fs.createReadStream(filename);

const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

const scratchcards = new Map();
rl.on('line', (line) => {
    const [ card, values ] = line.split(':')
    const [ cardID ] = card.match(/\d+/g)
    const [ winningNumbers, numbers ] = values.split('|').map(value => value.match(/\d+/g))
    const currentCardID = parseInt(cardID)

    if ( !scratchcards.has(currentCardID) ) {
        scratchcards.set(currentCardID, {
            'quantity': 1,
        })
    } else {
        ++scratchcards.get(currentCardID).quantity
    }

    let result = 0
    for (const number of numbers) {
        if ( winningNumbers.includes(number) ) result++
    }

    const start = currentCardID + 1
    const end = start + result

    for (let id = start; id < end; id++) {
        if ( !scratchcards.has(id) ) {
            scratchcards.set(id, {
                'quantity': 1 * (scratchcards.get(currentCardID)?.quantity ?? 1),
            })
        } else {
            scratchcards.get(id).quantity += 1 * (scratchcards.get(currentCardID)?.quantity ?? 1)
        }
    }
});

rl.on('close', () => {
    let result = 0
    for (let [key, card] of scratchcards) {
        result += card.quantity
    }

    console.log(result);
});