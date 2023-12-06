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
        if (line.startsWith('Time')) map.set('time', parseInt(line.match(/\d+/g).join('')))
        if (line.startsWith('Distance')) map.set('distance', parseInt(line.match(/\d+/g).join('')))
    }

    const getVelocity = (holdingTime) => {
        return holdingTime
    }

    const getDistance = (velocity, time) => {
        return time * velocity
    }

    const raceTime = map.get('time')
    const recordDistance = map.get('distance')

    console.log(raceTime, recordDistance)

    let totalWaysToWins = 0
    for (let holdingTime = 0; holdingTime <= raceTime; holdingTime++) {
        let raceDistance = getDistance(getVelocity(holdingTime), raceTime - holdingTime)

        if ( raceDistance > recordDistance) ++totalWaysToWins
    }

    console.log(totalWaysToWins);
}

run();