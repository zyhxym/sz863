angular.module('services', ['ngResource'])

    .factory('Storage', ['$window', function ($window) {
      return {
        set: function (key, value) {
          $window.localStorage.setItem(key, value)
        },
        get: function (key) {
          return $window.localStorage.getItem(key)
        },
        rm: function (key) {
          $window.localStorage.removeItem(key)
        },
        clear: function () {
          $window.localStorage.clear()
        }
      }
    }])

    .constant('CONFIG', {
      baseUrl: 'http://localhost:1420/api/', // RESTful 服务器
      localUrl: 'E:/1实验室/9 深圳863项目结题/深圳863—知识库/OWL and Rules/',
      model: 'RMDK v1.2.owl'

        /* List all the roles you wish to use in the app
         * You have a max of 31 before the bit shift pushes the accompanying integer out of
         * the memory footprint for an integer
         */
    })

    .factory('Data', ['$resource', '$q', '$interval', 'CONFIG', 'Storage', function ($resource, $q, $interval, CONFIG, Storage) {
      var serve = {}
      var abort = $q.defer
      // 本体
      var Ontology = function () {
        return $resource(CONFIG.baseUrl + ':path/:route', {
          path: 'OntRead'
        }, {
            // 录入本体
          readONT: { method: 'POST', params: { route: 'readModel', url: '@url', model: '@model'}, timeout: 10000 },
          // 验证之前录入是否超过时限
          validateONT: { method: 'GET', params: { route: 'validModel' }, timeout: 10000 }

        })
      }
      // 诊断
      var Diagnosis = function () {
        return $resource(CONFIG.baseUrl + ':path/:route', { path: 'Evaluation' }, {
            // 风险因子
          riskFactor: { method: 'GET', params: { route: 'RiskFactor', guid: '@guid' }, timeout: 1000 }

        })
      }

        // 评估结果
        // {guid:P000125}
      var Evaluation = function () {
        return $resource(CONFIG.baseUrl + ':path/:route', { path: 'Diagnose' }, {
          evaluateScore: { method: 'GET', params: { route: 'CGEvalutaion', guid: '@guid', flag: 1 }, timeout: 1000 }

        })
      }

      serve.abort = function ($scope) {
        abort.resolve()
        $interval(function () {
          abort = $q.defer()

          serve.Ontology = Ontology()
          serve.Evaluation = Evaluation()
        }, 0, 1)
      }

      serve.Ontology = Ontology()
      serve.Evaluation = Evaluation()
      return serve
    }])

        // 获取仪器信息--张桠童
    .factory('Ontology', ['$http', '$q', 'CONFIG', 'Data', function ($http, $q, CONFIG, Data) {
      var self = this
        // 获取检测结果信息表
      self.readONT = function (obj) {
        var deferred = $q.defer()
        Data.Ontology.readONT({url: CONFIG.localUrl, model: CONFIG.model}, function (data, headers) {
          deferred.resolve(data)
        }, function (err) {
          deferred.reject(err)
        })
        return deferred.promise
      }

      self.validateONT = function (obj) {
        var deferred = $q.defer()
        Data.Ontology.validateONT(obj, function (data, headers) {
          deferred.resolve(data)
        }, function (err) {
          deferred.reject(err)
        })
        return deferred.promise
      }
      return self
    }])

    // 评估结果
    .factory('Evaluation', ['$http', '$q', 'Storage', 'Data', function ($http, $q, Storage, Data) {
      var self = this
      self.evaluateScore = function (obj) {
        var deferred = $q.defer()
        Data.Evaluation.evaluateScore(obj, function (data, headers) {
          deferred.resolve(data)
        }, function (err) {
          deferred.reject(err)
        })
        return deferred.promise
      }
      return self
    }])
