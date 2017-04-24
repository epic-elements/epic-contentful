(function() {
  'use strict';

  class EpicContentful {

    beforeRegister() {
      this.is = 'epic-contentful';

      this.properties = {
        token: {
          type: String,
          notify: true,
          value: '',
        },
        space: {
          type: String,
          notify: true,
          value: '',
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
          value: () => ({})
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
          value: () => ({})
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
          Note you can prepend "-" to this to get reverse order.
        */
        orderBy: {
          type: String,
          notify: true,
          value: ''
        },
        debounceDuration: {
          type: Number,
          notify: true,
          value: '500',
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
        '_getEntries(disabled, client, searchParams.*, mode, debounceDuration)',
      ];
    }

    // Property Observer Methods

    _getSingleEntry(client, entryId, mode) {
      if (!client || Object.keys(client).length < 1 || !entryId || mode !== 'entry') {
        this.entry = {};
      } else {
        this.debounce('getEntry', () => {
          client.getEntry(entryId)
            .then(((entry) => this.entry = entry || {}).bind(this));
        })

      }
    }

    _getEntries(disabled, client, searchParams, mode, debounceDuration) {
      if (!disabled) {
        this.debounce('getEntries', () => {
          if (client && Object.keys(client).length > 0 && searchParams.base && Object.keys(searchParams.base).length > 0 && mode === 'entries') {

            // modify searchParams
            searchParams.base.limit = this.limit;
            searchParams.base.skip = this.skip;
            searchParams.base.order = this.orderBy;

            client.getEntries(searchParams.base)
              .then(((entries) => {
                  this.entries = entries;
                }).bind(this)
              );
          }
        }, debounceDuration);
      }
    }

    _getContentTypeSchema(client, contentType, mode) {
      if (!client || Object.keys(client).length < 1 || !contentType) {
        this.contentTypeSchema = {};
      } else {
        this.debounce('getContentType', () => {
          client.getContentType(contentType)
            .then(((contentTypeSchema) => this.contentTypeSchema = contentTypeSchema || {}).bind(this))
        });
      }
    }

    // Computed Property Methods

    _computeClient(disabled, token, space) {
      if (disabled || !token || !space) {
        return;
      } else {
        return contentful.createClient({
          space: space,
          accessToken: token
        })
      }
    }

    _contentTypeChanged(contentType) {
      this.searchParams = Object.assign({}, this.searchParams, {
        content_type: contentType
      });
    }

    // Event Handlers

    _handleConfigChange(event) {
      this.searchParams = Object.assign({}, this.searchParams, event.detail.value);
    }

    // Lifecycle callbacks

    ready() {
      this.getContentChildren('#params').forEach((node) => {
        this.listen(node, 'config-changed', '_handleConfigChange');
      });
    }
  }
  // Register the element using Polymer's constructor.
  Polymer(EpicContentful);
})();
