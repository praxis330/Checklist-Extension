angular.module('checklistApp')
  .controller('checklistController', ['$scope', '$http', 'storage', 'Task', function($scope, $http, storage, Task) {
    'use strict';

    $scope.fetchItems = function (listName) {
      Task.getList({listName: listName}).$promise.then(
        function (response) {
          $scope.items = response;
        });
    };

    $scope.completeTask = function (listName, taskId) {
      Task.update(
        {listName: listName, id: taskId},
        {done: true}
      ).$promise.then(function (response) {
        $scope.items[taskId] = response[taskId];
      })
    };

    $scope.deleteTask = function (listName, taskId) {
      Task.delete({
        listName: listName,
        id: taskId
      }).$promise.then(function (response) {
        delete $scope.items[taskId];
      })
    };

    $scope.addTask = function (listName) {
      Task.create(
        {listName: listName},
        {name: $scope.itemName, done: false}
      ).$promise.then(function (response) {
        var data = response.toJSON()
        for (var key in data) {
          $scope.items[key] = data[key];
        }
        $scope.itemName = null;
      });
    };

    $scope.fetchList = function () {
      if ($scope.isSet(1)) {
        $scope.items = {};
        $scope.fetchItems($scope.firstList)
      }
      else if ($scope.isSet(2)) {
        $scope.items = {};
        $scope.fetchItems($scope.secondList)
      }
    };

    $scope.setTab = function (tabId) {
      $scope.currentTab = tabId;
      $scope.fetchList();
    };

    $scope.isSet = function (tabId) {
      return $scope.currentTab === tabId;
    };

    $scope.items = {};
    $scope.firstList = storage.recall('firstList')
    $scope.secondList = storage.recall('secondList')
    $scope.currentTab = 1;

    $scope.fetchItems('tasks');
  }]);