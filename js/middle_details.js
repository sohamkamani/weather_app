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
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function(m, key, value) {
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
  var cityNameDisplay = document.getElementById("city-name")

  var windChillDisplay = document.getElementById("wind-chill-display")
  var visibilityDisplay = document.getElementById("visibility-display")
  var windDirectionDisplay = document.getElementById("wind-direction-display")
  var pressureDisplay = document.getElementById("pressure-display")

  getJSON(
    "https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
    city + "')&format=json").then(setData, function(status) {
    window.location("error.html")
  });

  function setData(data_raw) {
    var count = data_raw['query']['count'];
    var title = data_raw['query']['results']['channel']['title'];
    if(count == 0 || title.indexOf('Error') > -1 )
    {
      window.location = 'error.html';
    }
    document.getElementById("container").style.setProperty("display", "block", "important");
    var data = data_raw['query']['results']['channel']
    setTodayData(data);
    setForecastDataOfElement(data, 0);
    setForecastDataOfElement(data, 1);
    setForecastDataOfElement(data, 2);
  }

  function setTodayData(data) {
    var temperature = farToCel(data['item']['condition']['temp']);
    var weatherStatus = data['item']['condition']['text'];
    var sunriseTime = data['astronomy']['sunrise']
    var sunsetTime = data['astronomy']['sunset']
    var windSpeed = data['wind']['speed'] + data['units']['speed']
    var humidity = data['atmosphere']['humidity'] + "%"
    var windChill = farToCel(data['wind']['chill']) 
    var visibility = data['atmosphere']['visibility']
    var windDirection = data['wind']['direction']
    var pressure = data['atmosphere']['pressure'] + data['units']['pressure']
    var cityName = data['location']['city'] + ", " + data['location']['country'];

    temperatureDisplay.replaceChild(document.createTextNode(temperature), temperatureDisplay.childNodes[0])
    statusDisplay.replaceChild(document.createTextNode(weatherStatus), statusDisplay.childNodes[0])
    sunriseDisplay.replaceChild(document.createTextNode(sunriseTime), sunriseDisplay.childNodes[0])
    sunsetDisplay.replaceChild(document.createTextNode(sunsetTime), sunsetDisplay.childNodes[0])
    windDisplay.replaceChild(document.createTextNode(windSpeed), windDisplay.childNodes[0])
    humidityDisplay.replaceChild(document.createTextNode(humidity), humidityDisplay.childNodes[0])
    cityNameDisplay.replaceChild(document.createTextNode(cityName), cityNameDisplay.childNodes[0])
    windChillDisplay.replaceChild(document.createTextNode(windChill), windChillDisplay.childNodes[0])
    visibilityDisplay.replaceChild(document.createTextNode(visibility), visibilityDisplay.childNodes[0])
    windDirectionDisplay.replaceChild(document.createTextNode(windDirection), windDirectionDisplay.childNodes[0])
    pressureDisplay.replaceChild(document.createTextNode(pressure), pressureDisplay.childNodes[0])
    weather_picture.setAttribute("src", getThemeFor(weatherStatus.toLowerCase())[
      1]);
    setColorTheme(getThemeFor(weatherStatus.toLowerCase())[2]);
    document.getElementById("container").style.backgroundImage =
      "url('images/" + getThemeFor(weatherStatus.toLowerCase())[0] +
      ".jpg')"

  }

  function setForecastDataOfElement(data, element) {
    var result = document.getElementById("result" + element);
    var image = document.getElementById("img" + element);
    var high = document.getElementById("high" + element);
    var low = document.getElementById("low" + element);
    var dayOfWeek = data.item.forecast[element].day;
    var maxTemperature = farToCel(data.item.forecast[element].high);
    var minTemperature = farToCel(data.item.forecast[element].low);
    var weatherStatus = data.item.forecast[element].text;

    result.replaceChild(document.createTextNode(dayOfWeek), result.childNodes[0])
    high.replaceChild(document.createTextNode(maxTemperature), high.childNodes[0])
    low.replaceChild(document.createTextNode(minTemperature), low.childNodes[0])
    image.setAttribute("src", getThemeFor(weatherStatus.toLowerCase())[1]);
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
  } else if (weather_text.indexOf('snow') > -1 || weather_text.indexOf('ice') > -1) {
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
  var middleSection = document.getElementById("middle-info")
  var weatherIcon = document.getElementById("weather-picture")
  var infoSection = document.getElementById("info-section")
  var footer = document.getElementById("footer")
  var hiddenList = document.getElementsByClassName("hidden-list")
  var high = [document.getElementById("high0"), document.getElementById("high1"), document.getElementById("high2")]
  var low = [document.getElementById("low0"), document.getElementById("low1"), document.getElementById("low2")]
  var highUnit = [document.getElementById("highUnit0"), document.getElementById("highUnit1"), document.getElementById("highUnit2")]
  var lowUnit = [document.getElementById("lowUnit0"), document.getElementById("lowUnit1"), document.getElementById("lowUnit2")]
  cel.onclick = null;
  far.onclick = farClick
  header.onclick = headerAnimationGoDown
  weatherIcon.onclick = middleAnimationComeOut
  infoSection.onclick = middleAnimationComeOut

  function farClick() {
    newTemperature = document.createTextNode(celToFar(temperature.innerHTML))
    temperature.replaceChild(newTemperature, temperature.childNodes[0])
    var windChillDisplay = document.getElementById("wind-chill-display")
    var windChillUnit = document.getElementById("wind-chill-unit")
    newWindChillTemperature = document.createTextNode(celToFar(windChillDisplay.innerHTML))
    windChillDisplay.replaceChild(newWindChillTemperature, windChillDisplay.childNodes[0])
    windChillUnit.replaceChild(document.createTextNode("°F"),windChillUnit.childNodes[0])
    for (i = 0; i < 3; i++) {
      highTemp = document.createTextNode(celToFar(high[i].innerHTML))
      high[i].replaceChild(highTemp, high[i].childNodes[0])
      lowTemp = document.createTextNode(celToFar(low[i].innerHTML))
      low[i].replaceChild(lowTemp, low[i].childNodes[0])
      highUnit[i].innerHTML = "&deg;F/"
      lowUnit[i].innerHTML = "&deg;F"
    }
    far.onclick = null
    far.style.color = "#000"
    cel.onclick = celClick
    cel.style.color = "#CCC"
  }

  function celClick() {
    newTemperature = document.createTextNode(farToCel(temperature.innerHTML))
    temperature.replaceChild(newTemperature, temperature.childNodes[0])
    var windChillDisplay = document.getElementById("wind-chill-display")
    var windChillUnit = document.getElementById("wind-chill-unit")
    newWindChillTemperature = document.createTextNode(farToCel(windChillDisplay.innerHTML))
    windChillDisplay.replaceChild(newWindChillTemperature, windChillDisplay.childNodes[0])
    windChillUnit.replaceChild(document.createTextNode("°C"),windChillUnit.childNodes[0])
    for (i = 0; i < 3; i++) {
      highTemp = document.createTextNode(farToCel(high[i].innerHTML))
      high[i].replaceChild(highTemp, high[i].childNodes[0])
      lowTemp = document.createTextNode(farToCel(low[i].innerHTML))
      low[i].replaceChild(lowTemp, low[i].childNodes[0])
      highUnit[i].innerHTML = "&deg;C/"
      lowUnit[i].innerHTML = "&deg;C"
    }
    far.onclick = farClick
    far.style.color = "#CCC"
    cel.onclick = null
    cel.style.color = "#000"
  }

  function headerAnimationGoDown() {
    footer.classList.remove("go-to-20")
    middleSection.classList.remove("go-to-60")
    header.classList.remove("go-to-20")
    header.classList.add("go-full")
    middleSection.classList.add("go-down")
    footer.classList.add("go-down")
    for (var i = 0; i < hiddenList.length; i++) {
      hiddenList[i].classList.remove("make-block")
    }
    header.onclick = headerAnimationGoBackUp
    weatherIcon.onclick = middleAnimationComeOut
    infoSection.onclick = middleAnimationComeOut

  }

  function headerAnimationGoBackUp() {
    header.classList.remove("go-full")
    middleSection.classList.remove("go-down")
    footer.classList.remove("go-down")
    header.onclick = headerAnimationGoDown
  }

  function middleAnimationComeOut() {
    footer.classList.add("go-to-20")
    middleSection.classList.add("go-to-60")
    header.classList.add("go-to-20")
    for (var i = 0; i < hiddenList.length; i++) {
      hiddenList[i].classList.add("make-block")
    }
    weatherIcon.onclick = middleAnimationComeBack
    infoSection.onclick = middleAnimationComeBack
  }

  function middleAnimationComeBack() {
    footer.classList.remove("go-to-20")
    middleSection.classList.remove("go-to-60")
    header.classList.remove("go-to-20")
    for (var i = 0; i < hiddenList.length; i++) {
      hiddenList[i].classList.remove("make-block")
    }
    weatherIcon.onclick = middleAnimationComeOut
    infoSection.onclick = middleAnimationComeOut
  }
}
