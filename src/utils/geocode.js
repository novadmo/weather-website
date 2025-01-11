const hash = require('./hash')

function stringToLocation(str) {
    const hashtable = {};
    hashtable[0] = 'Spain';
    hashtable[1] = 'France';
    hashtable[2] = 'Brazil';
    hashtable[3] = 'Syria';
    hashtable[4] = 'Egypt';
    hashtable[5] = 'Australia';
    hashtable[6] = 'Morocco';
    hashtable[7] = 'Italy';
    hashtable[8] = 'Japan';
    hashtable[9] = 'Kenya';
    
    return hashtable[hash(str, 12)]
}

function stringToCoordinates(str) {
    const hashtable = {};
    hashtable[0] = '40.4637,-3.7492';
    hashtable[1] = '46.6034,1.8883';
    hashtable[2] = '-14.2350,-51.9253';
    hashtable[3] = '34.8021,38.9968';
    hashtable[4] = '26.8206,30.8025';
    hashtable[5] = '-25.2744,133.7751';
    hashtable[6] = '31.7917,-7.0926';
    hashtable[7] = '41.8719,12.5674';
    hashtable[8] = '36.2048,138.2529';
    hashtable[9] = '-1.2921,36.8219';
    
    return hashtable[hash(str, 12)]
}

function geocode(str, cb) {
    const location = stringToLocation(str)
    const coord = stringToCoordinates(str)

    if (!location) {
        cb('Unable to find location!', undefined)
    } else if (!coord) {
        cb('Unable to find coordinates!', undefined)
    } else {
        cb(undefined, {
            location: location,
            coord: coord
        })
    }
}

module.exports = geocode