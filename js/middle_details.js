window.onload = init

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
    var city = "lucknow"
    var temperature_display = document.getElementById("temperature-display")
    var status_display = document.getElementById("status-display")
    var sunrise_display = document.getElementById("sunrise-display")
    var sunset_display = document.getElementById("sunset-display")
    var wind_display = document.getElementById("wind-display")
    var humidity_display = document.getElementById("humidity-display")
    var weather_picture = document.getElementById("weather-picture")

    getJSON("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json").then(setData, function(status) {
        alert('Something went wrong.');
    });

    function setData(data) {
        var weather_status = data['query']['results']['channel']['item']['condition']['text'];
        temperature_display.innerHTML = far_to_deg(data['query']['results']['channel']['item']['condition']['temp']);
        status_display.innerHTML = weather_status;
        sunrise_display.innerHTML = data['query']['results']['channel']['astronomy']['sunrise'];
        sunset_display.innerHTML = data['query']['results']['channel']['astronomy']['sunset'];
        wind_display.innerHTML = data['query']['results']['channel']['wind']['speed'] + data['query']['results']['channel']['units']['speed'];
        humidity_display.innerHTML =data['query']['results']['channel']['atmosphere']['humidity'] + "%";
        weather_picture.setAttribute("src",get_icon_for(weather_status.toLowerCase()));
    }

}

function far_to_deg(f){
    var c = (f-32)*5/9;
    return Math.round(c);
}

function get_icon_for(weather_text){
    if(weather_text.indexOf('sun') > -1 || weather_text.indexOf('hot') > -1){
        return "SVG/Sun.svg"
    }
    else if(weather_text.indexOf('rain') > -1){
        return "SVG/Cloud-Rain.svg"
    }
    else if(weather_text.indexOf('snow') > -1){
        return "SVG/Cloud-Snow.svg"
    }
    else if(weather_text.indexOf('fog') > -1 || weather_text.indexOf('haze') > -1){
        return "SVG/Cloud-Fog-Alt.svg"
    }
    else if(weather_text.indexOf('fair') > -1 || weather_text.indexOf('clear') > -1){
        return "SVG/Sun-Low.svg"
    }
    else if(weather_text.indexOf('wind') > -1){
        return "SVG/Cloud-Wind.svg"
    }
    else{
        return "SVG/Cloud.svg"
    }
}

function init() {
    show();
}
