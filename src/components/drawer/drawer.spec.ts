import Drawer from '.';
import Component from '../component';

describe('components', () => {
  describe('drawer', () => {
    describe('instance and assemble', () => {
      it('Should create a new drawer instance and assemble it.', () => {
        const component = new Drawer({ className: 'test my-drawer' });

        expect(component.target.classList).toContain('drawer');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-drawer');
        expect(component.children.content.children.header.children.btClose).toBeInstanceOf(
          Component,
        );
        expect(component.children.content.children.header).toBeInstanceOf(Component);
        expect(component.children.content.children.body).toBeInstanceOf(Component);
        expect(component.children.content.children.footer).toBeInstanceOf(Component);
        expect(component.children.content).toBeInstanceOf(Component);
        expect(component.children.overlay).toBeInstanceOf(Component);
      });
    });

    describe('close', () => {
      it('Should close the drawer.', async () => {
        const component = new Drawer();
        await component.close();

        expect(getComputedStyle(component.target).display).toBe('none');
        expect(getComputedStyle(component.children.overlay.target).display).toBe('none');
        expect(getComputedStyle(component.children.overlay.target).opacity).toBe('0');
        expect(getComputedStyle(component.children.content.target).display).toBe('none');
        expect(getComputedStyle(component.children.content.target).transform).toBe(
          'translateX(-100%)',
        );
      });
    });

    describe('open', () => {
      it('Should open the drawer.', async () => {
        const component = new Drawer();
        await component.open();

        expect(getComputedStyle(component.target).display).toBe('flex');
        expect(getComputedStyle(component.children.overlay.target).display).toBe('flex');
        expect(getComputedStyle(component.children.overlay.target).opacity).toBe('1');
        expect(getComputedStyle(component.children.content.target).display).toBe('flex');
        expect(getComputedStyle(component.children.content.target).transform).toBe(
          'translateX(0)',
        );
      });
    });
  });
});
