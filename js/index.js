//last 4 items are add to demo the error prevention
var cities = [{
    name: "Bangalore",
    url: "flags/india.jpeg"
}, {
    name: "London",
    url: "flags/london.jpg"
}, {
    name: "Monaco",
    url: "flags/monaco.jpg"
}, {
    name: "New york",
    url: "flags/nyc.jpeg"
}, {
    name: "Mumbai",
    url: "flags/india.jpeg"
}, {
    name: "Paris",
    url: "flags/paris.jpeg"
}, {
    name: "Rio",
    url: "flags/rio.jpg"
}, {
    name: "Sydney",
    url: "flags/sydney.jpg"
}, {
    name: "Tokyo",
    url: "flags/tokyo.jpeg"
}, {
    name: "Washington D.C.",
    url: "flags/nyc.jpeg"
}];


//this function create each <li> node
<<<<<<< HEAD
var createListNode = function (city) {

   // we will simply return is object if item is not correct
   var failResponse = {
       success: false,
       message: '| ' + JSON.stringify(city) + ' | is not a valid item, hence skipping!'
   };
=======
var createListNode = function(city) {
    // we will simply return is object if item is not correct
    var failResponse = {
        success: false,
        message: '| ' + JSON.stringify(city) + ' | is not a valid item, hence skipping!'
    };
>>>>>>> 79cc8e99ec6f8f2fe4b9b5465786c7b0c1c0a7cb

    // cheching for correct data  type
    if (city !== null && typeof city === 'object') {
        //checking if required keys are available
        if (city.hasOwnProperty('name') && (city.hasOwnProperty('url'))) {
            var li = document.createElement('li'),
                image = document.createElement('img'),
                url = document.createTextNode(city.url),
                nameSpan = document.createElement('span'),
                cityName = document.createTextNode(city.name);

<<<<<<< HEAD
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

=======
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
>>>>>>> 79cc8e99ec6f8f2fe4b9b5465786c7b0c1c0a7cb
};

var docFrag = document.createDocumentFragment();

for (var i = 0, len = cities.length; i < len; i++) {
<<<<<<< HEAD

   var li = createListNode(cities[i]);
   if (!li.success) {
       console.info(li.message);
   } else {
       docFrag.appendChild(li.node);
   }
=======
    var li = createListNode(cities[i]);
    if (!li.success) {
        console.info(li.message);
    } else {
        docFrag.appendChild(li.node);
    }
>>>>>>> 79cc8e99ec6f8f2fe4b9b5465786c7b0c1c0a7cb
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
<<<<<<< HEAD
function redirect(){
    window.location='details.html?city=' + this.id;
}
=======
>>>>>>> 79cc8e99ec6f8f2fe4b9b5465786c7b0c1c0a7cb
