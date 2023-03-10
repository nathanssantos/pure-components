import Tab from '.';
import Component from '../component';

describe('Components', () => {
  describe('Tab', () => {
    describe('instance and assemble', () => {
      it('Should create a new tab instance and assemble it.', () => {
        const component = new Tab({ className: 'test my-tab' });

        expect(component.target.classList).toContain('tab');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-tab');
        expect(component.children.activityIndicator).toBeInstanceOf(Component);
      });
    });

    describe('setActive', () => {
      it('Should set the tab active.', () => {
        const component = new Tab();
        component.setActive(true);

        const component2 = new Tab();
        component2.setActive(false);

        expect(getComputedStyle(component.children.activityIndicator.target).width).toBe(
          '100%',
        );
        expect(getComputedStyle(component2.children.activityIndicator.target).width).toBe(
          '0px',
        );
      });
    });
  });
});
