import {
  Component,
  Prop,
  State,
  Watch,
  Event,
  EventEmitter
} from '@stencil/core';

@Component({
  tag: 'epic-contentful'
})
export class EpicContentful {
  /**
   * Access token generated to interface with specific contentful environments
   */
  @Prop() token: string;

  /**
   * The id of the contentful space
   */
  @Prop() space: string;

  /**
   * The base URL for Contentful API
   */
  @Prop() baseURL: string = 'https://cdn.contentful.com';

  /**
   * The sys id of a contentful entry.
   * Used to access a single entry by its id.
   */
  @Prop() entryId: string;

  /**
   * The content type of the requested contentful entry
   */
  @Prop() contentType: string;

  /**
   * an optional search param string
   */
  @Prop() params: string = '';

  /**
   * The number of entries to skip
   */
  @Prop() skip: number;

  /**
   * limits the entries to the number specified
   */
  @Prop() limit: number;

  /**
   * The field to use to sort the entries
   */
  @Prop() orderBy: string;

  /**
   * disables the component. prevents api calls and events, etc.
   */
  @Prop() disabled: boolean = false;

  /**
   * Comma separated list of fields to include with the entry response.
   */
  @Prop() fields: string;

  /**
   * Which environment from which to pull entries
   */
  @Prop() environment: string = 'master';

  /**
   * The client object to make api call
   */
  @State() requestUrl: string;

  @Watch('requestUrl')
  requestUrlChangeHandler(val, oldVal) {
    if (val === oldVal) {
      return;
    }
    this.getEntries();
  }

  /**
   * The client object to make api call
   */
  @State() response: any;
  @Watch('response')
  responseChangeHandler(val) {
    this.entries = val.items ? val.items : [];
    this.includes = val.includes ? val.includes : [];
  }

  /**
   * The resulting entries returned by the
   * contentful api call.
   */
  @State() entries: Array<any> = [];
  @Watch('entries')
  entriesChangeHandler(val, oldVal) {
    console.log(val, oldVal);
    this.entrieschange.emit(val);
  }

  /**
   * The resulting includes associated with
   * the returned entries.
   */
  @State() includes: Array<any> = [];
  @Watch('includes')
  includesChangedHandler(val, oldVal) {
    console.log(val, oldVal);
    this.includeschange.emit(val);
  }

  @Event() entrieschange: EventEmitter;
  @Event() includeschange: EventEmitter;

  /**
   * The component is about to load and it has not
   * rendered yet.
   *
   * This is the best place to make any data updates
   * before the first render.
   *
   * componentWillLoad will only be called once.
   */
  componentWillLoad() {
    console.log('Component is about to be rendered');
    this.computeRequestUrl();
  }

  /**
   * The component is about to update and re-render.
   *
   * Called multiple times throughout the life of
   * the component as it updates.
   *
   * componentWillUpdate is not called on the first render.
   */
  componentWillUpdate() {
    console.log('Component will update and re-render');
    this.computeRequestUrl();
  }

  /**
   * Computes and sets the requestUrl prop
   * if all dependent props are set.
   */
  computeRequestUrl() {
    if (!this.baseURL || !this.space || !this.token) {
      return
    }

    let url = `${this.baseURL}/spaces/${this.space}${this.environment ? `/environments/${this.environment}` : ''}/entries?access_token=${this.token}&content_type=${this.contentType}`;

    if (url === this.requestUrl) {
      return;
    }

    this.requestUrl = url
  }

  /**
   * Get Entries
   */
  async getEntries() {
    if (!this.requestUrl) {
      return;
    }
    this.response = await fetch(this.requestUrl).then(r => r.json());
  }
}
