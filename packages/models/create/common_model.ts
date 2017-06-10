import App from  '../../config/app';

const fs = require('fs');
const path = require('path');

export class CreateCommonModel {
  /**
   * Public Function
   **/
  public isDir(filepath: string): boolean {
    return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
  }

  /**
   * file 存在確認
   * @param {string} filepath
   * @return boolean
   */
  public isFile(filepath: string): boolean {
    try {
      fs.statSync(filepath);
      return true
    } catch(err) {
      if(err.code === 'ENOENT') return false
    }
  }

  /**
   * Directory 作成
   * @param {string} directoryPath
   * @param {Function} callback
   */
  public makeDirectory(directoryPath: string, callback: Function): void {
    fs.mkdir(directoryPath, App.DIRECTORY_PERMISSION, (err) => {
      if (err) {
        console.error(err);
      } else {
        callback();
      }
    });
  }

  /**
   * SCSS File 取得
   * @param {string} directoryName
   * @param {Function} callback
   */
  public fetchScssFiles(directoryName: string, callback: Function): void {
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

  /**
   * SCSS File データ取得
   * @param {string} directoryPath
   * @param {string} directoryName
   * @param {Function} callback
   */
  public getScssFilesData(directoryPath: string, directoryName: string, callback: Function): void {
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
