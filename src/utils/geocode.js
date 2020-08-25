const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWRyaWVubmV0aWxsZXkiLCJhIjoiY2tkdXE5N29xMXUxYzM0anpmcnhzbm5zbiJ9.Tvi9VHTxFg5FOuuquIruDw&limit=1'
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('unable to connect to location services')
        } else if (body.features.length === 0) {
            callback({
                error: 'no matching locations'
            })
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode