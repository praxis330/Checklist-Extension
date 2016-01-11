angular.module('checklistApp')
	.directive('checklistDetail', function () {
		return {
			restrict: 'E',
			scope: false,
			templateUrl: 'html/checklistDetail.html',
			require: '^tabset',
			link: function (scope, elem, attribute, tabsetCtrl) {
        		scope.active = false
        		scope.header = scope.list
        		tabsetCtrl.addTab(scope)
      		}
		}
	});