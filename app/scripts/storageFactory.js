angular.module('checklistApp')
	.factory('storage', ['$window', function ($window) {
    	return {
      		memorize : function (key, value) {
        		$window.localStorage.setItem(key, value)
      		},
      		recall : function (key) {
        		return $window.localStorage.getItem(key)
      		},
    	}
  	}])