import Component from '../../src/components/component';
import Modal from '../../src/components/modal';

describe('components', () => {
  describe('modal', () => {
    describe('assemble', () => {
      it('Should assemble the modal.', () => {
        const component = new Modal();

        expect(component.target.classList).toContain('modal');
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
      it('Should close the modal.', async () => {
        const component = new Modal();
        await component.close();

        expect(component.target.style.display).toBe('none');
        expect(component.children.overlay.target.style.display).toBe('none');
        expect(component.children.overlay.target.style.opacity).toBe('0');
        expect(component.children.content.target.style.display).toBe('none');
      });
    });

    describe('open', () => {
      it('Should open the modal.', async () => {
        const component = new Modal();
        await component.open();

        expect(component.target.style.display).toBe('flex');
        expect(component.children.overlay.target.style.display).toBe('flex');
        expect(component.children.overlay.target.style.opacity).toBe('1');
        expect(component.children.content.target.style.display).toBe('flex');
      });
    });
  });
});
