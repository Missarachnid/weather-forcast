/* Rewrite code to include some success and error functions to deal with the $http requests*/
'use strict';

  app.controller("WeatherController", function($scope, $http){
    $scope.forecast = [];
    $scope.current = {};
    $scope.city = ""; 
    $scope.load = false;
    $scope.responseData;
    var main = document.getElementById("mainBody");
    var loader = document.getElementById("loader");
    
    //loader 
    $scope.loader =  function(){
      setTimeout(function(){
        main.style.visibility = "visible";
        loader.style.visibility = "hidden";
      }, 6000);
    };
   
    $scope.loader();
    
    //find location coordinates
    function onPositionUpdate(position) {
      var lati = position.coords.latitude;
      var longi = position.coords.longitude;
      var url = "https://api.wunderground.com/api/4a82154c39d11213/conditions/forecast/q/" + lati + "," + longi + ".json";
     
      //request current weather conditions and 4 day forecast
      $http.get(url)    
        .then(function(info) {
          $scope.responseData = info;
      })
      //put response data into variables
      .then(function(){
        console.log($scope.responseData);
        $scope.city = $scope.responseData.data.current_observation.display_location.full;
        $scope.current.tempI = $scope.responseData.data.current_observation.temp_f;
        $scope.current.tempI = Math.round($scope.current.tempI);
        $scope.current.tempM = $scope.responseData.data.current_observation.temp_c;
        $scope.current.conditions = $scope.responseData.data.current_observation.weather;
        $scope.current.icon = $scope.responseData.data.current_observation.icon_url;
        $scope.current.icon = $scope.current.icon.replace("http", "https");

        //array is created for the 4 day forecast info, to be displayed using a directive with ng-repeat 
        for(var i = 0; i < 4; i++){
          $scope.item = {
            day: $scope.responseData.data.forecast.simpleforecast.forecastday[i].date.weekday_short,
            conditions: $scope.responseData.data.forecast.simpleforecast.forecastday[i].conditions,
            icon: $scope.responseData.data.forecast.simpleforecast.forecastday[i].icon_url,
            tempHighI: $scope.responseData.data.forecast.simpleforecast.forecastday[i].high.fahrenheit,
            tempHighM: $scope.responseData.data.forecast.simpleforecast.forecastday[i].high.celsius,
            tempLowI: $scope.responseData.data.forecast.simpleforecast.forecastday[i].low.fahrenheit,
            tempLowM: $scope.responseData.data.forecast.simpleforecast.forecastday[i].low.celsius,
          };

          //replacing http with https to retrieve icons to avoid cors issues, since there is an https site. 
          //The response object has http by default
          $scope.item.icon = $scope.item.icon.replace("http", "https");
          //saving Imperial and Metric temperature data for a button added in the future.
          $scope.item.tempHighI = Math.round($scope.item.tempHighI);
          $scope.item.tempHighM = Math.round($scope.item.tempHighM);
          $scope.item.tempLowI = Math.round($scope.item.tempLowI);
          $scope.item.tempLowM = Math.round($scope.item.tempLowM);
          
          $scope.forecast.push($scope.item);
          }
            
       });
        
    }
     
    //if the geolocation data can be aquired, run the function
      if (navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(onPositionUpdate);
      }
     
});
