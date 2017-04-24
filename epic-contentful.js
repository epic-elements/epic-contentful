'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var EpicContentful = function () {
    function EpicContentful() {
      _classCallCheck(this, EpicContentful);
    }

    _createClass(EpicContentful, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'epic-contentful';

        this.properties = {
          token: {
            type: String,
            notify: true,
            value: ''
          },
          space: {
            type: String,
            notify: true,
            value: ''
          },
          host: {
            type: String,
            notify: true,
            value: ''
          },
          client: {
            type: Object,
            notify: true,
            computed: '_computeClient(disabled, token, space)'
          },
          entryId: {
            type: String,
            notify: true,
            value: ''
          },
          entry: {
            type: Object,
            notify: true,
            observer: '_entryChanged'
          },
          entries: {
            type: Array,
            notify: true,
            value: function value() {
              return {};
            }
          },
          contentType: {
            type: String,
            notify: true,
            value: '',
            observer: '_contentTypeChanged'
          },
          contentTypeSchema: {
            type: Object,
            notify: true,
            observer: '_contentTypeSchemaChanged'
          },
          mode: {
            type: String,
            notify: true,
            value: 'entries'
          },
          searchParams: {
            type: Object,
            notify: true,
            value: function value() {
              return {};
            }
          },
          /*
            Indicates "skip" value passed in contentful query. Helpful for pagination.
          */
          skip: {
            type: Number,
            notify: true,
            value: 0 // default for contentful
          },
          /*
            Indicates 'limit' value passed in contentful query. Helpful for pagination.
          */
          limit: {
            type: Number,
            notify: true,
            value: 100 // default for contentful
          },
          /*
            Indicates 'order' value passed in contenful query.
            Contentful does not specify default, seems to be arbitrary.
          */
          orderBy: {
            type: String,
            notify: true,
            value: ''
          },
          debounceDuration: {
            type: Number,
            notify: true,
            value: '500'
          },
          disabled: {
            type: Boolean,
            notify: true,
            value: false
          }
        };

        this.observers = [
        // '_getSingleEntry(client, entryId, mode)',
        // '_getContentTypeSchema(client, contentType, mode)',
        '_getEntries(disabled, client, searchParams.*, mode, debounceDuration)'];
      }

      // Property Observer Methods

    }, {
      key: '_getSingleEntry',
      value: function _getSingleEntry(client, entryId, mode) {
        var _this = this;

        if (!client || Object.keys(client).length < 1 || !entryId || mode !== 'entry') {
          this.entry = {};
        } else {
          this.debounce('getEntry', function () {
            client.getEntry(entryId).then(function (entry) {
              return _this.entry = entry || {};
            }.bind(_this));
          });
        }
      }
    }, {
      key: '_getEntries',
      value: function _getEntries(disabled, client, searchParams, mode, debounceDuration) {
        var _this2 = this;

        if (!disabled) {
          this.debounce('getEntries', function () {
            if (client && Object.keys(client).length > 0 && searchParams.base && Object.keys(searchParams.base).length > 0 && mode === 'entries') {

              // modify searchParams
              searchParams.base.limit = _this2.limit;
              searchParams.base.skip = _this2.skip;
              searchParams.base.order = _this2.orderBy;
              console.log(searchParams.base);

              client.getEntries(searchParams.base).then(function (entries) {
                _this2.entries = entries;
              }.bind(_this2));
            }
          }, debounceDuration);
        }
      }
    }, {
      key: '_getContentTypeSchema',
      value: function _getContentTypeSchema(client, contentType, mode) {
        var _this3 = this;

        if (!client || Object.keys(client).length < 1 || !contentType) {
          this.contentTypeSchema = {};
        } else {
          this.debounce('getContentType', function () {
            client.getContentType(contentType).then(function (contentTypeSchema) {
              return _this3.contentTypeSchema = contentTypeSchema || {};
            }.bind(_this3));
          });
        }
      }

      // Computed Property Methods

    }, {
      key: '_computeClient',
      value: function _computeClient(disabled, token, space) {
        if (disabled || !token || !space) {
          return;
        } else {
          return contentful.createClient({
            space: space,
            accessToken: token
          });
        }
      }
    }, {
      key: '_contentTypeChanged',
      value: function _contentTypeChanged(contentType) {
        this.searchParams = Object.assign({}, this.searchParams, {
          content_type: contentType
        });
      }

      // Event Handlers

    }, {
      key: '_handleConfigChange',
      value: function _handleConfigChange(event) {
        this.searchParams = Object.assign({}, this.searchParams, event.detail.value);
      }

      // Lifecycle callbacks

    }, {
      key: 'ready',
      value: function ready() {
        var _this4 = this;

        this.getContentChildren('#params').forEach(function (node) {
          _this4.listen(node, 'config-changed', '_handleConfigChange');
        });
      }
    }]);

    return EpicContentful;
  }();
  // Register the element using Polymer's constructor.


  Polymer(EpicContentful);
})();
