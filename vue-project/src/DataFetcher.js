
const mapquestKey = ''
const apiWeatherGovHeader = {
    method: 'GET',
    headers: new Headers({
        "Accept": "application/json",
        "Content-Type": "application/json",
        "user-agent": "MyWeatherAppForHomework:contact@gmail.com"
    })
}
export async function GetWeatherForZip(zip) {
    let latLng = await GetLatLon(zip)
    let grid = await GetGrid(latLng.lat, latLng.lng)
    return await GetWeather(grid.gridId, grid.gridX, grid.gridY)
}
export async function GetGrid(lat, lon) {
    try {
        const res = await fetch(`https://api.weather.gov/points/${lat},${lon}`)
        const resJson = await res.json();

        return {
            gridId: resJson.properties.gridId,
            gridX: resJson.properties.gridX,
            gridY: resJson.properties.gridY
        }
    } catch (err) {
        throw new Error("Could not get Grid Data")
    }
}
export async function GetWeather(gridId, gridX, gridY) {
    try {
        const res = await fetch(`https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`)
        const resJson = await res.json();
        return resJson.properties.periods
    } catch (err) {
        throw new Error("Could not get Weather Data")
    }
}
export async function GetLatLon(zip) {
    // $("button").click(function(){
    //     $.ajax({url: "demo_test.txt", success: function(result){
    //       $("#div1").html(result);
    //     }});
    //   });
    let resJson
    try {
        const res = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${mapquestKey}&location=${zip}`)
        resJson = (await res.json()).results[ 0 ].locations[ 0 ]
    } catch (err) {
        throw new Error("Could not fetch Lat/Lon Data")
    }

    if (resJson.adminArea1 != "US") {
        throw new Error("Not a US Zip")
    }

    try {
        return {
            cityName: resJson.adminArea5,
            lat: resJson.latLng.lat,
            lng: resJson.latLng.lng
        }
    } catch (err) {
        throw new Error("Could not parse Lat/Lon Data")
    }
}