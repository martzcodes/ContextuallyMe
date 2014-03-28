var contextuallyMe = angular.module('contextuallyMe', []);

function mainController($scope, $http, $templateCache) {
	$scope.title = "Test Martz";

	$http.get('githubdata.json')
       	.then(function(res){
        	$scope.githubdata = res.data;
    	});

$http({method: 'GET', url: 'https://github.com/users/oehokie/contributions_calendar_data', cache: $templateCache}).
      success(function(data, status) {
        $scope.status = status;
        $scope.githubactual = data;
      }).
      error(function(data, status) {
        $scope.githubactual = data || "Request failed";
        $scope.status = status;
    });

}
