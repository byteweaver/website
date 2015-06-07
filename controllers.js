function ProjectCtrl($scope, $http) {
  $http.get('https://api.github.com/orgs/byteweaver/repos').success(function (repos) {
    $scope.projects = repos.filter(function (repo) {
      return repo.name.startsWith('django-');
    });
  });
};
