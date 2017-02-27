//custom directive to insert card html from template
angular.module("myapp")
  .directive("cardinfo", function(){
    return { 
    restrict: 'E', 
     //scope: { 
      
   // }, 
    templateUrl: 'js/directives/card.html' 
  }
  });
