const fs = require('node:fs');
const readline = require('node:readline');


const isSymbol = (char) => {
    return char && char !== '.'
}

const isSurroundedBySymbol = (value, prevLine, actLine, nextLine) => {
    const index = actLine.indexOf(value)
    const length = value.length

    const startPos = Math.max(0, index - 1)
    const endPos = index + length

    for (let i = startPos; i <= endPos; i++) {
        if (isSymbol(prevLine.at(i)) || isSymbol(nextLine.at(i))) return true
    }

    return ( startPos !== index && isSymbol(actLine.at(startPos)) ) || isSymbol(actLine.at(endPos))
}

const printSurrounding = (value, prevLine, actLine, nextLine) => {
    const index = actLine.indexOf(value)
    const length = value.length

    const startPos = Math.max(0, index - 1)
    const endPos = index + length + 1

    let p = prevLine.substring(startPos, endPos)
    let a = actLine.substring(startPos, endPos)
    let n = nextLine.substring(startPos, endPos)

    console.log(value, p, a, n)
    // console.log(value)
    // console.log(p)
    // console.log(a)
    // console.log(n)
    //
    // console.log()
}

const run = async () => {
    const filename = 'input.txt'
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    const engineParts = []

    let prevLine = ''
    let actLine = ''
    let nextLine = ''

    for await (const line of rl) {
        prevLine = actLine
        actLine = nextLine
        nextLine = line.replaceAll(/\d/g, '.') // Remove numbers from line

        const values = actLine.match(/\d+/g) ?? []

        for (const value of values) {
            if (isSurroundedBySymbol(value, prevLine, actLine, nextLine)) engineParts.push(parseInt(value))

            // Remove value from line to ensure that indexOf() gets the next value
            actLine = actLine.replace(value, '.'.repeat(value.length))
        }

        nextLine = line
    }

    const result = engineParts.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    console.log(result)
}

run();