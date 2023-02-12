import Drawer from '../../src/components/drawer';

describe('components', () => {
  describe('drawer', () => {
    describe('instance', () => {
      it('Should create a new drawer instance.', () => {
        expect(new Drawer().target.classList).toContain('drawer');
      });
    });
  });
});
