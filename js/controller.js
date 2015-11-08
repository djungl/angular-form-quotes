'use strict'

exnessTestApp.factory('exnessAjax', ['$http', function($http) {
   return {
        loadData: function(url) {
             return $http.get(url)
				.then(function(response) {
					return angular.fromJson(response.data);
				});
        }
   }
}]);


exnessTestApp.controller('ExnessCurrencyController', ['exnessAjax','$scope','filterFilter', '$timeout', function(exnessAjax, $scope, filterFilter, $timeout) {

	$scope.pair = { 
		currency1: "",
		currency2: ""
	};

	$scope.makeQueryStringForFilter = function () {
		var pair = $scope.pair;
		if (!pair.currency1 || pair.currency1 === "All") {
			return "";
		}
		return pair.currency1 + "/" + pair.currency2;
	};	

	$scope.loaded = false;

	// load data for currency selectors
    exnessAjax.loadData('data/currency.json').then(function(response){ 
        $scope.currency1_list = response.currency1_list;
        $scope.currency2_list = response.currency2_list;
        $scope.loaded = true;
    });	

    // load quotes data
    exnessAjax.loadData('data/quotes.json').then(function(response){ 
        $scope.quotes = response.base;
    });

    // Show second dropdown only if EUR selected in first dropdown
	$scope.$watch(
		function () {
			return $scope.pair.currency1;
		}, 
		function (newValue, oldValue) {
			$scope.isVisible = newValue === 'EUR';
		}
	);

	$scope.filterList = function () {
		var query_string = $scope.makeQueryStringForFilter();
		$scope.queryBy = 'name';
		$scope.query = query_string;
	};

	// Start loading custom font after DOM had been rendered
	$timeout(function () {
			var el = document.querySelector("head");
			el.innerHTML += '<link rel="stylesheet" type="text/css" href="css/font.css">';
		}, 0, false);

}]);

