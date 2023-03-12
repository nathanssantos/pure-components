import Component from '../component';
import Toast from './index';

describe('Components', () => {
  describe('Toast', () => {
    describe('instance and assemble', () => {
      it('Should create a new tab instance and assemble it.', () => {
        const component = new Toast({
          duration: 3000,
          className: 'test',
          variant: 'error',
          position: 'top-center',
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });

        const component2 = new Toast();

        expect(component.target.classList).toContain('toast');
        expect(component.target.classList).toContain('test');
        expect(component.target.classList).toContain('toast--error');
        expect(component.target.classList).toContain('toast--top-center');
        expect(component.children.header.children.title.target.innerHTML).toBe('Toast');
        expect(component.children.description.target.innerHTML).toBe('Testing toast');
        expect(component.children.header).toBeInstanceOf(Component);
        expect(component.children.header.children.title).toBeInstanceOf(Component);
        expect(component.children.header.children.closeButton).toBeInstanceOf(Component);
        expect(component.children.description).toBeInstanceOf(Component);
        expect(component2.target.classList).toContain('toast');
      });
    });

    describe('dismiss', () => {
      it('should dismiss the toast', async () => {
        const component = new Toast({
          variant: 'success',
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });

        await component.show();

        expect(component.target.classList).toContain('toast--open');

        await component.dismiss();

        expect(component.target.classList).not.toContain('toast--open');
      });
    });

    describe('show', () => {
      it('should show the toast on screen', async () => {
        const component = new Toast({
          variant: 'success',
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });

        await component.show();

        expect(component.target.classList).toContain('toast--open');
      });
    });

    describe('trigger', () => {
      it('should show the toast on screen', async () => {
        await Toast.trigger({
          variant: 'success',
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });

        expect(document.querySelector('.toast')).toBeFalsy();

        Toast.trigger({
          variant: 'success',
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });

        expect(document.querySelector('.toast')).toBeTruthy();
      });
    });
  });
});
