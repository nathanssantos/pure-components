import Component from '../component';
import Accordion from '.';

describe('Components', () => {
  describe('Accordion', () => {
    describe('instance and assemble', () => {
      it('Should create a new accordion instance.', () => {
        const component1 = new Accordion({ className: 'test my-accordion' });
        const component2 = new Accordion();

        expect(component1.target.classList).toContain('accordion');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-accordion');
        expect(component1.children.header).toBeInstanceOf(Component);
        expect(component1.children.header.children.icon).toBeInstanceOf(Component);
        expect(component1.children.dropdown).toBeInstanceOf(Component);
        expect(component1.children.dropdown.children.content).toBeInstanceOf(Component);
        expect(component2.target.classList).toContain('accordion');
      });
    });

    describe('close', () => {
      it('Should close the accordion.', async () => {
        const component = new Accordion();
        await component.close();

        expect(component.isOpen).toBe(false);
      });
    });

    describe('open', () => {
      it('Should open the accordion.', async () => {
        const component = new Accordion();
        await component.open();

        expect(component.isOpen).toBe(true);
      });
    });

    describe('toggle', () => {
      it('Should toggle the accordion.', async () => {
        const component = new Accordion();
        await component.toggle();

        expect(component.isOpen).toBe(true);

        await component.toggle();

        expect(component.isOpen).toBe(false);
      });
    });
  });
});
