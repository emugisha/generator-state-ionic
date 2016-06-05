
(function () {
  'use strict';

  angular
    .module('<%= appName%>.states.<%= data.state%>',[])
    .config(routes);

  function routes($stateProvider){
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('<%= data.state%>', {
        url: '/<%= data.state%>',
        controller:'<%= controllerName%>',
        controllerAs:'<%= data.state%>',
        templateUrl: 'states/<%= data.state%>/<%= data.state%>.html'

      });
  }
}());
