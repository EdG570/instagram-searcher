(function(){
  var app = angular.module('myApp', ['ngMessages', 'ngAnimate']);

  app.controller('searchCtrl', ['$scope', '$http', function($scope, $http){

    $scope.validation = false;
    //Checks form validation
    $scope.submit = function() {
      if($scope.myForm.$valid) {
        console.log('The form is valid!');
        $scope.validation = true;
        $scope.myForm.tag = '';
      } else {
        console.log('The form is invalid!');
      }
    };
  }]);
})();