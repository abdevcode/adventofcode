const fs = require('node:fs');
const readline = require('node:readline');

const run = async () => {
    const filename = 'input.txt'
    const fileStream = fs.createReadStream(filename);

    const file = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let map = new Map();

    for await (const line of file) {
        if (line.startsWith('Time')) map.set('times', line.match(/\d+/g).map(value => parseInt(value)))
        if (line.startsWith('Distance')) map.set('distances', line.match(/\d+/g).map(value => parseInt(value)))
    }

    const getVelocity = (holdingTime) => {
        return holdingTime
    }
    
    const getDistance = (velocity, time) => {
        return time * velocity
    }
    
    const times = map.get('times')
    const distances = map.get('distances')
    let waysToWin = []

    for (let i = 0; i < times.length; i++) {
        let time = times[i]
        let recordDistance = distances[i]

        let totalWins = 0
        for (let holdingTime = 0; holdingTime <= time; holdingTime++) {
            let raceDistance = getDistance(getVelocity(holdingTime), time - holdingTime)

            if ( raceDistance > recordDistance) ++totalWins
        }

        waysToWin.push(totalWins)
    }

    const result = waysToWin.reduce((accumulator, currentValue) => accumulator * currentValue, 1)

    console.log(waysToWin, result);
}

run();