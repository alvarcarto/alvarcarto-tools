const { URL } = require('url');
const queryString = require('query-string');

const urls = [
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A1%2C%22quantity%22%3A1%2C%22mapCenter%22%3A%7B%22lat%22%3A37.71750400999666%2C%22lng%22%3A-122.43953704833986%7D%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A37.55981972178119%2C%22lng%22%3A-122.58888244628908%7D%2C%22northEast%22%3A%7B%22lat%22%3A37.87485339352928%2C%22lng%22%3A-122.29019165039064%7D%7D%2C%22mapZoom%22%3A11%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22San%20Francisco%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelText%22%3A%2237.718%C2%B0N%20%2F%20122.440%C2%B0W%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%7D%5D',
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A1%2C%22quantity%22%3A1%2C%22mapCenter%22%3A%7B%22lat%22%3A25.752280195982966%2C%22lng%22%3A-80.20397186279297%7D%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A25.572794938341026%2C%22lng%22%3A-80.3533172607422%7D%2C%22northEast%22%3A%7B%22lat%22%3A25.931494634888555%2C%22lng%22%3A-80.05462646484375%7D%7D%2C%22mapZoom%22%3A11%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22Miami%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelText%22%3A%2225.752%C2%B0N%20%2F%2080.204%C2%B0W%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%7D%5D',
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A1%2C%22quantity%22%3A1%2C%22mapCenter%22%3A%7B%22lat%22%3A33.83734207824605%2C%22lng%22%3A-118.24653625488283%7D%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A33.505904166596224%2C%22lng%22%3A-118.54522705078126%7D%2C%22northEast%22%3A%7B%22lat%22%3A34.16749965237792%2C%22lng%22%3A-117.94784545898439%7D%7D%2C%22mapZoom%22%3A10%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22Los%20Angeles%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelText%22%3A%2233.837%C2%B0N%20%2F%20118.247%C2%B0W%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%7D%5D',
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A2%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A35.75226668128908%2C%22lng%22%3A-115.47765125379836%7D%2C%22northEast%22%3A%7B%22lat%22%3A36.45817007130838%2C%22lng%22%3A-114.82195058392799%7D%7D%2C%22quantity%22%3A1%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22Las%20Vegas%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%2C%22mapCenter%22%3A%7B%22lat%22%3A36.106011286834146%2C%22lng%22%3A-115.14980091886319%7D%2C%22mapZoom%22%3A10.75%2C%22labelText%22%3A%2236.106%C2%B0N%20%2F%20115.150%C2%B0W%22%7D%5D&updateCart=true',
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A1%2C%22quantity%22%3A1%2C%22mapCenter%22%3A%7B%22lat%22%3A40.731593995634576%2C%22lng%22%3A-73.98941047187324%7D%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A40.64181167759613%2C%22lng%22%3A-74.07821177679033%7D%2C%22northEast%22%3A%7B%22lat%22%3A40.82125533059564%2C%22lng%22%3A-73.90060916695619%7D%7D%2C%22mapZoom%22%3A11.75%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22New%20York%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelText%22%3A%2240.732%C2%B0N%20%2F%2073.989%C2%B0W%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%7D%5D',
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A1%2C%22quantity%22%3A1%2C%22mapCenter%22%3A%7B%22lat%22%3A41.80949178673976%2C%22lng%22%3A-87.59457890039427%7D%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A41.388314649815%2C%22lng%22%3A-88.01699147490984%7D%2C%22northEast%22%3A%7B%22lat%22%3A42.22791791822217%2C%22lng%22%3A-87.1721663258787%7D%7D%2C%22mapZoom%22%3A9.5%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22Chicago%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelText%22%3A%2241.809%C2%B0N%20%2F%2087.595%C2%B0W%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%7D%5D',
'https://design.alvarcarto.com/?cart=%5B%7B%22id%22%3A1%2C%22quantity%22%3A1%2C%22mapCenter%22%3A%7B%22lat%22%3A38.865481958386916%2C%22lng%22%3A-77.0172145537013%7D%2C%22mapBounds%22%3A%7B%22southWest%22%3A%7B%22lat%22%3A38.74590725803894%2C%22lng%22%3A-77.13226105460565%7D%2C%22northEast%22%3A%7B%22lat%22%3A38.984855883875206%2C%22lng%22%3A-76.90216805279691%7D%7D%2C%22mapZoom%22%3A12.25%2C%22mapStyle%22%3A%22bw%22%2C%22posterStyle%22%3A%22classic%22%2C%22mapPitch%22%3A0%2C%22mapBearing%22%3A0%2C%22orientation%22%3A%22portrait%22%2C%22size%22%3A%2218x24inch%22%2C%22labelsEnabled%22%3Atrue%2C%22labelHeader%22%3A%22Washington%22%2C%22labelSmallHeader%22%3A%22United%20States%22%2C%22labelText%22%3A%2238.865%C2%B0N%20%2F%2077.017%C2%B0W%22%2C%22labelTextManual%22%3Anull%2C%22autoUpdateCoordinates%22%3Atrue%7D%5D&updateCart=true',
]

urls.forEach(u => {
  const url = new URL(u);
  const cart = JSON.parse(url.searchParams.get('cart'))

  const item = cart[0];
  const newParams = {
    lat: item.mapCenter.lat,
    lng: item.mapCenter.lng,
    labelHeader: item.labelHeader,
    labelSmallHeader: item.labelSmallHeader,
    labelText: item.labelText,
    labelsEnabled: item.labelsEnabled,
    mapStyle: item.mapStyle,
    orientation: item.orientation,
    posterStyle: item.posterStyle,
    size: item.size,
    updateCoords: item.autoUpdateCoordinates,
    zoom: item.mapZoom,
  };
  console.log(item.labelHeader)
  console.log(`https://design.alvarcarto.com?${queryString.stringify(newParams)}`);
})
