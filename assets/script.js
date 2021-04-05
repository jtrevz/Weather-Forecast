var nameRender = document.getElementById("cityname");
var mainTemp = document.getElementById("maintemp");
var mainwind =document.getElementById("mainwind")
var mainhumid = document.getElementById("mainhumid");
var uv = document.getElementById("uv");

var submitcity = document.getElementById("submitcity");
var searchBtn = document.getElementById("searchBtn")

var sidebar = document.getElementById("sidebar")

var lon ;
var lat ;
var city ;
var totalBtnsArray = [];

searchBtn.addEventListener('click', getFirstApi)

function getFirstApi(){
    var tempcity = submitcity.value.trim();
    var firstRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${tempcity}&units=imperial&appid=653c3d756cdb491e49246259dd8b749c`

    fetch (firstRequestUrl)
    .then (function(response){
        return response.json();
    })
    .then(function(data){
        city = data.name
        var cityT= {
                lon: data.coord.lon, 
                lat: data.coord.lat,
            }
        lon = data.coord.lon
        lat = data.coord.lat
        var cityBtn = document.createElement("button");
        cityBtn.textContent = data.name;
        sidebar.append(cityBtn);
        cityBtn.classList.add('allbuttons',"btn", "btn-lg", 'btn-block');
        cityBtn.setAttribute("value", city)
        totalBtnsArray.push(city)
        console.log(city);
        localStorage.setItem(city, JSON.stringify(cityT))
        localStorage.setItem("count", JSON.stringify(totalBtnsArray))
    })
}

function initial () {
    var stored = JSON.parse(localStorage.getItem("count"))
    if (stored.length === 0) {
        return
    } else {
    totalBtnsArray = JSON.parse(localStorage.getItem("count"))
    for( i = 0 ; i < totalBtnsArray.length; i++) {
        var initialBtn = document.createElement('button');
        initialBtn.textContent= totalBtnsArray[i];
        sidebar.append(initialBtn);
        initialBtn.classList.add("allbuttons", "btn", "btn-lg", "btn-block")
        initialBtn.setAttribute("value", totalBtnsArray[i])
    }}
}

var allBtns = document.querySelectorAll("allbuttons")


$(document).on('click', '.allbuttons', getLocation);

function getLocation(event){
    event.preventDefault();

    console.log("I just got clicked")
    console.log("event.target:", event.target)
    console.log(event.target.value);
    
    city = event.target.value 

    var storedPlace = JSON.parse(localStorage.getItem(city))

    console.log(storedPlace);

    lat = storedPlace.lat
    lon = storedPlace.lon
    console.log(lat, lon);
    renderCityTemp()
}


initial()

var dailytemps = document.getElementsByClassName('daytemp');
var dailywind = document.getElementsByClassName('daywind');
var dailyhumid = document.getElementsByClassName('dayhumid');

console.log(dailytemps);
console.log(dailywind);
console.log(dailywind);

function renderCityTemp() {

    var renderUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,alerts&appid=653c3d756cdb491e49246259dd8b749c`

    fetch (renderUrl)
    .then (function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        nameRender.textContent = city;
        mainTemp.textContent = data.current.temp;
        mainwind.textContent = data.current.wind_speed;
        mainhumid.textContent = data.current.humidity;
        // uv.textContent=data.current.uvi; come back to this***************
        for (i = 0; i < dailytemps.length; i++){
            dailytemps[i].textContent = data.daily[i].temp.day;
            dailywind[i].textContent = data.daily[i].wind_speed;
            dailyhumid[i].textContent = data.daily[i].humidity;
        }
    })
}

// how to add to existing tags with text
// var paragraph = document.getElementById("p");
// var text = document.createTextNode("This just got added");

// paragraph.appendChild(text);

// also have appendchild texts for celsius and percentages in the end

