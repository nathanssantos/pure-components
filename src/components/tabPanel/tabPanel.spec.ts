import TabPanel from '.';

describe('Components', () => {
  describe('TabPanel', () => {
    describe('instance and assemble', () => {
      it('Should create a new tab instance.', () => {
        const component = new TabPanel({ className: 'test my-tab-panel' });
        const component2 = new TabPanel();

        expect(component.target.classList).toContain('tab-panel');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-tab-panel');
        expect(component2.target.classList).toContain('tab-panel');
      });
    });
  });
});
