const camelCaseToKebabCase = (string: string) =>
  string.replace(/[A-Z]/g, (character) => '-' + character.toLowerCase());

export default camelCaseToKebabCase;
