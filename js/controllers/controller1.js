
/*
load forcast of current location on load. Then upon submit/enter return forecast for searched city. 
Use Autocomplete API for search results. This will return a Json. list the city names from the Json, 
and attach the link associated with each city so it will load the forecast from that city. Populate new 
forecast into cards.
*/

"use strict";

angular.module('myapp')
  .controller("WeatherController", function($scope, $http){
    //$scope.forecastDay = [];
    //$scope.forecastNight = [];
    $scope.forecast = [];
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
     
     
    function onPositionUpdate(position) {
      var lati = position.coords.latitude;
      var longi = position.coords.longitude;
      var url = 'https://api.wunderground.com/api/4a82154c39d11213/forecast/q/' + lati + ',' + longi + '.json';
     
      $http.get(url)
        .then(function(info) {
          //console.log(info);
          for(var i = 0; i < 8; i++){
            var item = {
              title: info.data.forecast.txt_forecast.forecastday[i].title,
              icon: info.data.forecast.txt_forecast.forecastday[i].icon_url,
              conditionsI: info.data.forecast.txt_forecast.forecastday[i].fcttext,
              conditionsM: info.data.forecast.txt_forecast.forecastday[i].fcttext_metric,
            };
            var temp = item.icon;
            icon = icon.replace("http", "https");
            item.icon = temp;
            $scope.forecast.push(item);
            
            //if(i%2 === 0){
            //  $scope.forecastDay.push(item);
            //}else{
            //  $scope.forecastNight.push(item);
            //}
        
            
            }
            //console.log($scope.forecastDay);
            //console.log($scope.forecastNight);
            console.log($scope.forecast);
      
        });
      //$scope.search = function(e){
        //e.preventDefault();
        
      //};
     
   }
  
  });
