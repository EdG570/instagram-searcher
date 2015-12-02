(function(){
  var app = angular.module('myApp', ['ngMessages', 'ngAnimate']);
            

  app.controller('searchCtrl', ['$scope', '$http', function($scope, $http){

    $scope.loading = false;
    $scope.notSubmitted = true;
    $scope.tips = false;
    $scope.searchResults = false;
    $scope.noResults = false;
 
    
    //Checks form validation
    $scope.submit = function() {
      $scope.loading = true;
      $scope.notSubmitted = false;

      if($scope.myForm.$valid) {
        console.log('The form is valid!');
        $scope.getJSONData();
        
      } else {
        console.log('The form is invalid!');
        
      }
    };

    $scope.getJSONData = function() {
      var url = "https://api.foursquare.com/v2/venues/explore";
      var userLocation = $scope.userLocation;
      var searchTag = $scope.searchTag;

      var request = {
        client_id: 'MFKB5Y1UIUJQ3S2G2YI3CD5EAGRPIODYIATL1FGLCXD1N1TF',
        client_secret: '1VABGDFHKQ3BDAUOGYV4NJ5NL0B3XCQ2JRQ4MMIDKC3IGNVW',
        near: userLocation,
        query: searchTag,
        v: '20140806',
        m: 'foursquare',
        venuePhotos: 1
      };

      $http({
        method: 'GET',
        url: url,
        params: request,
      })
      .then(function(result){
        $scope.noResults = false;
        $scope.groups = result.data.response.groups;
        $scope.places = result.data.response.groups[0].items;
        $scope.tips = result.data.response.groups[0].items.tips;
        $scope.photoSize = '300x200';

        $scope.loading = false;
        $scope.searchTerm = $scope.searchTag;
        $scope.searchResults = true;
        $scope.searchTag = '';
        $scope.locationTerm = $scope.userLocation;
        $scope.userLocation = '';

      },
      function(result) {
        $scope.loading = false;
        $scope.noResults = true;
        $scope.searchResults = false;
      });
    };

  }]); 

})();