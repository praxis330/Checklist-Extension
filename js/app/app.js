var checklistApp = angular.module('checklistApp', []);

checklistApp.controller('checklistController', ['$scope', '$http', function($scope, $http) {
	'use strict';

	$scope.items = null;

	$scope.fetchItems = function () {
		var url = 'https://checklist-stage.herokuapp.com/api/checklist/tasks';
		
		$http.get(url, {
			headers: { Authorization: 'Basic TEST' }
		}).then(function(response) {
			$scope.items = response.data.tasks;
		});
	};

	$scope.fetchItems();
}]);

