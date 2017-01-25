
"use strict";

angular.module('myapp')
  .controller("WeatherController", function($scope, $http){
  
    $scope.loading = true;
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(onPositionUpdate);
 
    function onPositionUpdate(position) {
      var lati = position.coords.latitude;
      var longi = position.coords.longitude;
      var url = 'https://api.wunderground.com/api/4a82154c39d11213/conditions/geolocation/q/' + lati + ',' + longi + '.json';
      $http.get(url)
        .then(function(info) {
        console.log(info);
            
          $scope.weatherNow = {
            city: info.data.current_observation.display_location.city,
            description: info.data.current_observation.weather,
            temp_f: Math.round(info.data.current_observation.temp_f),
            temp_c: Math.round(info.data.current_observation.temp_c),
            temp: null,
            humidity: info.data.current_observation.relative_humidity,
            wind_mph: Math.round(info.data.current_observation.wind_mph) + "mph",
            wind_kph: Math.round(info.data.current_observation.wind_kph) + "kph",
            wind: null,
            imageSrc: info.data.current_observation.icon_url
          };
        
          var currentTime = new Date();
          var hours = currentTime.getHours();
          var minutes = currentTime.getMinutes();
          var ending = "AM";

          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (hours >= 12) {
            hours = hours - 12;
            ending = "PM";
          }

          if (hours === 0) {
            hours = 12;
          }
          var currentDate = new Date();
          var timeNow = hours + ":" + minutes + " " + ending;
          $scope.weatherNow.timeDate = timeNow + " " + currentDate.toDateString();
          console.log($scope.weatherNow);
      
          $scope.imperial = true;
          document.getElementById("fahrenheit").style.backgroundColor = "#99e6ff";
          document.getElementById("celsius").style.backgroundColor = "#f2f2f2";
          $scope.weatherNow.temp = $scope.weatherNow.temp_f;
          $scope.weatherNow.wind = $scope.weatherNow.wind_mph;
      
          $scope.unitChange = function(elem){
            $scope.imperial = elem;
            console.log(Boolean($scope.imperial));
            if($scope.imperial === true){
            document.getElementById("fahrenheit").style.backgroundColor = "#99e6ff";
            document.getElementById("celsius").style.backgroundColor = "#f2f2f2";
            $scope.weatherNow.temp = $scope.weatherNow.temp_f;
            $scope.weatherNow.wind = $scope.weatherNow.wind_mph;
          } else if($scope.imperial === false) {
            document.getElementById("fahrenheit").style.backgroundColor = "#f2f2f2";
            document.getElementById("celsius").style.backgroundColor = "#99e6ff";
            $scope.weatherNow.temp = $scope.weatherNow.temp_c;
            $scope.weatherNow.wind = $scope.weatherNow.wind_kph;
          }
        };
        $scope.loading = true;
      
      });
    }
  });
  