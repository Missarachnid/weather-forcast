//custom directive to insert card html from template

  app.directive("cardinfo", function(){
    return { 
    restrict: 'E', 
     //scope: { 
      
   // }, 
    templateUrl: 'js/directives/card.html' 
  }
  });
