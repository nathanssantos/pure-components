class Utils {
  static camelCaseToKebabCase = (string: string) => {
    return string.replace(/[A-Z]/g, (character) => '-' + character.toLowerCase());
  };
}

export default Utils;
