const eslintCommand = 'eslint --fix';
const prettierCommand = 'prettier --write';
const gitCommand = 'git add .';

module.exports = {
  '*.{js,ts}': [eslintCommand, prettierCommand, gitCommand],
  '*.{css,scss}': [prettierCommand, gitCommand],
};
