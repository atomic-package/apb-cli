const path = require('path');

const App = {
  VERSION: "0.1.3",
  DIRECTORY_PERMISSION: '757',
  SCSS_FILES_PATH: path.join(process.cwd(), './packages/lib/files/scss'),
  PACKAGE_PATH: path.join(process.cwd(), './')
};

export default App;
