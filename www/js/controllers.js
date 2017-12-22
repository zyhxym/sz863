angular.module('controllers', ['ngResource', 'services'])

    .controller('LoginCtrl', [ '$scope', '$state', 'Storage', '$timeout', function ($scope, $state, Storage, $timeout) {
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
      var findUser = (function initailDatabase () {
        var User = new Map()
        User.set('marry', {password: 'marry,,,', role: 'doctor', guid: 'P0000125'})
        User.set('davaid', {password: 'davaid,,,', role: 'doctor', guid: 'P0000121'})
        User.set('kingsley', {password: 'kingsley,,,', role: 'administrator', guid: null})
        return function (logInfo) {
          var result = User.get(logInfo.name)
          console.log(result)
          if (result) {
            return result.password === logInfo.password && result.role === logInfo.role ? result.guid : undefined
          }
        }
      }())

      $scope.LogIn = function (login) {
        console.log(login)
        var user = findUser(login)

        if (user === undefined) {
            // 可能是管理员
          $scope.logStatus = '用户名或密码错误。'
        } else if (user === undefined) {
          $scope.logStatus = '恭喜您！登录成功。'
        } else {
            // 登录正常
          $scope.logStatus = '恭喜您！登录成功。'
          Storage.set('UID', user)
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

    // .controller('phoneValidCtrl', ['$scope', '$timeout', '$interval', 'Storage', '$state', 'UserService', function ($scope, $timeout, $interval, Storage, $state, UserService) {
    //   $scope.telnumber = ''
    //   $scope.validnumber = ''
    //   $scope.check = ''
    //   $scope.validStatus = '点击发送验证码'
    //   $scope.title = ' '
    //   $scope.if_disabled = false
    //   switch (Storage.get('setPasswordState')) {
    //     case 'register':
    //       $scope.title = '注册'
    //       break
    //     case 'reset':
    //       $scope.title = '找回密码'
    //       break
    //     default:
    //       $scope.title = '注册'
    //   }

    //   var uid_valid = /^UID\d{11}/
    //   var RegisterNewUser = function (tel) {
    //     UserService.CreateNewUserId(tel).then(function (data) {
    //             // 转换成 json
    //       data = data.toJSON()
    //       var t = ''
    //       for (i in data) {
    //         t = t + data[i]
    //       }
    //       data = t

    //             // console.log(data);
    //       if (data == '该手机号已经注册') {
    //         $scope.validStatus = '该手机号已经注册'
    //       } else if (uid_valid.test(data)) {
    //         $scope.validStatus = '生成新用户ID成功'
    //         Storage.set('UID', data)
    //         UserService.SetUID(data)
    //         UserService.SetPhenoNo(tel)
    //       } else {
    //         $scope.validStatus = '生成新用户ID失败'
    //       }
    //     }, function (er) {
    //       console.log(er)
    //       $scope.validStatus = '验证失败'
    //     })
    //   }

    //   var ResetPassword = function (tel) {
    //         // 判断手机号是否存在
    //     UserService.GetUserByPhoneNo(tel).then(function (data) {
    //             // 转换成 json

    //       data = data.toJSON()
    //       var t = ''
    //       for (i in data) {
    //         t = t + data[i]
    //       }
    //       data = t

    //       if (data == null) {
    //         $scope.validStatus = '不存在该用户'
    //       } else if (uid_valid.test(data)) {
    //         Storage.set('UID', data)
    //         UserService.SetUID(data)
    //         UserService.SetPhenoNo(tel)
    //         $scope.validStatus = '已发送验证'
    //       }
    //     })
    //   }

    //   $scope.SendMSM = function (tel) {
    //     if ($scope.if_disabled) return

    //     var phonev = /^1(3|4|5|7|8)\d{9}$/
    //     if (!phonev.test(tel)) {
    //       $scope.check = '请输入正确手机号'
    //       return
    //     }

    //     if (Storage.get('setPasswordState') == 'register') {
    //       RegisterNewUser(tel)
    //     } else {
    //       ResetPassword(tel)
    //     }
    //     $scope.if_disabled = true

    //         // 倒计时60s
    //     $timeout(function () {
    //       $scope.validStatus = '点击发送验证码'
    //       $scope.if_disabled = false
    //     }, 60000)
    //     var second = 60
    //     timePromise = undefined

    //     timePromise = $interval(function () {
    //       if (second <= 0) {
    //         $interval.cancel(timePromise)
    //         timePromise = undefined
    //         second = 60
    //         $scope.validStatus = '重发验证码'
    //       } else {
    //         $scope.validStatus = String(second) + '秒后再发送'
    //         second--
    //       }
    //     }, 1000, 100)
    //   }

    //   $scope.validNext = function (number) {
    //     var phonev = /^1(3|4|5|7|8)\d{9}$/
    //     if (!phonev.test(number)) {
    //       $scope.check = '请输入正确手机号'
    //       return
    //     }

    //     var validNumberReg = /^\d{6}$/
    //     if (!validNumberReg.test($scope.validnumber)) {
    //       $scope.check = '请输入正确验证码'
    //       return
    //     }

    //         // 调web Service 判断验证码正不正确

    //     switch (Storage.get('setPasswordState')) {
    //       case 'register':
    //         $state.go('register')
    //         break
    //       case 'reset':
    //         $state.go('setPassword')
    //     }
    //   }

    //   $scope.onClickCancel = function () {
    //     Storage.rm('UID')
    //     $state.go('login')
    //   }
    // }])

    // .controller('RegisterCtrl', ['UserService', '$scope', '$state', 'Storage', '$timeout', function (UserService, $scope, $state, Storage, $timeout) {
    //   $scope.registerInfo = {
    //     uid: UserService.GetUID(),
    //     username: '',
    //     id: '',
    //     password: '',
    //     password_rep: '',
    //     role: ''
    //   }

    //   $scope.status = ''

    //   $scope.onClickReg = function (registerInfo) {
    //     if (registerInfo.role == '') {
    //       $scope.status = '请选角色'
    //     }

    //     if (registerInfo.password != registerInfo.password) {
    //       $scope.status = '两次密码不同'
    //     }

    //     registerInfo.role = registerInfo.role[0]
    //     console.log(registerInfo.role)
    //     console.log(registerInfo)

    //     UserService.RegisterUser(registerInfo).then(function (data) {
    //       console.log(data)
    //       if (data.result == '注册成功') {
    //         $timeout(function () { $state.go('main.data.sampling') }, 500)
    //         $scope.status = '注册成功'
    //       } else {
    //         $scope.status = '注册失败'
    //       }
    //     })
    //   }
    // }])

    // .controller('SetPasswordCtrl', ['UserService', '$scope', '$state', 'Storage', '$timeout', function (UserService, $scope, $state, Storage, $timeout) {
    //   $scope.Input = {
    //     password: '',
    //     password2: '',
    //     password_old: ''
    //   }

    //   $scope.status = ''

    //   $scope.onClickCancel = function () {
    //     Storage.rm('UID')
    //     $state.go('login')
    //   }

    //   $scope.onClickConfirm = function (Input) {
    //     if (Input.password != Input.password2) {
    //       $scope.status = '两次密码不同'
    //       return
    //     }

    //         // console.log(Storage.get("UID"));
    //         // infoIndex = ["UserId","Identify","PhoneNo","UserName","Role"];
    //         // UserService.GetUserInfo(infoIndex).then(function(data){
    //         // console.log(Storage.get("UID"));

    //         // if(data == null) {
    //         //     $scope.status = "修改失败，请重试";
    //         //     return;
    //         // }

    //         // data = data.toJSON();
    //         // var t = "";
    //         // for(i in data){
    //         //     t = t + data[i];
    //         // }
    //         // data = t;
    //         //
    //         // data = data.split('|');
    //         // console.log(data);
    //         // registerInfo = {
    //         //     uid:UserService.GetUID(),
    //         //     username:data[2],
    //         //     id:data[0],
    //         //     password:Input.password,
    //         //     role:data[3]
    //         // };

    //         // UserService.RegisterUser(registerInfo).then(function(data){
    //         //     // console.log(data);
    //         //     if(data.result == "注册成功"){
    //         //         $timeout(function(){$state.go('main.data');} , 500);
    //         //         $scope.status = "修改成功";
    //         //     }
    //         //     else{
    //         //         $scope.status = "修改失败";
    //         //     }
    //         // });
    //         // console.log(data);
    //         // Input.password_old = data[4];

    //     UserService.ChangePassword(Input, 1).then(function (res) {
    //       if (res.result == '修改成功') {
    //         $timeout(function () { $state.go('main.data.sampling') }, 500)
    //       } else {

    //       }
    //             // if(res){
    //             //     $timeout(function(){$state.go('main.data');} , 500);
    //             // }
    //     })
    //   }
    // }])

    // .controller('ChangePasswordCtrl', ['UserService', '$scope', '$state', 'Storage', '$timeout', function (UserService, $scope, $state, Storage, $timeout) {
    //   $scope.Input = {
    //     password: '',
    //     password2: '',
    //     password_old: ''
    //   }

    //   $scope.status = ''

    //   $scope.onClickConfirm = function (Input) {
    //     if (Input.password != Input.password2) {
    //       $scope.status = '两次新密码不同'
    //       return
    //     }

    //     UserService.ChangePassword(Input, 0).then(function (res) {
    //       if (res.result == '修改成功') {
    //         $scope.status = '修改成功'
    //         $timeout(function () { $state.go('login') }, 500)
    //       } else {
    //         $scope.status = '修改失败'
    //       }
    //     })
    //   }

    //   $scope.back = function () {
    //     $state.go('main.data.sampling')
    //   }
    // }])

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

      //       // 使用刚指定的配置项和数据显示图表。
      //   myChart.setOption(option)
      //   myChart.hideLoading()
      // })

      // $scope.diagnosis = {
      //   name: '诊断结果',
      //   names: ['脑卒中', '流行性感冒', '手足口病', '糖尿病', '高血压'],
      //   codes: ['1', '2', '3', '4', '5'],
      //   status: [1, 1, 1, 1, 1]
      // }

      // $scope.forecast = {
      //   name: '风险预测',
      //   names: ['脑卒中', '流行性感冒', '手足口病', '糖尿病', '高血压'],
      //   codes: ['1', '2', '3', '4', '5'],
      //   status: [1, 1, 1, 1, 1]
      // }

      // $scope.lifeadvice = {
      //   name: '生活建议',
      //   names: ['运动', '素食', '规律生活', '以及', '其他'],
      //   codes: ['1', '2', '3', '4', '5'],
      //   status: [1, 1, 1, 1, 1]

      // }

      // $scope.medicinegroup = {
      //   name: '分组药物',
      //   names: ['药物1', '药物2', '药物3', '药物4', '药物5'],
      //   codes: ['1', '2', '3', '4', '5'],
      //   status: [1, 1, 1, 1, 1]
      // }

      // $scope.medicineungroup = {
      //   name: '未分组药物',
      //   names: ['药物1', '药物2', '药物3', '药物4', '药物5'],
      //   codes: ['1', '2', '3', '4', '5'],
      //   status: [1, 1, 1, 1, 1]
      // }
      // $scope.inspectionadvice = {
      //   name: '检查建议',
      //   names: ['MRI'],
      //   codes: ['1'],
      //   status: ['35 ℃']
      // }

      // $scope.printcode = function (code, name) {
      //       // console.log(code);
      //   SocketService.emit('get params', code)
      //   $scope.text = name
      // }
    }])

    .controller('inputCtrl', [ '$scope', '$state', 'Storage', '$timeout', '$rootScope',
      function ($scope, $state, Storage, $timeout, $rootScope) {
      //   $scope.status = 'No Connection'
      //   $scope.flag = false
      //   $scope.selected = { sample: '', reagent: '' }
      //   $scope.procedure = ['隔离器灭菌', '自检/复位', '集菌', '培养箱检测']
      //   $scope.taskList = [{ taskName: '全仓灭菌', sample: 'NA', startTime: '', endTime: '' },
      //           { taskName: '全部复位/自检', sample: 'NA', startTime: '', endTime: '' },
      //           { taskName: '集菌', sample: 'SID201705170001', startTime: '出生', endTime: '死亡' },
      //           { taskName: '培养', sample: 'SID201705170001', startTime: '出生', endTime: '死亡' }
      //   ]
      //   $scope.sampleList = [{ sampleName: '参麦注射液', supplier: '青春宝', category: '处方药品', ObjectNo: 'SID201705170001' },
      //           { sampleName: '丹参注射液', supplier: '青春宝', category: '处方药品', ObjectNo: 'SID201705170002' },
      //           { sampleName: '香丹注射液', supplier: '青春宝', category: '处方药品', ObjectNo: 'SID201705170003' },
      //           { sampleName: '鱼腥草注射液', supplier: '青春宝', category: '处方药品', ObjectNo: 'SID201705170004' },
      //           { sampleName: '抗衰老口服液', supplier: '青春宝', category: '非处方药品', ObjectNo: 'SID201705170005' }
      //   ]
      //   $scope.reagentList = [{ ReagentName: '葡萄糖', ExpiryDay: new Date(), ReagentType: '培养基', ReagentId: 'RID201705170001' },
      //           { ReagentName: '金黄色葡萄球菌', ExpiryDay: new Date(), ReagentType: '菌液', ReagentId: 'RID201705170002' },
      //           { ReagentName: '冲洗液', ExpiryDay: new Date(), ReagentType: '其他', ReagentId: 'RID201705170003' }
      //   ]

      //   $scope.newSampleQuery = {
      //     key: ['ObjectNo',
      //       'ObjCompany',
      //       'ObjIncuSeq',
      //       'ObjectName',
      //       'ObjectType',
      //       'SamplingPeople',
      //       'SamplingTime',
      //       'SamplingWay',
      //       'SamplingTool',
      //       'SamAmount',
      //       'DevideWay',
      //       'SamContain',
      //       'Warning',
      //       'SamSave',
      //       'RevisionInfo'
      //     ],
      //     name: ['产品编号',
      //       '供应商',
      //       '培养批次',
      //       '产品名字',
      //       '产品类型',
      //       '样品记录人员',
      //       '样品记录时间',
      //       '取样方法',
      //       '取样器具',
      //       '取样量',
      //       '分样方法',
      //       '样品容器',
      //       '注意事项',
      //       '储存条件',
      //       '更新记录'
      //     ],
      //     select: [false,
      //       true,
      //       false,
      //       true,
      //       true,
      //       true,
      //       true,
      //       false,
      //       false,
      //       true,
      //       false,
      //       true,
      //       false,
      //       false,
      //       false
      //     ],
      //     value: [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
      //   }
      //   $scope.newReagentQuery = {
      //     key: ['ReagentId',
      //       'ProductDay',
      //       'ReagentType',
      //       'ExpiryDay',
      //       'ReagentName',
      //       'ReagentTest',
      //       'SaveCondition',
      //       'Description',
      //       'RevisionInfo'
      //     ],
      //     name: [
      //       '试剂编号',
      //       '生产日期',
      //       '试剂类型',
      //       '保质期',
      //       '试剂名字',
      //       '试剂适用性试验',
      //       '储存方法',
      //       '冗余信息',
      //       '更新记录'
      //     ],
      //     select: [true, true, true, true, true, true, true, true, true],
      //     value: [null, null, null, null, null, null, null, null, null]

      //   }
      //   $scope.newTaskQuery = {}

      //       // Socket watch API
      //   SocketService.on('connect', function () {
      //           // console.log('Connected');
      //     $scope.status = 'Connected'
      //           // SocketService.emit("get workflow");
      //   })

      //   SocketService.on('disconnect', function () {
      //     $scope.status = 'No Connection'
      //   })

      //   SocketService.on('workflow', function (data) {
      //           // $scope.operationName = data.operations;
      //           // $scope.operationCode = data.operationCode;
      //           // $scope.instrument = data.instrument;
      //           // $scope.instrumentCode = data.instrumentCode;
      //     $scope.data = data
      //     console.log('already')
      //           // console.log($scope.data.operationName);
      //     $scope.flag = true
      //   })

      //   SocketService.on('message', function (data) {
      //           // console.log(data);
      //     $scope.status = 'Connected'
      //     var myChart = echarts.init(document.getElementById('main'))
      //     myChart.showLoading()
      //           // 指定图表的配置项和数据
      //     var option = {
      //       title: {
      //         text: $scope.text
      //       },
      //       tooltip: {},
      //       legend: {
      //         data: ['params']
      //       },
      //       xAxis: {
      //         data: []
      //       },
      //       yAxis: {},
      //       series: [{
      //         name: '销量',
      //         type: 'line',
      //         data: data.data
      //       }]
      //     }

      //           // 使用刚指定的配置项和数据显示图表。
      //     myChart.setOption(option)
      //     myChart.hideLoading()
      //   })

      //       // Restful APIs
      //   $scope.getWorkflow = function () {
      //     SocketService.emit('get workflow', '1')
      //     console.log('emited')
      //   }

      //       // 插入新的任务
      //   $scope.insertTask = function (index) {
      //     console.log({ taskName: $scope.procedure[index], sample: $scope.selected.sample + '|' + $scope.selected.reagent, startTime: '', endTime: '' })

      //     switch (index) {
      //       case 0:
      //         $scope.taskList.push({ taskName: $scope.procedure[index], sample: 'NA', startTime: '', endTime: '' })
      //         break
      //       case 1:
      //         $scope.taskList.push({ taskName: $scope.procedure[index], sample: 'NA', startTime: '', endTime: '' })
      //         break
      //       case 2:
      //         $scope.taskList.push({ taskName: $scope.procedure[index], sample: $scope.selected.sample + '|' + $scope.selected.reagent, startTime: '', endTime: '' })
      //         break
      //       case 3:
      //         $scope.taskList.push({ taskName: $scope.procedure[index], sample: $scope.selected.sample + '|' + $scope.selected.reagent, startTime: '', endTime: '' })
      //         break
      //     }
      //           // $scope.taskList.push({taskName:'集菌', sample:'白色枯草柑菌', startTime: '出生', endTime:'死亡'});
      //     $('#myModal').modal('hide')
      //     $rootScope.$apply()
      //   }

      //       // 插入新样品
      //   $scope.insertSample = function (query) {
      //     var realQuery = {}
      //     console.log(query)
      //     query.key.forEach(function (value, i) {
      //       if (query.select[i] == true) { realQuery[value] = query.value[i] }
      //     })
      //     console.log(realQuery)
      //     var time = new Date()
      //     objno = 'SID'
      //     objno += time.getFullYear().toString()
      //     objno += (time.getMonth() + 1 < 10) ? ('0' + (time.getMonth() + 1)).toString() : (time.getMonth() + 1).toString()
      //     objno += (time.getDate() < 10) ? ('0' + time.getDate()).toString() : (time.getDate()).toString()
      //     objno += '000' + $scope.sampleList.length.toString()
      //     console.log(objno)
      //     var temp = { sampleName: realQuery.ObjectName, supplier: realQuery.ObjCompany, category: realQuery.ObjectType, ObjectNo: objno }
      //     $scope.sampleList.push(temp)
      //     $rootScope.$apply()
      //   }

      //       // 插入新试剂
      //   $scope.insertReagent = function () {

      //   }

      //   $scope.stop = function (code, index) {
      //     bootbox.confirm({
      //       size: 'small',
      //       title: '中止操作',
      //       message: '是否中止操作' + code,
      //       callback: function (res) {
      //                   // console.log(res);
      //         if (res) {
      //           for (var i = 0; i < $scope.data.process.length; i++) {
      //             if (i >= index) {
      //               $scope.data.process[i] = 4
      //             }
      //           }
      //           bootbox.alert('中止')
      //         }

      //                   /* your callback code */
      //       }
      //     })
      //   }

      //   $scope.delete = function (index) {
      //     bootbox.confirm({
      //       size: 'small',
      //       title: '取消操作',
      //       message: '是否取消操作' + $scope.taskList[index].taskName,
      //       callback: function (res) {
      //         if (res) {
      //                       // while($scope.data.process.length == index + 1){
      //                       //     $scope.data.process.length.pop();
      //                       // }

      //                       // for (any in $scope.data){
      //                       //     console.log(any);
      //                       //     $scope.data[any].splice(index,1);
      //                       // }

      //           $scope.taskList.splice(index, 1)
      //           $rootScope.$apply()
      //         }
      //                   /* your callback code */
      //       }
      //     })
      //   }

      //   $scope.emergencyStop = function () {
      //     bootbox.confirm({
      //       size: 'small',
      //       title: '取消操作',
      //       message: '确认紧急暂停',
      //       callback: function (res) {
      //         if (res) {
      //           for (var i = 0; i < $scope.data.process.length; i++) {
      //             if ($scope.data.process[i] == 2) {
      //               $scope.data.process[i] = 4
      //             }
      //           }
      //         }
      //         $scope.$apply()
      //       }
      //     })
      //   }

      //   $scope.update = function () {
      //     bootbox.confirm({
      //       size: 'small',
      //       title: '清除已完成项目',
      //       message: '确认清除已完成项目',
      //       callback: function (res) {
      //         if (res) {
      //           for (var i = $scope.data.process.length - 1; i >= 0; i--) {
      //             if ($scope.data.process[i] == 1 || $scope.data.process[i] == 4) {
      //               $scope.data.process[i] = 0
      //             }
      //           }
      //         }
      //         $scope.$apply()
      //       }
      //     })
      //   }

      //       // 样品记录表-插数据
      //   $scope.PostNewSample = function (newSampleQuery) {
      //           // console.log(newSampleQuery);
      //     v = newSampleQuery.value

      //           // 产品编号

      //           // 供应商批次 001

      //           // 人员

      //           // 时间

      //     ob = {}

      //     for (var n in newSampleQuery.key) {
      //       ob[key] = newSampleQuery.value
      //     }

      //           // post ob

      //     $('#myModal2').modal('hide')
      //   }

      //       // 获得没有取样的样品列表
      }
    ])

    // 主菜单栏(个人信息)--张桠童
    .controller('MainCtrl', ['$scope', 'CONFIG', 'Storage', 'Data', '$state',
      function ($scope, CONFIG, Storage, Data, $state) {
        // $scope.userInfo = {}
        // var userInfoQuery = {
        //   'UserId': Storage.get('UID'),
        //   'Identify': 0,
        //   'PhoneNo': 0,
        //   'UserName': 1,
        //   'Role': 1,
        //   'Password': 0,
        //   'LastLoginTime': 1,
        //   'RevisionInfo': 0
        // }
        // var promise = UserService.GetUserInfo(userInfoQuery)
        // promise.then(function (data) {
        //   $scope.userInfo = data
        //         // console.log($scope.userInfo);
        // }, function (err) {})
        // $scope.toChangePW = function () {
        //   $state.go('changePassword')
        // }
        // $scope.ifOut = function () {
        //   $('#myModal1').modal('show')
        // }
        // $scope.toLogin = function () {
        //   $('#myModal1').modal('hide').on('hidden.bs.modal', function () {
        //     Storage.rm('UID')
        //     $state.go('login')
        //   })
        // }
      }
    ])
