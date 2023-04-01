import Progress from '.';

describe('Components', () => {
  describe('Progress', () => {
    describe('instance and assemble', () => {
      it('Should create a new progress instance and assemble it.', () => {
        const component1 = new Progress({ className: 'test my-progress' });
        const component2 = new Progress();

        expect(component1.target.classList).toContain('progress');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-progress');
        expect(component2.target.classList).toContain('progress');
      });
    });

    describe('setProgress', () => {
      it('Should set the progress bar value.', () => {
        const component = new Progress();

        component.setValue(42);

        expect(component.children.value.target.innerHTML).toBe('42%');
        setTimeout(() => {
          expect(getComputedStyle(component.children.fill.target).width).toBe('42%');
        }, 0);
      });
    });
  });
});
