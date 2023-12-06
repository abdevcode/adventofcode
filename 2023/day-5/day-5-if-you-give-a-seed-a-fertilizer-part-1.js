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

    map.set('seeds', [])
    map.set('seed-to-soil', [])
    map.set('soil-to-fertilizer', [])
    map.set('fertilizer-to-water', [])
    map.set('water-to-light', [])
    map.set('light-to-temperature', [])
    map.set('temperature-to-humidity', [])
    map.set('humidity-to-location', [])

    let key = 'seeds'

    for await (const line of file) {
        if (line) {
            if (line.startsWith('seeds')) { map.set('seeds', line.match(/\d+/g).map(value => parseInt(value))) }
            else if (line.startsWith('seed-to-soil')) { key = 'seed-to-soil' }
            else if (line.startsWith('soil-to-fertilizer')) { key = 'soil-to-fertilizer' }
            else if (line.startsWith('fertilizer-to-water')) { key = 'fertilizer-to-water' }
            else if (line.startsWith('water-to-light')) { key = 'water-to-light' }
            else if (line.startsWith('light-to-temperature')) { key = 'light-to-temperature' }
            else if (line.startsWith('temperature-to-humidity')) { key = 'temperature-to-humidity' }
            else if (line.startsWith('humidity-to-location')) { key = 'humidity-to-location' }
            else {
                const [ destination_range_start, source_range_start, range_length ] = line.match(/\d+/g)

                map.get(key).push( {
                    'destination_range_start': parseInt(destination_range_start),
                    'source_range_start': parseInt(source_range_start),
                    'range_length': parseInt(range_length)
                } )
            }
        }
    }


    const between = (value, start, end) => {
        return value >= start && value < end
    }

    const getCorrespondingNumber = (value, map) => {
        for (const ranges of map) {
            if ( between(value, ranges.source_range_start, ranges.source_range_start + ranges.range_length) ) {
                return ranges.destination_range_start + (value - ranges.source_range_start)
            }
        }

        return value
    }

    const convertNumbers = (source, map) => {
        let destination = []

        for (const value of source) {
            destination.push( getCorrespondingNumber(value, map) )
        }

        return destination
    }

    const seeds = map.get('seeds')

    const seedToSoil = map.get('seed-to-soil')
    const soils = convertNumbers(seeds, seedToSoil)

    const soilToFertilizer = map.get('soil-to-fertilizer')
    const fertilizers = convertNumbers(soils, soilToFertilizer)

    const fertilizerToWater = map.get('fertilizer-to-water')
    const water = convertNumbers(fertilizers, fertilizerToWater)

    const waterToLight = map.get('water-to-light')
    const light = convertNumbers(water, waterToLight)

    const lightToTemperature = map.get('light-to-temperature')
    const temperature = convertNumbers(light, lightToTemperature)

    const temperatureToHumidity = map.get('temperature-to-humidity')
    const humidity = convertNumbers(temperature, temperatureToHumidity)

    const humidityToLocation = map.get('humidity-to-location')
    const location = convertNumbers(humidity, humidityToLocation)

    console.log(Math.min(...location))
}

run();



