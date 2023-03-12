import Component from '../component';
import Modal from '.';

describe('Components', () => {
  describe('Modal', () => {
    describe('instance and assemble', () => {
      it('Should create a new modal instance and assemble it.', () => {
        const component = new Modal({ className: 'test my-modal' });

        expect(component.target.classList).toContain('modal');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('my-modal');
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

        expect(getComputedStyle(component.target).display).toBe('none');
        expect(getComputedStyle(component.children.overlay.target).display).toBe('none');
        expect(getComputedStyle(component.children.overlay.target).opacity).toBe('0');
        expect(getComputedStyle(component.children.content.target).display).toBe('none');
      });
    });

    describe('open', () => {
      it('Should open the modal.', async () => {
        const component = new Modal();
        await component.open();

        expect(getComputedStyle(component.target).display).toBe('flex');
        expect(getComputedStyle(component.children.overlay.target).display).toBe('flex');
        expect(getComputedStyle(component.children.overlay.target).opacity).toBe('1');
        expect(getComputedStyle(component.children.content.target).display).toBe('flex');
      });
    });
  });
});
