'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var EpicContentfulParams = function () {
    function EpicContentfulParams() {
      _classCallCheck(this, EpicContentfulParams);
    }

    _createClass(EpicContentfulParams, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'epic-contentful-params';
        this.properties = {
          property: {
            type: String,
            notify: true,
            value: ''
          },
          value: {
            type: String,
            notify: true,
            value: ''
          },
          operator: {
            type: String,
            notify: true,
            value: ''
          },
          config: {
            type: Object,
            notify: true,
            computed: '_computeConfig(property, value)'
          }
        };
      }
    }, {
      key: '_computeConfig',
      value: function _computeConfig(property, value) {
        var obj = {};
        if (!property || !value) {
          return obj;
        } else {
          obj[property] = value;
          return obj;
        }
      }
    }]);

    return EpicContentfulParams;
  }();
  // Register the element using Polymer's constructor.


  Polymer(EpicContentfulParams);
})();
