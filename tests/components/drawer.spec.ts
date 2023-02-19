import Component from '../../src/components/component';
import Drawer from '../../src/components/drawer';

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

        expect(component.target.style.display).toBe('none');
        expect(component.children.overlay.target.style.display).toBe('none');
        expect(component.children.overlay.target.style.opacity).toBe('0');
        expect(component.children.content.target.style.display).toBe('none');
        expect(component.children.content.target.style.transform).toBe('translateX(-100%)');
      });
    });

    describe('open', () => {
      it('Should open the drawer.', async () => {
        const component = new Drawer();
        await component.open();

        expect(component.target.style.display).toBe('flex');
        expect(component.children.overlay.target.style.display).toBe('flex');
        expect(component.children.overlay.target.style.opacity).toBe('1');
        expect(component.children.content.target.style.display).toBe('flex');
        expect(component.children.content.target.style.transform).toBe('translateX(0)');
      });
    });
  });
});
