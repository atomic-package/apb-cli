const path = require('path');

const App = {
  VERSION: "0.0.6",
  DIRECTORY_PERMISSION: '757',
  SCSS_FILES_PATH: path.resolve(process.argv[1], '../../lib/node_modules/@atomic-package/apb-cli/') + '/packages/lib/files/scss',
  PACKAGE_PATH: path.resolve(process.argv[1], '../../lib/node_modules/@atomic-package/apb-cli/')
};

export default App;

