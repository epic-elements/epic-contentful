import Rx from 'rx-dom';
'use strict';

class EpicContentful extends HTMLElement {

   constructor() {
      super();
   }

  createdCallback() {
      // Creates stream of lifecycle Events
      let lifecycleStream = Rx.DOM.fromEvent(this, 'lifecycle-changed').map(x=>({value: x.detail.value}));

      // Fires 'created' lifecycle event
      this.dispatchEvent(new CustomEvent('lifecycle-changed', { detail: {value:'created'}}));

      let requiredAttributes = [{
        name: 'token'
      },{
        name: 'space'
      },{
        name: 'content-type'
      },{
        name: 'resource-type',
        value: 'entries'
      }];

      let requiredAttributesStream = this.observeRequiredAttributes(requiredAttributes);
      
      // Creates a request URL from attribute streams
      let requestURLStream = this.computeBaseURL(requiredAttributesStream);
      let contentfulStream = this.sendRequest(requestURLStream);

      // Fires 'ready' lifecycle event
      requiredAttributesStream.subscribe(x=>this.dispatchEvent(new CustomEvent('lifecycle-changed', { detail: {value:'ready'}})));
      
      // Fires 'response' event when contentful returns a response
      contentfulStream.subscribe(x=>this.dispatchEvent(new CustomEvent('response', { detail: x})));
      lifecycleStream.subscribe(x=>console.log(x));
      
  }

  observeRequiredAttributes(requiredAttributes){
      // Creates a stream for all attribute changes
      let attributesStream = Rx.Observable.merge(
        Rx.Observable.from(Array.from(this.attributes)).map(x=>({name: x.name, value: x.value, oldValue: x.oldValue})),
        Rx.DOM.fromEvent(this, 'attribute-changed').map(x=>({name: x.detail.name, value: x.detail.value, oldValue: x.oldValue}))
      );
      
      // Creates stream for specific attributes
      let requiredAttributesStreams = requiredAttributes.map(x=>attributesStream.filter(i=>x && x.name===i.name));
      
      // Creates a stream of required attributes
      let combinedRequiredAttributesStreams = Rx.Observable.combineLatest(requiredAttributesStreams).map(x=>{
        return x.reduce((y,z)=>{y[z.name] = z.value;return y;},{})
      });

      // Sets Attribute Defaults
      requiredAttributes.forEach(x=>{
        x.value = x.value || '';
        this.setAttribute(x.name, this.getAttribute(x.name) || x.value);
       });

       return combinedRequiredAttributesStreams;
  }

  attachedCallback(){
      // Fires 'attached' lifecycle event
      this.dispatchEvent(new CustomEvent('lifecycle-changed', { detail: {value:'attached'}}));
  }

  attributeChangedCallback(name, oldValue, newValue){
      this.dispatchEvent(new CustomEvent('attribute-changed', { detail: {name: name, value: newValue, oldValue: oldValue || ''}}));
  }

  computeBaseURL(requiredAttributesStream) {
    return requiredAttributesStream.map(x=>{
      return Rx.Observable.if(()=>x['content-type'],
        Rx.Observable.return(x).map(x=>{
          x['content-type'] = `&content_type=${x['content-type']}`;
          return x
        }),
        Rx.Observable.return(x))
     })
     .flatMap(x=>x)
     .map(x=>`https://cdn.contentful.com/spaces/${x['space']}/${x['resource-type']}?access_token=${x['token']}${x['content-type']}`)
     .distinctUntilChanged();
  }

  sendRequest(requestURLStream){
        return requestURLStream.flatMap(x=>Rx.DOM.ajax({url: x,responseType: 'json'})).map(x=>x.response);
    }

}

document.registerElement('epic-contentful', EpicContentful);
export default EpicContentful;
