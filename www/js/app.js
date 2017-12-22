'use strict'

angular.module('IntelligentDetector', ['ui.router', 'ui.bootstrap', 'controllers', 'services', 'directives', 'ngTable', 'ngAnimate', 'filters'])


    .config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
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
                .state('main.monitors', {
                    url: '/monitors',
                    templateUrl: 'templates/monitors.html',
                    controller: 'MonitorsCtrl'
                })
                .state('main.input', {
                    url: '/input',
                    templateUrl: 'templates/input.html',
                    controller: 'inputCtrl'
                })

                .state('main.monitors.inspection', {
                    url: '/inspection',
                    templateUrl: 'templates/monitors/inspection.html',
                    controller: 'inspectionCtrl'
                })
                .state('main.monitors.risk', {
                    url: '/risk',
                    templateUrl: 'templates/monitors/risk.html',
                    controller: 'riskCtrl'
                })
                .state('main.monitors.medicine', {
                    url: '/medicine',
                    templateUrl: 'templates/monitors/medicine.html',
                    controller: 'medicineCtrl'
                })
                .state('main.monitors.life', {
                    url: '/life',
                    templateUrl: 'templates/monitors/life.html',
                    controller: 'lifeCtrl'
                })
                .state('main.monitors.assess', {
                    url: '/assess',
                    templateUrl: 'templates/monitors/assess.html',
                    controller: 'assessCtrl'
                })
        }
    ])