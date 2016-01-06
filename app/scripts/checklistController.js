angular.module('checklistApp')
  .controller('checklistController', ['$scope', '$http', '$q', 'storage', 'Task', 'Profile', function($scope, $http, $q, storage, Task, Profile) {
    'use strict';

    $scope.fetchListItems = function (listName) {
      Task.getList({listName: listName}).$promise.then(
        function (response) {
          $scope.items = response;
        });
    };

    $scope.fetchList = function () {
      $scope.items = {}
      $scope.fetchListItems($scope.getCurrentList())
    };

    $scope.getCurrentList = function () {
      return $scope.profile[$scope.currentTab - 1]
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

    $scope.getProfile = function () {
      var deferred = $q.defer()
      Profile.get(
        {profileName: $scope.profileName}
      ).$promise.then(function (response) {
        deferred.resolve($scope.profile = response['lists'])
      });
      return deferred.promise;
    };

    $scope.updateProfile = function () {
      Profile.update(
        {profileName: $scope.profileName},
        {lists: $scope.profile}
      ).$promise.then(function (response) {
        $scope.profile = response['lists']
      });
    };

    $scope.setTab = function (tabId) {
      $scope.currentTab = tabId;
      $scope.fetchList();
    };

    $scope.isSet = function (tabId) {
      return $scope.currentTab === tabId;
    };

    $scope.items = {};
    $scope.itemName = null;
    $scope.storage = storage
    $scope.authentication = storage.recall('authentication')
    $scope.profileName = storage.recall('profileName')
    $scope.currentTab = 1;
    $scope.getProfile().then(function () {
      $scope.fetchList()
    });

  }]);