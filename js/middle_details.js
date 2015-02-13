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
        humidityDisplay.innerHTML = data['atmosphere']['humidity'] + "%";
        weather_picture.setAttribute("src", getThemeFor(weather_status.toLowerCase())[1]);
        setColorTheme(getThemeFor(weather_status.toLowerCase())[2]);
        document.getElementById("container").style.backgroundImage = "url('images/" + getThemeFor(weather_status.toLowerCase())[0] + ".jpg')"

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
        image.setAttribute("src", getThemeFor(texts.toLowerCase())[1]);
    }

}

function setColorTheme(colors) {
    document.getElementById("middle-info").style.backgroundColor = colors[0];
    document.getElementById("box1").style.backgroundColor = colors[1];
    document.getElementById("box2").style.backgroundColor = colors[2];
    document.getElementById("box3").style.backgroundColor = colors[3];


}

function farToCel(f) {
    var c = (f - 32) * 5 / 9;
    return c.toFixed(1);
}

function celToFar(c) {
    var f = (c * 9) / 5 + 32;
    return f.toFixed(1);
}


function getThemeFor(weather_text) {
    var colorArray = {
        "sunny": ["#FFF9C4", "#FFEE58", "#FFF176", "#FFF59D"],

        "clear": ["#C8E6C9", "#66BB6A", "#81C784", "#A5D6A7"],

        "cloud": ["#F5F5F5", "#BDBDBD", "#E0E0E0", "#EEEEEE"],

        "fog": ["#f0f4c3", "#d4e157", "#dce775", "#e6ee9c"],

        "rainy": ["#B2EBF2", "#26C6DA", "#4DD0E1", "#80DEEA"],

        "snow": ["#E8EAF6", "#7986CB", "#9FA8DA", "#C5CAE9"],

        "windy": ["#DCEDC8", "#9CCC65", "#AED581", "#C5E1A5"]
    };
    if (weather_text.indexOf('sun') > -1 || weather_text.indexOf('hot') > -1) {
        return ["sunny", "SVG/Sun.svg", colorArray["sunny"]]
    } else if (weather_text.indexOf('rain') > -1) {
        return ["rainy", "SVG/Cloud-Rain.svg", colorArray["rainy"]]
    } else if (weather_text.indexOf('snow') > -1) {
        return ["snow", "SVG/Cloud-Snow.svg", colorArray["snow"]]
    } else if (weather_text.indexOf('fog') > -1 || weather_text.indexOf('haze') > -1) {
        return ["fog", "SVG/Cloud-Fog-Alt.svg", colorArray["fog"]]

    } else if (weather_text.indexOf('fair') > -1 || weather_text.indexOf('clear') > -1) {
        return ["clear", "SVG/Sun-Low.svg", colorArray["clear"]]
    } else if (weather_text.indexOf('wind') > -1) {
        return ["windy", "SVG/Cloud-Wind.svg", colorArray["windy"]]
    } else {
        return ["cloud", "SVG/Cloud.svg", colorArray["cloud"]]
    }
}

function callalert() {
    alert("More information is not available");
}

function call() {
    alert("Click above for more info");
}

function init() {

    show();

    var temperature = document.getElementById("temperature-display")
    var cel = document.getElementById("deg-c")
    var far = document.getElementById("deg-f")
    var header = document.getElementById("header")
    cel.onclick = null;
    far.onclick = farClick
    header.onclick = headerAnimationGoDown

    function farClick() {
        newTemperature = document.createTextNode(celToFar(temperature.innerHTML))
        temperature.removeChild(temperature.firstChild)
        temperature.appendChild(newTemperature)
        far.onclick = null
        far.style.color = "#000"
        cel.onclick = celClick
        cel.style.color = "#CCC"
    }

    function celClick() {
        newTemperature = document.createTextNode(farToCel(temperature.innerHTML))
        temperature.removeChild(temperature.firstChild)
        temperature.appendChild(newTemperature)
        far.onclick = farClick
        far.style.color = "#CCC"
        cel.onclick = null
        cel.style.color = "#000"
    }

    function headerAnimationGoDown() {

        header.classList.add("go-full")
        var middleSection = document.getElementById("middle-info")
        middleSection.classList.add("go-down")
        var footer = document.getElementById("footer")
        footer.classList.add("go-down")
        header.classList.remove("go-to-40")
        middleSection.classList.remove("go-to-40")
        footer.classList.remove("go-to-20")
        header.onclick = headerAnimationGoBackUp

    }

    function headerAnimationGoBackUp() {
        header.classList.remove("go-full")
        header.classList.add("go-to-40")
        // var middleSection = document.getElementById("middle-info")
        // middleSection.classList.add("go-to-40")
        // var footer = document.getElementById("footer")
        // footer.classList.add("go-to-20")
        
        // middleSection.classList.remove("go-down")
        // footer.classList.remove("go-down")
        // header.onclick = headerAnimationGoDown
    }
}
