'use strict'

angular.module('IntelligentDetector', ['ui.router', 'controllers', 'services', 'directives', 'ngTable', 'ngAnimate', 'filters'])

    .config(['$stateProvider', '$urlRouterProvider',
      function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login')
        $urlRouterProvider.when('/users', '/main/users/allusers')
        $urlRouterProvider.when('/monitors', '/main/monitors/input')
        $urlRouterProvider.when('/output', '/main/monitors/output')
        $urlRouterProvider.when('/input', '/main/monitors/input')

        $stateProvider
                // 登录
                .state('login', {
                  url: '/login',
                  templateUrl: 'templates/login.html',
                  controller: 'LoginCtrl'
                })
                // 注册
                .state('register', {
                  url: '/register',
                  templateUrl: 'templates/register.html',
                  controller: 'RegisterCtrl'
                })
                // 主页面
                .state('main', {
                  url: '/main',
                  templateUrl: 'templates/main.html',
                  controller: 'MainCtrl'
                })
                .state('main.monitors', {
                  abstract: true,
                  url: '/monitors',
                  templateUrl: 'templates/monitors.html'
                })
                // 监控
                .state('main.monitors.output', {
                  url: '/output',
                  templateUrl: 'templates/monitors/output.html',
                  controller: 'outputCtrl'
                })
                .state('main.monitors.input', {
                  url: '/input',
                  templateUrl: 'templates/monitors/input.html',
                  controller: 'inputCtrl'
                })
                // 设置
                .state('setPassword', {
                  url: '/setPassword',
                  templateUrl: 'templates/settings/setPassword.html',
                  controller: 'SetPasswordCtrl'
                })
                .state('changePassword', {
                  url: '/changePassword',
                  templateUrl: 'templates/settings/changePassword.html',
                  controller: 'ChangePasswordCtrl'
                })
                .state('phoneValid', {
                  url: '/phoneValid',
                  templateUrl: 'templates/settings/phoneValid.html',
                  controller: 'phoneValidCtrl'
                })
                .state('userDetail', {
                  url: '/userDetail',
                  templateUrl: 'templates/settings/userdetail.html'
                })
      }
    ])

    .run(['$rootScope', '$stateParams', 'Storage', function ($rootScope, $stateParams, Storage) {
      $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fronParams) {
            // console.log(fromState);
        if (fromState.name == 'main.data.testResult') {
          Storage.rm('ObjectNo')
          Storage.rm('ObjCompany')
          Storage.rm('ObjIncuSeq')
        }
            // console.log(toState.name);
        switch (toState.name) {
          case 'main.monitors.input':
            $('#mytabs a[href="#monitors"]').tab('show')
            $('#mypills a[href="#input"]').tab('show')
            break
          case 'main.monitors.output':
                    // $('#mytabs a[href="#monitors"]').tab('show');
            $('#mypills a[href="#output"]').tab('show')
            break
          default:
            break
        }
      })
    }])
