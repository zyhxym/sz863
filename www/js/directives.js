angular.module('directives', [])
    .directive('popover', function () {
      return function (scope, elem) {
        elem.popover()
      }
    })

    .directive('autoProgress', function () {
      return {
        restrict: 'A',
        scope: {
          autoProgress: '='
        },
        // replace: true,   //使用replace之后, 本元素的click不能删除输入框中的内容, 原因大致可以理解为: 父元素被替换后, scope.$apply没有执行对象
        link: function (scope, element, attrs) {
          // console.log(scope.autoProgress)
          var score = scope.autoProgress
          attrs.ariaValuemin = 0
          attrs.ariaValuemax = 100
          attrs.ariaValuenow = score
          element[0].innerHTML = score
          if (score < 40) {
            $(element[0]).addClass('progress-bar-danger')
          } else if (score < 60) {
            $(element[0]).addClass('progress-bar-warning')
          } else if (score < 85) {
            $(element[0]).addClass('progress-bar-info')
          } else {
            $(element[0]).addClass('progress-bar-success')
          }
          $(element[0]).css('width', score + '%')
        }
      }
    })
