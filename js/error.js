function redirect() {
    var city = document.getElementById("city").value;
    if (city.length < 1) {
        alert("Please enter something");
        return false;

    }
    window.location = 'details.html?city=' + city;

}
