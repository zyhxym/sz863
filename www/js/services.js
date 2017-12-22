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
      // 本体录入
      var Ontology = function () {
        return $resource(CONFIG.baseUrl + ':path/:route', {
          path: 'OntRead'
        }, {
          readONT: { method: 'POST', params: { route: 'readModel' }, timeout: 10000 },
          validateONT: { method: 'GET', params: { route: 'validModel' }, timeout: 10000 }

        })
      }

        // 检测结果-张桠童
      var Result = function () {
        return $resource(CONFIG.baseUrl + ':path/:route', { path: 'Result' }, {
          GetTestResultInfo: { method: 'POST', params: { route: 'ResTestResultGetResultInfosByAnyProperty' }, timeout: 10000, isArray: true },
          GetBreakDowns: { method: 'POST', params: { route: 'BreakDownGetBreakDownsByAnyProperty' }, timeout: 10000, isArray: true }

        })
      }
        // 仪器信息-张桠童
      var Operation = function () {
        return $resource(CONFIG.baseUrl + ':path/:route', { path: 'Operation' }, {
          GetEquipmentOps: { method: 'POST', params: { route: 'OpEquipmentGetEquipmentOpsByAnyProperty' }, timeout: 10000, isArray: true }
        })
      }

      serve.abort = function ($scope) {
        abort.resolve()
        $interval(function () {
          abort = $q.defer()

          serve.Ontology = Ontology()
          // serve.ItemInfo = ItemInfo()
          serve.Result = Result()
          serve.Operation = Operation()
        }, 0, 1)
      }

      serve.Ontology = Ontology()
      // serve.ItemInfo = ItemInfo()
      serve.Result = Result()
      serve.Operation = Operation()
      return serve
    }])

        // 获取仪器信息--张桠童
    .factory('Ontology', ['$http', '$q', 'CONFIG', 'Data', function ($http, $q, CONFIG, Data) {
      var self = this
        // 获取检测结果信息表
      self.readONT = function (obj) {
        var deferred = $q.defer()
        Data.Ontology.readONT(obj, function (data, headers) {
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

    // 获取检测结果--张桠童
    .factory('Result', ['$http', '$q', 'Storage', 'Data', function ($http, $q, Storage, Data) {
      var self = this
        // 获取检测结果信息表
      self.GetTestResultInfo = function (obj) {
        var deferred = $q.defer()
        Data.Result.GetTestResultInfo(obj, function (data, headers) {
          deferred.resolve(data)
        }, function (err) {
          deferred.reject(err)
        })
        return deferred.promise
      }
      self.GetBreakDowns = function (obj) {
        var deferred = $q.defer()
        Data.Result.GetBreakDowns(obj, function (data, headers) {
          deferred.resolve(data)
        }, function (err) {
          deferred.reject(err)
        })
        return deferred.promise
      }
      return self
    }])

    // 获取仪器信息--张桠童
    .factory('Operation', ['$http', '$q', 'Storage', 'Data', function ($http, $q, Storage, Data) {
      var self = this
        // 获取检测结果信息表
      self.GetEquipmentOps = function (obj) {
        var deferred = $q.defer()
        Data.Operation.GetEquipmentOps(obj, function (data, headers) {
          deferred.resolve(data)
        }, function (err) {
          deferred.reject(err)
        })
        return deferred.promise
      }
      return self
    }])
