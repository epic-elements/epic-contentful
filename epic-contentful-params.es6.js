
  (function() {
    'use strict';
    class EpicContentfulParams {
      beforeRegister() {
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
          },
        };
      }

      _computeConfig(property, value){
          var obj = {};
          if(!property || !value){
              return obj;
          } else {
              obj[property] = value;
              return obj;
          }
      }
    }
    // Register the element using Polymer's constructor.
    Polymer(EpicContentfulParams);
  })();
