import Rx from 'rx-dom';
import EpicContentful from 'epic-contentful';

Rx.DOM.fromEvent(document.querySelector('epic-contentful'), 'response').subscribe(x=>console.log(x));