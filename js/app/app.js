var checklistApp = angular.module('checklistApp', []);

checklistApp.controller('checklistController', ['$scope', '$http', function($scope, $http) {
	'use strict';
	$scope.fetchItems = function ($scope) {
		var url = 'https://checklist-stage.herokuapp.com/api/checklist/tasks';
		$scope.apply( function() {
			$scope.items = $http.get(url, {
				headers: { Authorization: 'Basic TEST' }
			}).then(function(response) {
				console.log('items', response.data.tasks);
				return response.data.tasks;
			});
		});
	}
}]);

