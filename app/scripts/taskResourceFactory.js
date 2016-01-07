angular.module('checklistApp')
  .factory('Task', ['$resource', 'storage', function($resource, storage) {
    return $resource('http://checklist-stage.herokuapp.com/api/checklist/:listName/:id', { listName: '@listName', id: '@id' }, {
      getList: {
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + storage.recall('authentication')
        }
      },
      update:{
        method: 'PUT',
        headers: {
          Authorization: 'Basic ' + storage.recall('authentication')
        }
      },
      delete:{
        method: 'DELETE',
        headers: {
          Authorization: 'Basic ' + storage.recall('authentication')
        }
      },
      create:{
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + storage.recall('authentication')
        }
      }
    });
  }])