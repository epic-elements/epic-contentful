import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'epic-contentful',
  styleUrl: 'epic-contentful.css',
  shadow: true
})
export class EpicContentful {

  @Prop() first: string;
  @Prop() last: string;

  render() {
    return (
      <div>
        Hello, World! I'm {this.first} {this.last}
      </div>
    );
  }
}
