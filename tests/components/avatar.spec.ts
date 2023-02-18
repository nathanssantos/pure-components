import Component from '../../src/components/component';
import Avatar from '../../src/components/avatar';

describe('components', () => {
  describe('avatar', () => {
    describe('assemble', () => {
      it('Should assemble the avatar.', () => {
        const component = new Avatar();

        expect(component.target.classList).toContain('avatar');
        expect(component.children.imageContainer).toBeInstanceOf(Component);
        expect(component.children.imageContainer.children.image).toBeInstanceOf(Component);
        expect(component.children.textContainer).toBeInstanceOf(Component);
        expect(component.children.textContainer.children.name).toBeInstanceOf(Component);
        expect(component.children.textContainer.children.description).toBeInstanceOf(Component);
      });
    });
  });
});
