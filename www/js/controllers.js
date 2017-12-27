angular.module('controllers', ['ngResource', 'services'])

    .controller('LoginCtrl', ['$scope', '$state', 'Storage', 'Ontology', function($scope, $state, Storage, Ontology) {
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
            User.set('marry', { password: 'marry,,,', role: 'doctor' })
            User.set('kingsley', { password: 'kingsley,,,', role: 'administrator' })
            return function(logInfo) {
                var result = User.get(logInfo.name)
                console.log(result)
                if (result) {
                    return (result.password === logInfo.password && result.role === logInfo.role) ? logInfo.name : undefined
                }
            }
        }())

        $scope.LogIn = function(login) {
            var user = findUser(login)

            if (user) {
                // 可能是管理员 也可能是 医生
                $scope.logStatus = '恭喜您！登录成功。'

                if (login.role === 'doctor') {
                    Storage.set('currentUser', user)
                    Storage.set('currentrole', login.role)

                    console.log(user)
                    // currentUser记录当前登录用户

                    Ontology.readONT().then(function(data) {
                        // 本体读入
                        $state.go('main.selectlist.select')
                    })
                } else {

                }
            } else {
                $scope.logStatus = '用户名或密码错误。'
            }
        }
    }])

    .controller('MainCtrl', ['$scope', 'Storage', '$state', 'InfoInput',
        function($scope, Storage, $state, InfoInput) {
            Storage.set("ifpatient", false)
            $scope.ifpatient = Storage.get("ifpatient")
            InfoInput.PatientInfo({ guid: Storage.get('currentPatient') }).then(function(data) {
                console.log(data)
                $scope.user = data
            })
            $scope.UserName = Storage.get('currentUser')
            $scope.Role = Storage.get('currentrole')
            $scope.logout = function() {
                $state.go('login')
                Storage.clear()
            }
            $scope.toMain = function() {
                $state.go('main.selectlist.select')
            }
        }
    ])

    // 主菜单栏
    .controller('MonitorsCtrl', ['$scope', 'Storage', '$state',
        function($scope, Storage, $state) {
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

    .controller('inputCtrl', ['$scope', 'Storage', 'Data', '$state',
        function($scope, Storage, Data, $state) {
            $scope.accept = function() {
                console.log('确认了')
                $state.go('main.monitors.inspection')
            }
            $scope.cancel = function() {
                $scope.textInfo = {}
            }
        }
    ])

    .controller('inspectionCtrl', ['$scope', 'Storage', '$state', 'ExamRecommended',
        function($scope, Storage, $state, ExamRecommended) {
            var id = Storage.get('currentPatient')
            ExamRecommended.getScreenRec(id).then(function(data) {
                // console.log(data)
                $scope.screens = data
            })
            ExamRecommended.getExamRec(id).then(function(data) {
                // console.log(data)
                $scope.exams = data
            })
        }

    ])
    .controller('riskCtrl', ['$scope', 'Storage', 'Diagnosis', '$state',
        function($scope, Storage, Diagnosis, $state) {
            Diagnosis.riskFactor({ guid: Storage.get('currentPatient') }).then(function(data) {
                $scope.risk = data
            })
        }
    ])

    .controller('medicineCtrl', ['$scope', 'Storage', 'MedicationRec', '$state',
        function($scope, Storage, MedicationRec, Data, $state) {

            var DList = new Array()
            var DListA = new Array()
            var DListC = new Array()

            MedicationRec.drugsRec({ guid: Storage.get('currentPatient') }).then(function(data) {
                console.log(data)
                $scope.DList = data.DListName
                $scope.DListA = data.DListAName
                $scope.DListC = data.DListCName
                DList = data.DList
                DListA = data.DListA
                DListC = data.DListC

            })

            $scope.modal_close = function(target) {
                $(target).modal('hide')
            }

            $scope.showinfo = function(style, index) {
                console.log($scope.DList[index])
                switch (style) {
                    case 1:
                        MedicationRec.drugsInfo({ DIn: DList[index] }).then(function(data) {
                            console.log(data)
                            $scope.info = data
                        })
                        break
                    case 2:
                        MedicationRec.drugsInfo({ DIn: DListA[index] }).then(function(data) {
                            console.log(data)
                            $scope.info = data
                        })
                        break
                    case 3:
                        MedicationRec.drugsInfo({ DIn: DListC[index] }).then(function(data) {
                            console.log(data)
                            $scope.info = data
                        })
                        break
                }
                $('#drugdetail').modal('show')
            }
        }
    ])
    .controller('lifeCtrl', ['$scope', 'Storage', 'LifeAdivce', '$state',
        function($scope, Storage, LifeAdivce, $state) {
            LifeAdivce.dietRec({ guid: Storage.get('currentPatient') }).then(function(data) {
                $scope.dietrec = data
            })
            LifeAdivce.exerciseRec({ guid: Storage.get('currentPatient') }).then(function(data) {
                $scope.exerreclist = data.exerinfo
            })
            LifeAdivce.controlGoal({ guid: Storage.get('currentPatient') }).then(function(data) {
                console.log(data)
                $scope.ctrl = data
            })
        }
    ])
    .controller('assessCtrl', ['$scope', 'Storage', 'Evaluation', '$state', 'LifeAdivce', '$q',
        function($scope, Storage, Evaluation, $state, LifeAdivce, $q) {
            var id = Storage.get('currentPatient')

            Evaluation.evaluateScore({ guid: id }).then(function(data) {
                var keys = [
                    { word: 'BMI', code: 'bmi' },
                    { word: '收缩压', code: 'sys' },
                    { word: '舒张压', code: 'dia' },
                    { word: '空腹血糖', code: 'glu' },
                    { word: '糖耐受2小时后血糖', code: 'glu2h' },
                    { word: '糖化血红蛋白', code: 'hba1c' },
                    { word: '高密度脂蛋白胆固醇', code: 'hdl' },
                    { word: '低密度脂蛋白胆固醇', code: 'ldl' },
                    { word: '总胆固醇', code: 'tc' },
                    { word: '甘油三酯', code: 'tg' },
                    { word: '尿白蛋白/肌酐比值', code: 'acr' },
                    { word: '尿白蛋白排泄率', code: 'uae' }
                ]
                var results = new Map()
                // console.log(data)
                $scope.hellos = [{ score: data.total }]
                // console.log($scope.totalScore)
                data.score.forEach(function(value, index) {
                    if (value != -1) {
                        results.set(keys[index].code, { key: keys[index].word, score: value })
                    }
                })

                $q.all([LifeAdivce.controlGoal({ guid: id }), LifeAdivce.patControl({ guid: id })]).then(function(data) {
                    var arr = []
                    console.log(data)
                    for (var [key, value] of results) {
                        value.control = data[0][key]
                        value.personal = data[1][key]
                        arr.push(value)
                    }
                    $scope.items = arr
                })
            })
        }

    ])
    .controller('selectCtrl', ['$scope', 'Storage', 'Data', '$state', 'riskToONT', 'InfoInput',
        function($scope, Storage, Data, $state, riskToONT, InfoInput) {
            var userlist = new Array()
            InfoInput.PatientInfo({ guid: "P000125" }).then(function(data) {
                console.log(data)
                userlist.push(data)
            })
            InfoInput.PatientInfo({ guid: "P000126" }).then(function(data) {
                console.log(data)
                userlist.push(data)
            })
            InfoInput.PatientInfo({ guid: "P000121" }).then(function(data) {
                console.log(data)
                userlist.push(data)
            })
            $scope.userlist = userlist
            $scope.toUserDetail = function(ID) {
                Storage.set('currentPatient', ID)
                riskToONT.normalRisk(ID)
                riskToONT.stateRisk(ID)
                // currentPatient记录当前选择的患者
                $state.go('main.monitors.inspection')
            }
        }
    ])

    .controller('selectlistCtrl', ['$scope', 'Storage', 'Data', '$state', 'riskToONT',
        function($scope, Storage, Data, $state, riskToONT) {
            $scope.createPats = function() {
                $state.go('main.selectlist.input')
            }
            $scope.currentPats = function() {
                $state.go('main.selectlist.select')
            }
        }
    ])