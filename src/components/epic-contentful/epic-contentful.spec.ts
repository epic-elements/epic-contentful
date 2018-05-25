import { TestWindow } from '@stencil/core/testing';
import { EpicContentful } from './epic-contentful';

describe('epic-contentful', () => {
  it('should build', () => {
    expect(new EpicContentful()).toBeTruthy();
  });

  describe('rendering', () => {
    let element: EpicContentful;
    let testWindow: TestWindow;
    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [EpicContentful],
        html: '<epic-contentful></epic-contentful>'
      });
    });


    it('request url is built with params', async () => {
      // element.first = 'Peter';
      // await testWindow.flush();
      // expect(element.textContent.trim()).toEqual('Hello, World! I\'m Peter');
    });

  });
});
