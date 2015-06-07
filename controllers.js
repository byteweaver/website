function ProjectCtrl($scope, $http) {
  var blacklist = ['django-tos'];

  $http.get('https://api.github.com/orgs/byteweaver/repos').success(function (repos) {
    $scope.projects = repos.filter(function (repo) {
      return repo.name.startsWith('django-') && blacklist.indexOf(repo.name) === -1;
    });
  });
};
