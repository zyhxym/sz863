angular.module('controllers', ['ngResource', 'services'])


    .controller('LoginCtrl', [ '$scope', '$state', 'Storage', '$timeout', 'Ontology', 'Evaluation', function ($scope, $state, Storage, $timeout, Ontology, Evaluation) {

        // 捆绑变量
        $scope.logStatus = '   '

        // 判断当前本地是否缓存了手机号
        if (Storage.get('Name') != null) { // 缓存了手机号 将其显示到输入栏
            $scope.login = {
                name: Storage.get('Name'),
                password: ''
            }
        } else { // 否则空白显示
            $scope.login = {
                name: '',
                password: ''
            }
        }
        $scope.login.role = 'doctor' // 默认选中医生角色
        var findUser = (function initailDatabase() {
            var User = new Map()
            User.set('marry', { password: 'marry,,,', role: 'doctor', guid: 'P0000125' })
            User.set('davaid', { password: 'davaid,,,', role: 'doctor', guid: 'P0000121' })
            User.set('kingsley', { password: 'kingsley,,,', role: 'administrator', guid: null })
            return function(logInfo) {
                var result = User.get(logInfo.name)
                console.log(result)
                if (result) {
                    return result.password === logInfo.password && result.role === logInfo.role ? result.guid : undefined
                }
            }
        }())

        $scope.LogIn = function(login) {
            console.log(login)
            var user = findUser(login)

            if (user === undefined) {
                // 可能是管理员
                $scope.logStatus = '用户名或密码错误。'
            } else if (user === undefined) {
                $scope.logStatus = '恭喜您！登录成功。'
                $state.go('main.select')
            } else {
                // 登录正常
                $scope.logStatus = '恭喜您！登录成功。'
                $state.go('main.select')
                Storage.set('UID', user)
            }
        }

      }
      $scope.login.role = 'doctor' // 默认选中医生角色
      var findUser = (function initailDatabase () {
        var User = new Map()
        User.set('marry', {password: 'marry,,,', role: 'doctor'})
        User.set('kingsley', {password: 'kingsley,,,', role: 'administrator'})
        return function (logInfo) {
          var result = User.get(logInfo.name)
          console.log(result)
          if (result) {
            return (result.password === logInfo.password && result.role === logInfo.role)
          }
        }
      }())

      $scope.LogIn = function (login) {
        var user = findUser(login)

        if (user) {
            // 可能是管理员 也可能是 医生
          $scope.logStatus = '恭喜您！登录成功。'
          // 录入本体
          Ontology.readONT().then(function (data) {})
          if (login.role === 'doctor') {

          } else {

          }
        } else {
          $scope.logStatus = '用户名或密码错误。'
        }
      }

      // $scope.toRegister = function () { // 跳转到注册页面-电话验证
      //   Storage.set('setPasswordState', 'register')
      //   $state.go('phoneValid')
      // }

      // $scope.toReset = function () { // 跳转到找回密码页面-电话验证
      //   Storage.set('setPasswordState', 'reset')
      //   $state.go('phoneValid')
      // }
    }])

    .controller('outputCtrl', [ '$scope', '$state', 'Storage', '$timeout', function ($scope, $state, Storage, $timeout) {
      // SocketService.on('message', function (data) {
      //       // console.log(data);
      //   $scope.status = 'Connected'
      //   var myChart = echarts.init(document.getElementById('main'))
      //   myChart.showLoading()
      //       // 指定图表的配置项和数据
      //   var option = {
      //     title: {
      //       text: $scope.text
      //     },
      //     tooltip: {},
      //     legend: {
      //       data: ['params']
      //     },
      //     xAxis: {
      //       data: []
      //     },
      //     yAxis: {},
      //     series: [{
      //       name: '销量',
      //       type: 'line',
      //       data: data.data
      //     }]
      //   }


    }])




    // 主菜单栏(个人信息)--张桠童
    .controller('MainCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {


        }
    ])

    // 主菜单栏
    .controller('MonitorsCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {
            $scope.toinspection = function() {
                $state.go('main.monitors.inspection')
            }
            $scope.torisk = function() {
                $state.go('main.monitors.risk')
            }
            $scope.tomedicine = function() {
                $state.go('main.monitors.medicine')
            }
            $scope.tolife = function() {
                $state.go('main.monitors.life')
            }
            $scope.toassess = function() {
                $state.go('main.monitors.assess')
            }
        }
    ])

    .controller('inputCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {
            $scope.accept = function() {
                console.log("确认了")
                $state.go('main.monitors.inspection')
            }
            $scope.cancel = function() {
                $scope.textInfo = {}
            }
        }
    ])

    .controller('inspectionCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {

        }
    ])
    .controller('riskCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {

        }
    ])
    .controller('medicineCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {

        }
    ])
    .controller('lifeCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {

        }
    ])
    .controller('assessCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {

        }
    ])

    .controller('selectCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
        function($scope, CONFIG, Storage, Data, $state) {
            $scope.toinput = function() {
                $state.go('main.input')
            }

            $scope.touserlist = function() {
                $('#userlist').modal('show')

            }
            // 关闭modal控制
            $scope.modal_close = function(target) {
                $(target).modal('hide')
            }
        }
    ])