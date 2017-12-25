// 'use strict'

angular.module('IntelligentDetector', ['ui.router', 'ui.bootstrap', 'controllers', 'services', 'directives', 'ngTable', 'ngAnimate', 'filters'])

    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login')

        $stateProvider
                // 登录
                .state('login', {
                  url: '/login',
                  templateUrl: 'templates/login.html',
                  controller: 'LoginCtrl'
                })

                // 主页面
                .state('main', {
                  url: '/main',
                  templateUrl: 'templates/main.html',
                  controller: 'MainCtrl'
                })
                .state('main.selectlist', {
                  url: '/selectlist',
                  templateUrl: 'templates/main/selectlist.html',
                  controller: 'selectlistCtrl'
                })
                .state('main.selectlist.select', {
                  url: '/select',
                  templateUrl: 'templates/main/selectlist/select.html',
                  controller: 'selectCtrl'
                })

                .state('main.selectlist.input', {
                  url: '/input',
                  templateUrl: 'templates/main/selectlist/input.html',
                  controller: 'inputCtrl'
                })
                .state('main.monitors', {
                  url: '/monitors',
                  templateUrl: 'templates/main/monitors.html',
                  controller: 'MonitorsCtrl'
                })

                .state('main.monitors.inspection', {
                  url: '/inspection',
                  templateUrl: 'templates/main/monitors/inspection.html',
                  controller: 'inspectionCtrl'
                })

                .state('main.monitors.risk', {
                  url: '/risk',
                  templateUrl: 'templates/main/monitors/risk.html',
                  controller: 'riskCtrl'
                })
                .state('main.monitors.medicine', {
                  url: '/medicine',
                  templateUrl: 'templates/main/monitors/medicine.html',
                  controller: 'medicineCtrl'
                })
                .state('main.monitors.life', {
                  url: '/life',
                  templateUrl: 'templates/main/monitors/life.html',
                  controller: 'lifeCtrl'
                })
                .state('main.monitors.assess', {
                  url: '/assess',
                  templateUrl: 'templates/main/monitors/assess.html',
                  controller: 'assessCtrl'
                })
      }
    ])

    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('myInterceptor')
    }])
    .factory('myInterceptor', ['$rootScope', function ($rootScope) {
      // var loading = $()

      var httpControl = {
        request: function (config) {
          // console.log(config)
          if (config.url.toString().indexOf('http:') === 0) {
            // console.log(config)
            $('body').LoadingOverlay('show')
          }
          return config
        },
        response: function (response) {
　　　　　　　　 　// end
          if (response.config.url.toString().indexOf('http:') === 0) {
            // console.log(response)
            $('body').LoadingOverlay('hide')
          }

          return response
        }
      }
      return httpControl
    }])
