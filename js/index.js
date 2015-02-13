//last 4 items are add to demo the error prevention
var city = [{
  city: "Banglore"
}, {
    city: "london"
},
{
    city: "Monaco"
},
{
    city: "New york"
},
{
    city: "London"
},
{
    city: "London"
},
{
    city: "London"
},
{
    city: "London"
},
{
    city: "London"
},
{
    city: "London"
},

true, 1, "", null, {}];


//this function create each <li> node
var createListNode = function (item) {
    // we will simply return is object if item is not correct
    var failResponse = {
        success: false,
        message: '| ' + JSON.stringify(item) + ' | is not a valid item, hence skipping!'
    };

    // cheching for correct data  type
    if (item !== null && typeof item === 'object') {
        //checking if required keys are available
        if (item.hasOwnProperty('name') && item.hasOwnProperty('surname')) {
            var li = document.createElement('li'),
                nameSpan = document.createElement('span'),
                nameText = document.createTextNode(item.name),
                surnameSpan = document.createElement('span'),
                surnameText = document.createTextNode(item.surname);

            li.setAttribute('class', 'item');
            nameSpan.setAttribute('class', 'name');
            surnameSpan.setAttribute('class', 'surname');

            li.appendChild(nameSpan.appendChild(nameText));
            li.appendChild(surnameSpan.appendChild(surnameText));
            
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

for (var i = 0, len = items.length; i < len; i++) {
    var li = createListNode(items[i]);
    if (!li.success) {
        console.info(li.message);
    } else {
        docFrag.appendChild(li.node);
    }
}

var listNode = document.getElementById('list');
listNode.appendChild(docFrag);