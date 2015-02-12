window.onload = init

var yqlCallback = function(data) {
    var wind = data.query.results.channel.wind;
    alert(wind.chill);
};
var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
};

function show() {
    var city = "bangalore"
    var temperature_display = document.getElementById("temperature-display")
    var status_display = document.getElementById("status-display")
    var sunrise_display = document.getElementById("sunrise-display")
    var sunset_display = document.getElementById("sunset-display")
    var wind_display = document.getElementById("wind-display")
    var humidity_display = document.getElementById("humidity-display")

    getJSON("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json").then(function(data) {
        temperature_display.innerHTML = far_to_deg(data['query']['results']['channel']['item']['condition']['temp']);
        status_display.innerHTML = data['query']['results']['channel']['item']['condition']['text'];
        sunrise_display.innerHTML = data['query']['results']['channel']['astronomy']['sunrise'];
        sunset_display.innerHTML = data['query']['results']['channel']['astronomy']['sunset'];
        wind_display.innerHTML = data['query']['results']['channel']['wind']['speed'] + data['query']['results']['channel']['units']['speed'];
        humidity_display.innerHTML =data['query']['results']['channel']['atmosphere']['humidity'] + "%";
    }, function(status) {
        alert('Something went wrong.');
    });

}

function far_to_deg(f){
    var c = (f-32)*5/9;
    return Math.round(c);
}

function init() {
    show();
}
