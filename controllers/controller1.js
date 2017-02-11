
"use strict";

angular.module('myapp')
  .controller("WeatherController", function($scope, $http){
  
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
 
    function onPositionUpdate(position) {
      var lati = position.coords.latitude;
      var longi = position.coords.longitude;
      /*var url = 'https://api.wunderground.com/api/4a82154c39d11213/conditions/geolocation/q/' + lati + ',' + longi + '.json';*/
      var url = 'https://api.wunderground.com/api/4a82154c39d11213/forecast/geolocation/q/' + lati + ',' + longi + '.json';
      $http.get(url)
        .then(function(info) {
        console.log(info);
            
          $scope.weatherNow = {
            
          };
        
      
     });
    }
  });
  
