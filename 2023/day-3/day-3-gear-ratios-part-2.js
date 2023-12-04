const fs = require('node:fs');
const readline = require('node:readline');

const isNumber = (value) => {
    return !isNaN(value)
}

const getChunk = (start, end, line) => {
    let chunk = line.substring(start, end)

    if (isNumber(chunk.at(0))) {
        let char = line.at(--start)
        while (start >= 0 && isNumber(char)) {
            chunk = char + chunk

            char = line.at(--start)
        }
    }

    if (isNumber(chunk.at( -1))) {
        let char = line.at(end++)
        while (end <= line.length && isNumber(char)) {
            chunk = chunk + char

            char = line.at(end++)
        }
    }

    return chunk
}

const getSurroundedByTwoNumbers = (value, prevLine, actLine, nextLine) => {
    const index = actLine.indexOf(value)
    const length = value.length

    const startPos = Math.max(0, index - 1)
    const endPos = index + length + 1

    const p = getChunk(startPos, endPos, prevLine)
    const a = getChunk(startPos, endPos, actLine)
    const n = getChunk(startPos, endPos, nextLine)

    const numbers = [p, a, n].join('.').match(/\d+/g) ?? []

    if (numbers.length === 2) {
        return numbers.reduce((accumulator, currentValue) => accumulator * parseInt(currentValue), 1)
    }

    return 0
}

const run = async () => {
    const filename = 'input.txt'
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const gearRatios = []

    let prevLine = ''
    let actLine = ''
    let nextLine = ''

    for await (const line of rl) {
        prevLine = actLine
        actLine = nextLine
        nextLine = line

        const values = actLine.match(/\*/g) ?? []

        for (const value of values) {
            let gearRatio = getSurroundedByTwoNumbers(value, prevLine, actLine, nextLine)

            if (gearRatio) gearRatios.push(gearRatio)

            // if (!isSurroundedBySymbol(value, prevLine, actLine, nextLine)) {
            //     printSurrounding(value, prevLine, actLine, nextLine)
            // }

            // Remove value from line
            actLine = actLine.replace(value, '.'.repeat(value.length))
        }

        nextLine = line
    }

    const result = gearRatios.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(result)
}

run();