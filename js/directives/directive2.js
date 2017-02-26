
//custom directive to insert card html from template for Night forecast
angular.module("myapp")
  .directive("nightcardinfo", function(){
    return { 
    restrict: 'E', 
    scope: { 
      info: '=' 
    }
    templateUrl: 'js/directives/cardNight.html' 
  }; 
  });
