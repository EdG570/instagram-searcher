(function(){
  var app = angular.module('myApp', ['ngMessages', 'ngAnimate']);
            

  app.controller('searchCtrl', ['$scope', '$http', function($scope, $http){

    $scope.loading = false;
 
    
    //Checks form validation
    $scope.submit = function() {
      $scope.loading = true;
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
        $scope.groups = result.data.response.groups;
        $scope.places = result.data.response.groups[0].items;
        $scope.photoSize = '300x200';
        console.log($scope.groups);

        $scope.loading = false;
        $scope.searchTag = '';

      },
      function(result) {
        alert('error');
      });
    };

  //set loading=false and set searchTag=''

  }]); 

})();