import App from  '../../config/app';

const fs = require('fs');

export class CreateCommonModel {
  constructor() {
  }

  public isDir(filepath) {
    return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
  }

  public isFile(filepath) {
    try {
      fs.statSync(filepath);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
  }

  public makeDirectory(directoryPath, callback) {
    fs.mkdir(directoryPath, App.DIRECTORY_PERMISSION, (err) => {
      if (err) {
        console.error(err);
      } else {
        callback();
      }
    });
  }

  public fetchScssFiles(directoryName, callback) {
    fs.readdir(('./packages/lib/files/scss/' + directoryName), (err, files) => {
      if (err) throw err;

      let fileList = [];

      files.filter((file) => {
        return /.*\.scss/.test(file);
      }).forEach((file) => {
        //console.log(this.isFile('./packages/lib/files/scss/' + directoryName + '/' + file), file);
        fileList.push(file);
      });

      callback(fileList);
    });
  }
}

export default CreateCommonModel;
