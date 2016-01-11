angular.module('checklistApp')
  .directive('tabset', function () {
    return {
      restrict: 'E',
      transclude: 'true',
      scope: false,
      templateUrl: 'html/tabset.html',
      bindToController: true,
      controllerAs: 'tabset',
      controller: ['$scope', function ($scope) {
        this.tabs = []

        this.addTab = function addTab (tab) {
          this.tabs.push(tab)

          if (this.tabs.length === 1) {
            tab.active = true
          };
        };

        this.select = function (selectedTab) {
          angular.forEach(this.tabs, function (tab) {
            if (tab.active && tab !== selectedTab) {
              tab.active = false;
            };
          });

          selectedTab.active = true;
          $scope.fetchList()
        };
      }]
    }
  })
