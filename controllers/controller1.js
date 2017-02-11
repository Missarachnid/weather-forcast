
"use strict";

angular.module('myapp')
  .controller("WeatherController", function($scope, $http){
    $scope.location = {};
    $scope.weather = {};
    $scope.cityForecast = "";
    //if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
     
      function startForecast(){
    //function onPositionUpdate(position) {
      //var lati = position.coords.latitude;
      //var longi = position.coords.longitude;
      /*var url = 'https://api.wunderground.com/api/4a82154c39d11213/conditions/geolocation/q/' + lati + ',' + longi + '.json';*/
     // var url = 'https://api.wunderground.com/api/4a82154c39d11213/geolookup/q/' + lati + ',' + longi + '.json';
      var url = "https://api.wunderground.com/api/4a82154c39d11213/forecast/q/autoip.json";
      $http.get(url)
        .then(function(info) {
          console.log(info);
          $scope.location.city = info.data.location.city;
          $scope.location.state = info.data.location.nearby_weather_stations.state;
          $scope.location.country = info.data.country;
          $scope.retrieveCity($scope.location.country, $scope.location.state, $scope.location.city)
      
        });
    //}
    /*$scope.retrieveCity = function(country, state, city){
     city = city.replace(" ", "_");
      
     if(country === "US"){
       $scope.cityForecast = 'https://api.wunderground.com/api/4a82154c39d11213/forecast/q/' + state + "/" + city + ".json";
     }else{
        $scope.cityForecast = 'https://api.wunderground.com/api/4a82154c39d11213/forecast/q/' + country + "/" + city + ".json";
     }
     $http.get($scope.cityForecast)
      .then(function(data){
       console.log(data);
     });*/
     
      
   };
  
  });
  
