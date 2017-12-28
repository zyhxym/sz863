angular.module('filters', [])

    .filter('timeFormat', [function () {
      return function (date, format) {
        var d = new Date(date)
        var ret = ''
        if (date == null) { return '-' }
        switch (format) {
          case 'YYYY-MM-DD':
            ret = d.getFullYear() + '-' + (Array(2).join('0') + (d.getMonth() + 1)).slice(-2) + '-' + (Array(2).join('0') + d.getDate()).slice(-2)
            break
          case 'MM-DD-YYYY':
            ret = (Array(2).join('0') + (d.getMonth() + 1).slice(-2)) + '-' + (Array(2).join('0') + d.getDate()).slice(-2) + '-' + d.getFullYear()
            break
          case 'YYYY-MM-DD h:m':
            ret = d.getFullYear() + '-' + (Array(2).join('0') + (d.getMonth() + 1)).slice(-2) + '-' + (Array(2).join('0') + d.getDate()).slice(-2) + ' ' + (Array(2).join('0') + d.getHours()).slice(-2) + ':' + (Array(2).join('0') + d.getMinutes()).slice(-2)
            break
        }
        return ret
      }
    }])

    .filter('negativeFix', [function () {
      return function (number) {
        return number == -1 ? '暂未录入指标' : number
      }
    }])

    .filter('arraytostring', [function () {
      return function (type) {
        var name = ''
        if (type == null) {
          name = ''
        } else {
          for (i = 0; i < type.length; i++) {
            name = name + type[i] + ' '
          }
        }
        if (name == '') { name = '暂未录入指标' }
        return name
      }
    }])

    // .filter('Fix', [function () {
    //   return function (type) {
    //     var name = ''
    //     if (type == '-1') {
    //       name = '暂无录入指标'
    //     } else { name = type }
    //     return name
    //   }
    // }])
