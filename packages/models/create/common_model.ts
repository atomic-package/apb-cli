import App from  '../../config/app';

const fs = require('fs');
const path = require('path');

export class CreateCommonModel {
  /**
   * Public Function
   **/
  public isDir(filepath: string): Boolean {
    return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
  }

  public isFile(filepath: string): Boolean {
    try {
      fs.statSync(filepath);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
  }

  public makeDirectory(directoryPath: string, callback: Function) {
    fs.mkdir(directoryPath, App.DIRECTORY_PERMISSION, (err) => {
      if (err) {
        console.error(err);
      } else {
        callback();
      }
    });
  }

  public fetchScssFiles(directoryName: string, callback: Function) {
    fs.readdir((App.PACKAGE_PATH + '/packages/lib/files/scss/' + directoryName), (err, files) => {
      if (err) throw err;

      let fileList = [];

      files.filter((file) => {
        return /.*\.scss/.test(file);
      }).forEach((file) => {
        fileList.push(file);
      });

      callback(fileList);
    });
  }

  public getScssFilesData(directoryPath: string, directoryName: string, callback: Function) {
    fs.readdir((directoryPath + directoryName), (err, files) => {
      if (err) throw err;

      let fileDataList = [];

      files.forEach((file) => {
        fileDataList.push(file);
      });

      callback(fileDataList);
    });
  }
}

export default CreateCommonModel;
