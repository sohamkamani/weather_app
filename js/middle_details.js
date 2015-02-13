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
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function show() {
    var city = getUrlVars()["city"]
    var temperature_display = document.getElementById("temperature-display")
    var status_display = document.getElementById("status-display")
    var sunrise_display = document.getElementById("sunrise-display")
    var sunset_display = document.getElementById("sunset-display")
    var wind_display = document.getElementById("wind-display")
    var humidity_display = document.getElementById("humidity-display")
    var weather_picture = document.getElementById("weather-picture")
    var city_name = document.getElementById("city-name")

    getJSON("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json").then(setData, function(status) {
        alert('Something went wrong.');
    });

    function setData (data_raw) {
        var data = data_raw['query']['results']['channel']
        setDataTop(data);
        setDataBottom(data)
    }

    function setDataTop(data) {
        var weather_status = data['item']['condition']['text'];
        temperature_display.innerHTML = far_to_deg(data['item']['condition']['temp']);
        status_display.innerHTML = weather_status;
        sunrise_display.innerHTML = data['astronomy']['sunrise'];
        sunset_display.innerHTML = data['astronomy']['sunset'];
        wind_display.innerHTML = data['wind']['speed'] + data['units']['speed'];
        humidity_display.innerHTML =data['atmosphere']['humidity'] + "%";
        weather_picture.setAttribute("src",get_icon_for(weather_status.toLowerCase()));
    }

    function setDataBottom(data){
        var result = document.getElementById("result1");
        var texts;
        var image = document.getElementById("img1");
        var high = document.getElementById("high1");
        var low = document.getElementById("low1");
        result.innerHTML = data.item.forecast[0].day;
        high.innerHTML = far_to_deg(data.item.forecast[0].high);
        low.innerHTML = far_to_deg(data.item.forecast[0].low);
        texts = data.item.forecast[0].text;
        image.setAttribute("src",get_icon_for(texts.toLowerCase()));
        result = document.getElementById("result2");
        image = document.getElementById("img2");
        high = document.getElementById("high2");
        low = document.getElementById("low2");
        result.innerHTML = data.item.forecast[1].day;
        high.innerHTML = far_to_deg(data.item.forecast[1].high);
        low.innerHTML = far_to_deg(data.item.forecast[1].low);
        texts = data.item.forecast[1].text;
        image.setAttribute("src",get_icon_for(texts.toLowerCase()));
        result = document.getElementById("result3");
        image = document.getElementById("img3");
        high = document.getElementById("high3");
        low = document.getElementById("low3");
        result.innerHTML = data.item.forecast[2].day;
        high.innerHTML = far_to_deg(data.item.forecast[2].high);
        low.innerHTML = far_to_deg(data.item.forecast[2].low);
        texts = data.item.forecast[2].text;
        image.setAttribute("src",get_icon_for(texts.toLowerCase()));
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
    show_bottom();
}
