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

  var formSubmitHandler = function (event) {
    event.preventDefault();
    // console.log(userInputEl);
    var userInputCity = userInputEl.val().trim();
    var userInputCitySplit = userInputCity.split(',');
    getWeather(userInputCitySplit);
    saveLastCity(userInputCity);
    renderLastCity();
  }

  function init() {
    renderLastCity();
  }
  
  function renderLastCity() {
    var storedCities = JSON.parse(localStorage.getItem("lastCity"));
    if (storedCities !== null) {
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
  
  // var userInputCitySplit;
  function handleButtons(event){
var btnClicked = $(event.target);
console.log(btnClicked);
console.log(btnClicked[0].innerHTML);
var contents = btnClicked[0].innerHTML;
// $(userInputEl).text(contents);
// getWeather(userInputCitySplit);
  }




  function saveLastCity(userInputCity) {
    var lastCity = [];
    localStorage.setItem("lastCity", JSON.stringify(userInputCity));
  }

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
            console.log(data.list[0].main.temp);
            $(".todayTemp").text("Temp: " + (((data.list[0].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".todayWind").text("Wind: " + (data.list[0].wind.speed).toFixed(2) + " MPH");
            $(".todayHumidity").text("Humidity: " + (data.list[0].main.humidity) + " %");
            var iconCode = data.list[0].weather[0].icon;
            console.log(data.list[0].weather[0].icon);
            var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
            $("#wicon").attr("src", iconUrl);

            $(".tomorrowTemp").text("Temp: " + (((data.list[8].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrowWind").text("Wind: " + (data.list[8].wind.speed).toFixed(2) + " MPH");
            $(".tomorrowHumidity").text("Humidity: " + (data.list[8].main.humidity) + " %");
            var ticonCode = data.list[8].weather[0].icon;
            var ticonUrl = "https://openweathermap.org/img/wn/" + ticonCode + "@2x.png";
            $("#twicon").attr("src", ticonUrl);

            $(".tomorrow1Temp").text("Temp: " + (((data.list[16].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow1Wind").text("Wind: " + (data.list[16].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow1Humidity").text("Humidity: " + (data.list[16].main.humidity) + " %");
            var t1iconCode = data.list[16].weather[0].icon;
            var t1iconUrl = "https://openweathermap.org/img/wn/" + t1iconCode + "@2x.png";
            $("#t1wicon").attr("src", t1iconUrl);

            $(".tomorrow2Temp").text("Temp: " + (((data.list[24].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow2Wind").text("Wind: " + (data.list[24].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow2Humidity").text("Humidity: " + (data.list[24].main.humidity) + " %");
            var t2iconCode = data.list[24].weather[0].icon;
            var t2iconUrl = "https://openweathermap.org/img/wn/" + t2iconCode + "@2x.png";
            $("#t2wicon").attr("src", t2iconUrl);

            $(".tomorrow3Temp").text("Temp: " + (((data.list[32].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow3Wind").text("Wind: " + (data.list[32].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow3Humidity").text("Humidity: " + (data.list[32].main.humidity) + " %");
            var t3iconCode = data.list[32].weather[0].icon;
            var t3iconUrl = "https://openweathermap.org/img/wn/" + t3iconCode + "@2x.png";
            $("#t3wicon").attr("src", t3iconUrl);

            $(".tomorrow4Temp").text("Temp: " + (((data.list[39].main.temp) - 273.15) * 9 / 5 + 32).toFixed(2) + " °F");
            $(".tomorrow4Wind").text("Wind: " + (data.list[39].wind.speed).toFixed(2) + " MPH");
            $(".tomorrow4Humidity").text("Humidity: " + (data.list[39].main.humidity) + " %");
            var t4iconCode = data.list[39].weather[0].icon;
            var t4iconUrl = "https://openweathermap.org/img/wn/" + t4iconCode + "@2x.png";
            $("#t4wicon").attr("src", t4iconUrl);
          });
      });
  }

  init();
  $(".submitButton").on("click", formSubmitHandler);
 $("#city-container").on("click", "button", handleButtons);
});