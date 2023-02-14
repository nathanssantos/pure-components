import Drawer from '../../src/components/drawer';

describe('components', () => {
  describe('drawer', () => {
    describe('assemble', () => {
      it('Should assemble a new drawer.', () => {
        expect(new Drawer().target.classList).toContain('drawer');
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
  });
});
