import App from  '../../config/app';
import Common from './common_model';
import File from '../../store/File';

const fs = require('fs');



export class BaseModel {
  private baseDirectoryPath = './scss/base';
  private scss_files = [];
  private files = [];

  constructor(baseDirectoryPath) {
    this.baseDirectoryPath = baseDirectoryPath;

    this.fetchScssFiles(() => {
      this.filterScssFiles(baseDirectoryPath, () => {

      });
      this.createFilesData();
      this.makeFiles();

      console.log(this);
    })
  }

  public filterScssFiles(baseDirectoryPath, callback?) {
    this.scss_files = this.scss_files.filter((file) => {
      return !(new Common().isFile(baseDirectoryPath + '/' + file));
    });

    callback();
  }

  public fetchScssFiles(callback?) {
    new Common().fetchScssFiles('base', (data) => {
      this.scss_files = data;
      callback();
    });
  }

  public createFilesData() {
    this.scss_files.forEach((file) => {
      this.files.push(File.fromData({
        name: file,
        path: this.baseDirectoryPath + '/' + file
      }));
    });
  }

  public makeFiles() {
    let data = "//test";

    this.files.forEach((file) => {
      fs.mkdir(this.baseDirectoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(file.path, data, (err) => {
          if (err) { throw err; }
        });
      });
    });
  }
}

export default BaseModel;
