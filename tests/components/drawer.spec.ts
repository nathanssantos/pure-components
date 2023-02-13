import Drawer from '../../src/components/drawer';

describe('components', () => {
  describe('drawer', () => {
    describe('instance', () => {
      it('Should create a new drawer instance.', () => {
        expect(new Drawer().target.classList).toContain('drawer');
      });
    });

    describe('assemble', () => {
      it('Should assemble a new drawer component.', () => {
        expect(new Drawer().target.classList).toContain('drawer');
      });
    });
  });
});
