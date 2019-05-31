const csv = require('csvtojson');

let centralLine = './api/resources/csvStations/Central Line.csv';
let centralNorthEast = './api/resources/csvStations/Central North East.csv';
let centralSouthEast = './api/resources/csvStations/Central South East.csv';
let cstToWadala = './api/resources/csvStations/CST to Wadala.csv';
let kasaraConnections = './api/resources/csvStations/Kasara Connections.csv';
let wadalaToPanvel = './api/resources/csvStations/Wadala to Panvel.csv';
let wadalaToWestern = './api/resources/csvStations/Wadala to Western.csv';
let westernLine = './api/resources/csvStations/Western Line.csv';

async function getData(filePath, avDest) {
    let jsonObj;
    jsonObj = await csv().fromFile(filePath);
    jsonObj = await removeDadarOrWadala(jsonObj);
    jsonObj.forEach(obj => {
        if (avDest === 1) {
            obj.availableDestination = ['Dadar'];
        } else if (avDest === 2) {
            obj.availableDestination = ['Wadala Road'];
        } else {
            obj.availableDestination = ['Dadar', 'Wadala Road'];
        }
    });
    return jsonObj;
}

async function removeDadarOrWadala(jsonArr) {
    for (let i = 0; i < jsonArr.length; i++) {
        if (jsonArr[i]["StationName"] === 'Dadar' || jsonArr[i]["Station Name"] === 'Wadala') {
            jsonArr.splice(i, 1);
        }
    }
    return jsonArr;
}

let x;
let onlyDadar = 1;
let onlyWadala = 2;
let both = 3;
let y = [];

async function run() {
    x = await getData(centralLine, onlyDadar);
    //console.log(x);
    y.push(x);

    x = await getData(centralNorthEast, onlyDadar);
    //console.log(x);
    y.push(x);

    x = await getData(centralSouthEast, onlyDadar);
    //console.log(x);
    y.push(x);

    x = await getData(cstToWadala, onlyWadala);
    //console.log(x);
    y.push(x);

    x = await getData(kasaraConnections, both);
    //console.log(x);
    y.push(x);

    x = await getData(wadalaToPanvel, onlyWadala);
    //console.log(x);
    y.push(x);

    x = await getData(wadalaToWestern, both);
    //console.log(x);
    y.push(x);

    x = await getData(westernLine, onlyDadar);
    //console.log(x);
    y.push(x);

    let merged = [].concat.apply([], y);
    console.log(merged);
    return merged;

    //var uniq = merged
    //    .map((one) => {
    //        return {
    //            count: 1,
    //            name: one.StationName
    //        }
    //    })
    //    .reduce((a, b) => {
    //        a[b.name] = (a[b.name] || 0) + b.count
    //        return a
    //    }, {})
    //
    //var duplicates = Object.keys(uniq).filter((a) => uniq[a] > 1)
    //
    //console.log(duplicates);
}

//run()

async function writeToFile() {
    require('fs').writeFile(

        './stations_v1.json',

        JSON.stringify(await run()),

        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );
}

writeToFile();