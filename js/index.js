//last 4 items are add to demo the error prevention
var cities = [{
    name: "Bangalore",
    url: "flags/india.jpg"
}, {
    name: "London",
    url: "flags/london.jpg"
}, {
    name: "Monaco",
    url: "flags/monaco.jpg"
}, {
    name: "New york",
    url: "flags/nyc.jpg"
}, {
    name: "Mumbai",
    url: "flags/india.jpg"
}, {
    name: "Paris",
    url: "flags/paris.jpg"
}, {
    name: "Rio",
    url: "flags/rio.jpg"
}, {
    name: "Sydney",
    url: "flags/sydney.jpg"
}, {
    name: "Tokyo",
    url: "flags/tokyo.jpg"
}, {
    name: "Washington D.C.",
    url: "flags/nyc.jpg"
}];


//this function create each <li> node
var createListNode = function(city) {
    // we will simply return is object if item is not correct
    var failResponse = {
        success: false,
        message: '| ' + JSON.stringify(city) + ' | is not a valid item, hence skipping!'
    };

    // cheching for correct data  type
    if (city !== null && typeof city === 'object') {
        //checking if required keys are available
        if (city.hasOwnProperty('name') && (city.hasOwnProperty('url'))) {
            var li = document.createElement('li'),
                image = document.createElement('img'),
                url = document.createTextNode(city.url),
                nameSpan = document.createElement('span'),
                cityName = document.createTextNode(city.name);

            li.setAttribute('id', city.name);
            image.setAttribute('src', city.url);

            li.appendChild(image);
            nameSpan.appendChild(cityName);
            li.appendChild(nameSpan);

            return {
                success: true,
                node: li
            }
        } else {
            return failResponse;
        }
    } else {
        return failResponse;
    }
};

var docFrag = document.createDocumentFragment();

for (var i = 0, len = cities.length; i < len; i++) {
    var li = createListNode(cities[i]);
    if (!li.success) {
        console.info(li.message);
    } else {
        docFrag.appendChild(li.node);
    }
}

var listNode = document.getElementById('city');
listNode.appendChild(docFrag);




lis = document.getElementsByTagName('li');
for (var i = 0; i < lis.length; i++) {
    lis[i].addEventListener('click', redirect, false);
}

function redirect() {
    window.location = 'details.html?city=' + this.id;
}
