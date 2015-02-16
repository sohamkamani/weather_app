//last 4 items are add to demo the error prevention
var cities = [{
    name: "Bangalore",
    url: "flags/india.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "London",
    url: "flags/london.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Monaco",
    url: "flags/monaco.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "New york",
    url: "flags/nyc.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Mumbai",
    url: "flags/india.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Paris",
    url: "flags/paris.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Rio",
    url: "flags/rio.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Sydney",
    url: "flags/sydney.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Tokyo",
    url: "flags/tokyo.jpg",
    class: "hvr-bounce-to-right"
}, {
    name: "Miami",
    url: "flags/nyc.jpg",
    class: "hvr-bounce-to-right"
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
            li.setAttribute('class', city.class);
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




