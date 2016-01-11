angular.module('checklistApp')
	.directive('settings', function () {
		return {
      		restrict: 'E',
      		scope: false,
      		templateUrl: 'html/settings.html',
      		require: '^tabset',
      		link: function (scope, elem, attribute, tabsetCtrl) {
        		scope.active = false
            scope.header = 'Settings'
        		tabsetCtrl.addTab(scope)
        	}
		}
	})