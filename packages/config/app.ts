const path = require('path');

const App = {
  VERSION: "0.0.3",
  DIRECTORY_PERMISSION: '757',
  SCSS_FILES_PATH: './packages/lib/files/scss/',
  PACKAGE_PATH: path.resolve(process.argv[1], '../../lib/node_modules/@atomic-package/apb-cli/')
};

export default App;

