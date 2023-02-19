import Component from '../../src/components/component';
import Avatar from '../../src/components/avatar';

describe('components', () => {
  describe('avatar', () => {
    describe('instance and assemble', () => {
      it('Should create a new avatar instance and assemble it.', () => {
        const component1 = new Avatar({ className: 'test my-avatar' });
        const component2 = new Avatar();

        expect(component1.target.classList).toContain('avatar');
        expect(component1.target.classList).toContain('test');
        expect(component1.target.classList).toContain('my-avatar');
        expect(component1.children.imageContainer).toBeInstanceOf(Component);
        expect(component1.children.imageContainer.children.image).toBeInstanceOf(Component);
        expect(component1.children.textContainer).toBeInstanceOf(Component);
        expect(component1.children.textContainer.children.name).toBeInstanceOf(Component);
        expect(component1.children.textContainer.children.description).toBeInstanceOf(
          Component,
        );
        expect(component2.target.classList).toContain('avatar');
      });
    });
  });
});
