function redirect() {
  var city = document.getElementById("city").value;
  if (city.length < 1) {
    alert("Please enter something");
    return false;

  }
  window.location = 'details.html?city=' + city;

}
<<<<<<< HEAD
=======

>>>>>>> 5820e134e6178a762d3c1605c48870b7cd12a1fc
