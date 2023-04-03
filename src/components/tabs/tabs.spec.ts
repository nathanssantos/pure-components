import Tab from '../tab';
import TabPanel from '../tabPanel';
import Tabs from '.';

describe('Components', () => {
  describe('Tabs', () => {
    describe('instance and assemble', () => {
      it('Should create a new tab instance.', () => {
        const component = new Tabs({
          className: 'test my-tabs',
          tabList: {
            children: {
              tab1: new Tab(),
              tab2: new Tab(),
              tab3: new Tab(),
            },
          },
          tabPanels: {
            children: {
              tab1: new TabPanel(),
              tab2: new TabPanel(),
              tab3: new TabPanel(),
            },
          },
        });
        const component2 = new Tabs();

        expect(component.target.classList).toContain('tabs');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-tabs');
        expect(component2.target.classList).toContain('tabs');
      });
    });
  });
});
