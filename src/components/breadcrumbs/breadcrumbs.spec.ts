import Breadcrumbs from '.';

describe('Components', () => {
  describe('Breadcrumbs', () => {
    describe('instance and assemble', () => {
      it('Should create a new breadcrumbs instance.', () => {
        const component1 = new Breadcrumbs({ className: 'test my-breadcrumbs' });
        const component2 = new Breadcrumbs();

        expect(component1.target.classList).toContain('breadcrumbs');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-breadcrumbs');
        expect(component2.target.classList).toContain('breadcrumbs');
      });
    });
  });
});
