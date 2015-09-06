angular
  .module('checklistApp', [])
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
  .controller('checklistController', ['$scope', '$http', 'storage', function($scope, $http, storage) {
    'use strict';

    $scope.fetchItems = function (listName) {
      $http.get(baseurl + listName,
        { headers: $scope.getAuthenticationHeaders() }
        ).then(function(response) {
        $scope.items = response.data;
        console.log($scope.items);
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

    $scope.completeTask = function (listName, taskId) {
      $http.put(baseurl + listName + '/' + taskId,
        { 'done': true },
        { headers: $scope.getAuthenticationHeaders() }
      );
      $scope.items[taskId]['done'] = true;
    };

    $scope.deleteTask = function (listName, taskId) {
      $http.delete(baseurl + listName + '/' + taskId,
        { headers: $scope.getAuthenticationHeaders() }
      );
      delete $scope.items[taskId];
    };

    $scope.addTask = function (listName) {
      $scope.newItem.done = false;
      $http.post(baseurl + listName + '/', 
        $scope.newItem,
        { headers: $scope.getAuthenticationHeaders() }
      ).then(function(response) {
        for (var key in response.data) {
          $scope.items[key] = response.data[key];
        }
      });
      $scope.newItem = {};
    };

    $scope.setTab = function (tabId) {
      $scope.currentTab = tabId;
      $scope.fetchList();
    };

    $scope.isSet = function (tabId) {
      return $scope.currentTab === tabId;
    };

    $scope.getAuthenticationHeaders = function () {
      var auth_headers = {
        Authorization: 'Basic ' + $scope.authentication
      };
      return auth_headers;
    };

    var baseurl = 'http://localhost:5000/api/checklist/';
    var auth_headers = {};

    $scope.storage = storage
    $scope.items = {};
    $scope.firstList = storage.recall('firstList')
    $scope.secondList = storage.recall('secondList')
    $scope.authentication = storage.recall('authentication');
    $scope.currentTab = 1;
    $scope.newItem= {};

    $scope.fetchItems('tasks');
  }]);

