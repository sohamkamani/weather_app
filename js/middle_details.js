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
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    return vars;
}


function show() {
    var city = getUrlVars()["city"]
    var temperatureDisplay = document.getElementById("temperature-display")
    var statusDisplay = document.getElementById("status-display")
    var sunriseDisplay = document.getElementById("sunrise-display")
    var sunsetDisplay = document.getElementById("sunset-display")
    var windDisplay = document.getElementById("wind-display")
    var humidityDisplay = document.getElementById("humidity-display")
    var weather_picture = document.getElementById("weather-picture")
    var city_name = document.getElementById("city-name")

    getJSON("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json").then(setData, function(status) {
        alert('Something went wrong.');
    });

    function setData(data_raw) {
        var data = data_raw['query']['results']['channel']
        setTodayData(data);
        setForecastDataOfElement(data, 0);
        setForecastDataOfElement(data, 1);
        setForecastDataOfElement(data, 2);
    }

    function setTodayData(data) {

        cityName = data['location']['city'] + ", " + data['location']['country'];
        city_name.innerHTML = cityName
        var weather_status = data['item']['condition']['text'];
        temperatureDisplay.innerHTML = farToCel(data['item']['condition']['temp']);
        statusDisplay.innerHTML = weather_status;
        sunriseDisplay.innerHTML = data['astronomy']['sunrise'];
        sunsetDisplay.innerHTML = data['astronomy']['sunset'];
        windDisplay.innerHTML = data['wind']['speed'] + data['units']['speed'];
        humidityDisplay.innerHTML =data['atmosphere']['humidity'] + "%";
        weather_picture.setAttribute("src",get_icon_for(weather_status.toLowerCase()));
        document.getElementById("container").style.backgroundImage="url('images/"+get_image_for(weather_status.toLowerCase())+".jpg')"

}

    function setForecastDataOfElement(data, element) {
        var result = document.getElementById("result" + element);
        var texts;
        var image = document.getElementById("img" + element);
        var high = document.getElementById("high" + element);
        var low = document.getElementById("low" + element);
        result.innerHTML = data.item.forecast[element].day;
        high.innerHTML = farToCel(data.item.forecast[element].high);
        low.innerHTML = farToCel(data.item.forecast[element].low);
        texts = data.item.forecast[element].text;
        image.setAttribute("src", get_icon_for(texts.toLowerCase()));
    }

}

function farToCel(f) {
    var c = (f - 32) * 5 / 9;
    return c.toFixed(1);
}

function celToFar(c) {
    var f = (c*9)/5 + 32;
    return f.toFixed(1);
}

function get_icon_for(weather_text) {
    if (weather_text.indexOf('sun') > -1 || weather_text.indexOf('hot') > -1) {
        return "SVG/Sun.svg"
    } else if (weather_text.indexOf('rain') > -1) {
        return "SVG/Cloud-Rain.svg"
    } else if (weather_text.indexOf('snow') > -1) {
        return "SVG/Cloud-Snow.svg"
    } else if (weather_text.indexOf('fog') > -1 || weather_text.indexOf('haze') > -1) {
        return "SVG/Cloud-Fog-Alt.svg"
    } else if (weather_text.indexOf('fair') > -1 || weather_text.indexOf('clear') > -1) {
        return "SVG/Sun-Low.svg"
    } else if (weather_text.indexOf('wind') > -1) {
        return "SVG/Cloud-Wind.svg"
    } else {
        return "SVG/Cloud.svg"
    }
}

function get_image_for(weather_text) {
    if (weather_text.indexOf('sun') > -1 || weather_text.indexOf('hot') > -1) {
        return "sunny"
    } else if (weather_text.indexOf('rain') > -1) {
        return "rainy"
    } else if (weather_text.indexOf('snow') > -1) {
        return "snow"
    } else if (weather_text.indexOf('fog') > -1 || weather_text.indexOf('haze') > -1) {
        return "fog"

    } else if (weather_text.indexOf('fair') > -1 || weather_text.indexOf('clear') > -1) {
        return "clear"
    } else if (weather_text.indexOf('wind') > -1) {
        return "windy"
    } else {
        return "cloud"
    }
}

function callalert() {
    alert("More information is not available");
}

function call() {
    alert("Click above for more info");
}

function init() {
    var colorArray={
                        "sunny":["#FFF9C4", "#FFEE58", "#FFF176", "#FFF59D"],
                        
                        "clear":["#C8E6C9", "#66BB6A", "#81C784", "#A5D6A7"],

                        "cloud":["#F5F5F5", "#BDBDBD", "#E0E0E0", "#EEEEEE"],
                        
                        "fog":["#f0f4c3", "#d4e157", "#dce775", "#e6ee9c"],
                        
                        "rainy":["#B2EBF2", "#26C6DA", "#4DD0E1", "#80DEEA"],
                        
                        "snow":["#E8EAF6", "#7986CB", "#9FA8DA", "#C5CAE9"],
                        
                        "windy":["#DCEDC8", "#9CCC65", "#AED581", "#C5E1A5"]
                        };
    show();

    var temperature = document.getElementById("temperature-display")
    var cel = document.getElementById("deg-c")
    var far = document.getElementById("deg-f")
    cel.onclick = null;
    far.onclick = farClick

    function farClick () {
        newTemperature = document.createTextNode(celToFar(temperature.innerHTML))
        temperature.removeChild(temperature.firstChild)
        temperature.appendChild(newTemperature)
        far.onclick = null
        far.style.color = "#000"
        cel.onclick = celClick
        cel.style.color = "#CCC"
    }

    function celClick () {
        newTemperature = document.createTextNode(farToCel(temperature.innerHTML))
        temperature.removeChild(temperature.firstChild)
        temperature.appendChild(newTemperature)
        far.onclick = farClick
        far.style.color = "#CCC"
        cel.onclick = null
        cel.style.color = "#000"
    }
}
