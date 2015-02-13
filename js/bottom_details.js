window.onload = init

function callalert(){
    alert("More information is not available");
}

function call(){
    alert("Click above for more info");
}
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

function show_bottom() {
    var city = "bangalore";


    getJSON("https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" + city + "')&format=json").then(function(data) {
        var result = document.getElementById("result1");
        var texts;
        var image = document.getElementById("img1");
        var high = document.getElementById("high1");
        var low = document.getElementById("low1");
        result.innerHTML = data.query.results.channel.item.forecast[0].day;
        high.innerHTML = data.query.results.channel.item.forecast[0].high;
        low.innerHTML = data.query.results.channel.item.forecast[0].low;
        texts = data.query.results.channel.item.forecast[0].text;
        if (texts.match("Cloudy")) {
            image.src = "Cloud.svg";
        } else if (texts.match("Sunny") || texts.match("Hot")) {
            image.src = "Sun.svg";
        } else if (texts.match("Rain")) {
            image.src = "Cloud-Rain.svg";
        } else if (texts.match("Snow")) {
            image.src = "Cloud-Snow.svg";
        } else if (texts.match("Fog")) {
            image.src = "Cloud-Fog-Alt.svg";
        } else if (texts.match("Fair") || texts.match("Clear")) {
            image.src = "Sun-Low.svg";
        } else if (texts.match("Wind")) {
            image.src = "Cloud-Wind.svg";
        } else if (texts.match("Haze")) {
            image.src = "Cloud-Hail-Alt.svg";
        } else {
            image.src = "Cloud.svg";
        }
        var result = document.getElementById("result2");
        var image = document.getElementById("img2");
        var high = document.getElementById("high2");
        var low = document.getElementById("low2");
        result.innerHTML = data.query.results.channel.item.forecast[1].day;
        high.innerHTML = data.query.results.channel.item.forecast[1].high;
        low.innerHTML = data.query.results.channel.item.forecast[1].low;
        texts = data.query.results.channel.item.forecast[1].text;
        if (texts.match("Cloudy")) {
            image.src = "Cloud.svg";
        } else if (texts.match("Sunny") || texts.match("Hot")) {
            image.src = "Sun.svg";
        } else if (texts.match("Rain")) {
            image.src = "Cloud-Rain.svg";
        } else if (texts.match("Snow")) {
            image.src = "Cloud-Snow.svg";
        } else if (texts.match("Fog")) {
            image.src = "Cloud-Fog-Alt.svg";
        } else if (texts.match("Fair") || texts.match("Clear")) {
            image.src = "Sun-Low.svg";
        } else if (texts.match("Wind")) {
            image.src = "Cloud-Wind.svg";
        } else if (texts.match("Haze")) {
            image.src = "Cloud-Hail-Alt.svg";
        } else {
            image.src = "Cloud.svg";
        }
        var result = document.getElementById("result3");
        var image = document.getElementById("img3");
        var high = document.getElementById("high3");
        var low = document.getElementById("low3");
        result.innerHTML = data.query.results.channel.item.forecast[2].day;
        high.innerHTML = data.query.results.channel.item.forecast[2].high;
        low.innerHTML = data.query.results.channel.item.forecast[2].low;
        texts = data.query.results.channel.item.forecast[2].text;
        if (texts.match("Cloudy")) {
            image.src = "Cloud.svg";
        } else if (texts.match("Sunny") || texts.match("Hot")) {
            image.src = "Sun.svg";
        } else if (texts.match("Rain")) {
            image.src = "Cloud-Rain.svg";
        } else if (texts.match("Snow")) {
            image.src = "Cloud-Snow.svg";
        } else if (texts.match("Fog")) {
            image.src = "Cloud-Fog-Alt.svg";
        } else if (texts.match("Fair") || texts.match("Clear")) {
            image.src = "Sun-Low.svg";
        } else if (texts.match("Wind")) {
            image.src = "Cloud-Wind.svg";
        } else if (texts.match("Haze")) {
            image.src = "Cloud-Hail-Alt.svg";
        } else {
            image.src = "Cloud.svg";
        }

    }, function(status) {
        alert('Something went wrong.');
    });
}

function init() {
    show();
}
