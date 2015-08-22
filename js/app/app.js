var checklistApp = angular.module('checklistApp', []);

checklistApp.controller('checklistController', ['$scope', '$http', function($scope, $http) {
  'use strict';

  var baseurl = 'https://checklist-stage.herokuapp.com/api/checklist/tasks';
  var auth_headers = {
    Authorization: 'Basic '
  }

  $scope.items = null;
  $scope.newItem= {};

  $scope.fetchItems = function () {
    $http.get(baseurl, { headers: auth_headers }).then(function(response) {
      $scope.items = response.data.tasks;
    });
  };

  $scope.fetchItems();

  $scope.completeTask = function(taskId) {
    $http.put(baseurl + '/' + taskId,
      { 'done': true },
      { headers: auth_headers}
    );
    $scope.fetchItems();
  };

  $scope.deleteTask = function(taskId) {
    $http.delete(baseurl + '/' + taskId,
      { headers: auth_headers }
    );
    $scope.fetchItems();
  };

  $scope.addTask = function() {
    $scope.newItem.done = false;
    $http.post(baseurl + '/', 
      $scope.newItem,
      { headers: auth_headers }
    );
    $scope.fetchItems();
    $scope.newItem = {};
  };
}]);

