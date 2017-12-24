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
                .state('main.select', {
                  url: '/select',
                  templateUrl: 'templates/select.html',
                  controller: 'selectCtrl'
                })

                .state('main.input', {
                  url: '/input',
                  templateUrl: 'templates/input.html',
                  controller: 'inputCtrl'
                })
                .state('monitors', {
                  url: '/monitors',
                  templateUrl: 'templates/monitors.html',
                  controller: 'MonitorsCtrl'
                })

                .state('monitors.inspection', {
                  url: '/inspection',
                  templateUrl: 'templates/monitors/inspection.html',
                  controller: 'inspectionCtrl'
                })

                .state('monitors.risk', {
                  url: '/risk',
                  templateUrl: 'templates/monitors/risk.html',
                  controller: 'riskCtrl'
                })
                .state('monitors.medicine', {
                  url: '/medicine',
                  templateUrl: 'templates/monitors/medicine.html',
                  controller: 'medicineCtrl'
                })
                .state('monitors.life', {
                  url: '/life',
                  templateUrl: 'templates/monitors/life.html',
                  controller: 'lifeCtrl'
                })
                .state('monitors.assess', {
                  url: '/assess',
                  templateUrl: 'templates/monitors/assess.html',
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
