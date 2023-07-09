$(function () {
  var cityName = $(".cityName");
  var userInputEl = $("#username");
  var currentdateEl = $(".currentDate");
  var today = dayjs();
  $(currentdateEl).text(today.format("(" + "MMMM D, YYYY" + ")"));
  var tomorrowEl = $(".tomorrow");
  var tomorrowDateEl = today.add(1, 'day');
  $(tomorrowEl).text(tomorrowDateEl.format("MMMM D, YYYY"));
  var tomorrow1El = $(".tomorrow1");
  var tomorrow1DateEl = today.add(2, 'day');
  $(tomorrow1El).text(tomorrow1DateEl.format("MMMM D, YYYY"));
  var tomorrow2El = $(".tomorrow2");
  var tomorrow2DateEl = today.add(3, 'day');
  $(tomorrow2El).text(tomorrow2DateEl.format("MMMM D, YYYY"));
  var tomorrow3El = $(".tomorrow3");
  var tomorrow3DateEl = today.add(4, 'day');
  $(tomorrow3El).text(tomorrow3DateEl.format("MMMM D, YYYY"));
  var tomorrow4El = $(".tomorrow4");
  var tomorrow4DateEl = today.add(5, 'day');
  $(tomorrow4El).text(tomorrow4DateEl.format("MMMM D, YYYY"));
  var searchedCityList = $("#city-container");
 
 
  var formSubmitHandler = function (event) {
    event.preventDefault();
    var userInputCity = userInputEl.val().trim();
    var userInputCitySplit = userInputCity.split(',');
    getWeather(userInputCitySplit);
    saveLastCity(userInputCity);
    renderLastCity();
  }

  function init(){
    renderLastCity();
  }
  
  function renderLastCity(){
    var storedCities = JSON.parse(localStorage.getItem("lastCity"));
    if (storedCities !==null) {
      var button = document.createElement("button");
      $(button).text(storedCities);
      $(button).addClass("storedButtons");
var cityContainerEl = document.getElementById("city-container");
cityContainerEl.appendChild(button);
    }
    else {
      return;
    }
  }

  function saveLastCity(userInputCity) {
    var lastCity = [];
    localStorage.setItem("lastCity", JSON.stringify(userInputCity));
  }

  // function init() {
  //   var storedCities = JSON.parse(localStorage.getItem("lastCity"));
  //   if (storedCities !== null) {
  //     userInputCity = storedCities;
  //     renderLastCity(storedCities);
  //   }
  // }

  // function renderLastCity(storedCities) {
  //   searchedCityList.text("");
  //   for (var i = 0; i < storedCities.length; i++) {
  //     var city = storedCities[i];
  //     var li = document.createElement("li");
  //     // var button = document.createElement("button");
  //     $(li).text(city);
  //     $(ulEl).append(li);
  //     // $(li).append(button);
  //   }
  // }


   function getWeather(userInputCitySplit) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInputCitySplit[0] + "," + userInputCitySplit[1] + ',US&appid=9588c7ff15ac40484250f9fa0859fc87';

    fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var latEl = data[0].lat;
        var lonEl = data[0].lon;
        var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latEl + "&lon=" + lonEl + "&appid=9588c7ff15ac40484250f9fa0859fc87";
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            $(cityName).text(data.city.name);
            // var tempInF = (((data.list[0].main.temp)-273.15)*9/5+32);
            console.log(data);
            console.log(data.list[0].main.temp);
            $(".todayTemp").text("Temp: " + (((data.list[0].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".todayWind").text("Wind: " + (data.list[0].wind.speed).toFixed(2) + " MPH");
            $(".todayHumidity").text("Humidity: " + (data.list[0].main.humidity) + " %");

            $(".tomorrowTemp").text("Temp: " + (((data.list[8].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrowWind").text("Wind: " + (data.list[8].wind.speed).toFixed(2) + " MPH");
            $(".tomorrowHumidity").text("Humidity: " + (data.list[8].main.humidity) + " %");

            $(".tomorrow1Temp").text("Temp: " + (((data.list[16].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow1Wind").text("Wind: " + (data.list[16].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow1Humidity").text("Humidity: " + (data.list[16].main.humidity) + " %");

            $(".tomorrow2Temp").text("Temp: " + (((data.list[24].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow2Wind").text("Wind: " + (data.list[24].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow2Humidity").text("Humidity: " + (data.list[24].main.humidity) + " %");

            $(".tomorrow3Temp").text("Temp: " + (((data.list[32].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow3Wind").text("Wind: " + (data.list[32].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow3Humidity").text("Humidity: " + (data.list[32].main.humidity) + " %");

            $(".tomorrow4Temp").text("Temp: " + (((data.list[39].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow4Wind").text("Wind: " + (data.list[39].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow4Humidity").text("Humidity: " + (data.list[39].main.humidity) + " %");
          });
      });
  }
  init();
  $(".submitButton").on("click", formSubmitHandler);
});