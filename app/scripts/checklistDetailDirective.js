angular.module('checklistApp')
	.directive('checklistDetail', function () {
		return {
			restrict: 'E',
			scope: false,
			templateUrl: 'html/checklistDetail.html',
		};
	});