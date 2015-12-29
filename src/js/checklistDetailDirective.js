angular.module('checklistApp')
	.directive('checklistDetail', function () {
		return {
			restrict: 'E',
			scope: {
				itemName: '=',
				items: '=',
				listNumber: '=',
				addTask: '&',
				completeTask: '&',
				deleteTask: '&'
			},
			templateUrl: 'src/html/checklistDetail.html'
		};
	});