/* Rewrite code to include some success and error functions to deal with the $http requests*/
'use strict';

angular.module("myapp", [])
  .controller("WeatherController", function($scope, $http){
    $scope.forecast = [];
    $scope.current = {};
    $scope.city = ""; 
    $scope.load = false;
    var main = document.getElementById("mainBody");
    var loader = document.getElementById("loader");
    
    
    $scope.loader =  function(){
        setTimeout(function(){
            main.style.visibility = "visible";
            loader.style.visibility = "hidden";
        }, 6000);
    };
    $scope.loader();
    
    function onPositionUpdate(position) {
      var lati = position.coords.latitude;
      var longi = position.coords.longitude;
      var url = "https://api.wunderground.com/api/4a82154c39d11213/conditions/forecast/q/" + lati + "," + longi + ".json";
     
      $http.get(url)    
        .then(function(info) {
          console.log(info);
          $scope.city = info.data.current_observation.display_location.full;
          $scope.current.tempI = info.data.current_observation.temp_f;
          $scope.current.tempI = Math.round($scope.current.tempI);
          $scope.current.tempM = info.data.current_observation.temp_c;
          $scope.current.conditions = info.data.current_observation.weather;
          $scope.current.icon = info.data.current_observation.icon_url;
          $scope.current.icon = $scope.current.icon.replace("http", "https");
        
          
          for(var i = 0; i <= 4; i++){
            $scope.item = {
              day: info.data.forecast.simpleforecast.forecastday[i].date.weekday_short,
              conditions: info.data.forecast.simpleforecast.forecastday[i].conditions,
              icon: info.data.forecast.simpleforecast.forecastday[i].icon_url,
              tempHighI: info.data.forecast.simpleforecast.forecastday[i].high.fahrenheit,
              tempHighM: info.data.forecast.simpleforecast.forecastday[i].high.celsius,
              tempLowI: info.data.forecast.simpleforecast.forecastday[i].low.fahrenheit,
              tempLowM: info.data.forecast.simpleforecast.forecastday[i].low.celsius,
            };
              
            
            $scope.item.icon = $scope.item.icon.replace("http", "https");
            $scope.item.tempHighI = Math.round($scope.item.tempHighI);
            $scope.item.tempHighM = Math.round($scope.item.tempHighM);
            $scope.item.tempLowI = Math.round($scope.item.tempLowI);
            $scope.item.tempLowM = Math.round($scope.item.tempLowM);
            
            $scope.forecast.push($scope.item);
            }
            
     });
       console.log($scope.city);
       console.log($scope.forecast);
       console.log($scope.current);
       
        
  }
     
    if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(onPositionUpdate);
    }
    
    
});
