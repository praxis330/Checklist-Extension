angular.module('checklistApp')
	.factory('Profile', ['$resource', 'storage', function ($resource, storage) {
		var auth_headers = { Authorization: 'Basic ' + storage.recall('authentication') }
		return $resource('http://checklist-stage.herokuapp.com/api/profile/:profileName', { profileName: '@profileName' }, {
			get: {
				method: 'GET',
				headers: auth_headers
			},
			update: {
				method: 'PUT',
				headers: auth_headers
			}
		});
	}])
