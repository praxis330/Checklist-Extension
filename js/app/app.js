var checklistApp = angular.module('checklistApp', []);

checklistApp
  .controller('checklistController', ['$scope', '$http', function($scope, $http) {
    'use strict';

    $scope.items = {};
    $scope.authentication = null;
    $scope.currentTab = 1;
    $scope.newItem= {};

    var baseurl = 'https://checklist-stage.herokuapp.com/api/checklist/tasks';
    var auth_headers = {
      Authorization: 'Basic'
    }

    $scope.fetchItems = function () {
      $http.get(baseurl, { headers: auth_headers }).then(function(response) {
        $scope.items = response.data;
        console.log($scope.items);
      });
    };

    $scope.completeTask = function(taskId) {
      $http.put(baseurl + '/' + taskId,
        { 'done': true },
        { headers: auth_headers}
      );
      $scope.items[taskId]['done'] = true;
    };

    $scope.deleteTask = function(taskId) {
      $http.delete(baseurl + '/' + taskId,
        { headers: auth_headers }
      );
      delete $scope.items[taskId];
    };

    $scope.addTask = function() {
      $scope.newItem.done = false;
      $http.post(baseurl + '/', 
        $scope.newItem,
        { headers: auth_headers }
      ).then(function(response) {
        for (var key in response.data) {
          $scope.items[key] = response.data[key];
        }
      });
      // var dict_size = Object.keys($scope.items).length + 1;
      // $scope.items[dict_size] = $scope.newItem;
      $scope.newItem = {};
    };

    $scope.setTab = function(tabId) {
      $scope.currentTab = tabId;
    };

    $scope.isSet = function (tabId) {
      return $scope.currentTab === tabId;
    };

    $scope.fetchItems();
  }]);

