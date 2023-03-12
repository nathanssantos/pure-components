import Toast from './index';

describe('Components', () => {
  describe('Toast', () => {
    describe('instance and assemble', () => {
      it('Should create a new tab instance and assemble it.', () => {
        const toastDuration = 3000;
        const component = Toast.trigger({
          duration: toastDuration,
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });
        const component2 = new Toast({
          duration: toastDuration,
          title: {
            innerHTML: 'Toast',
          },
          description: {
            innerHTML: 'Testing toast',
          },
        });

        expect(component.target.classList).toContain('toast');
        expect(component2.target.classList).toContain('toast');
        setTimeout(() => {
          expect(component.target).toBeNull();
          expect(component2.target).toBeNull();
        }, toastDuration);
      }, 10000);
    });
    it('Test variants in toast', () => {
      const component = Toast.trigger({
        duration: 10000,
        variant: 'success',
        title: {
          innerHTML: 'Toast',
        },
        description: {
          innerHTML: 'Testing toast',
        },
      });
      expect(component.target.firstChild).not.toBeNull();
      expect(component.target.querySelector('.toast__container')?.classList).toContain(
        'toast__success',
      );
    });
    it('Test className in toast', () => {
      const component = new Toast({
        duration: 8000,
        className: 'toast__test',
        title: {
          innerHTML: 'Toast',
        },
        description: {
          innerHTML: 'Testing toast',
        },
      });

      expect(component.target.classList).toContain('toast__test');
    });
    it('Test replace toast in screen', () => {
      const component = new Toast({
        duration: 8000,
        title: {
          innerHTML: 'Toast',
        },
        description: {
          innerHTML: 'Testing toast',
        },
      });
      component.show();
      expect(component.target.classList).toContain('toast');
    });
  });
});
