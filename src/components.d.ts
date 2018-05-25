/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}


declare global {

  namespace StencilComponents {
    interface EpicContentful {
      /**
       * The base URL for Contentful API
       */
      'baseURL': string;
      /**
       * The content type of the requested contentful entry
       */
      'contentType': string;
      /**
       * disables the component. prevents api calls and events, etc.
       */
      'disabled': boolean;
      /**
       * The sys id of a contentful entry. Used to access a single entry by its id.
       */
      'entryId': string;
      /**
       * Which environment from which to pull entries
       */
      'environment': string;
      /**
       * Comma separated list of fields to include with the entry response.
       */
      'fields': string;
      /**
       * limits the entries to the number specified
       */
      'limit': number;
      /**
       * The field to use to sort the entries
       */
      'orderBy': string;
      /**
       * an optional search param string
       */
      'params': string;
      /**
       * The number of entries to skip
       */
      'skip': number;
      /**
       * The id of the contentful space
       */
      'space': string;
      /**
       * Access token generated to interface with specific contentful environments
       */
      'token': string;
    }
  }

  interface HTMLEpicContentfulElement extends StencilComponents.EpicContentful, HTMLStencilElement {}

  var HTMLEpicContentfulElement: {
    prototype: HTMLEpicContentfulElement;
    new (): HTMLEpicContentfulElement;
  };
  interface HTMLElementTagNameMap {
    'epic-contentful': HTMLEpicContentfulElement;
  }
  interface ElementTagNameMap {
    'epic-contentful': HTMLEpicContentfulElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'epic-contentful': JSXElements.EpicContentfulAttributes;
    }
  }
  namespace JSXElements {
    export interface EpicContentfulAttributes extends HTMLAttributes {
      /**
       * The base URL for Contentful API
       */
      'baseURL'?: string;
      /**
       * The content type of the requested contentful entry
       */
      'contentType'?: string;
      /**
       * disables the component. prevents api calls and events, etc.
       */
      'disabled'?: boolean;
      /**
       * The sys id of a contentful entry. Used to access a single entry by its id.
       */
      'entryId'?: string;
      /**
       * Which environment from which to pull entries
       */
      'environment'?: string;
      /**
       * Comma separated list of fields to include with the entry response.
       */
      'fields'?: string;
      /**
       * limits the entries to the number specified
       */
      'limit'?: number;
      'onEntrieschange'?: (event: CustomEvent) => void;
      /**
       * The field to use to sort the entries
       */
      'orderBy'?: string;
      /**
       * an optional search param string
       */
      'params'?: string;
      /**
       * The number of entries to skip
       */
      'skip'?: number;
      /**
       * The id of the contentful space
       */
      'space'?: string;
      /**
       * Access token generated to interface with specific contentful environments
       */
      'token'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;