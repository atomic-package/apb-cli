import App from  '../../config/app';
import Common from './common_model';
import File from '../../store/File';

const fs = require('fs');

export class PartsModel {
  private partsDirectoryPath = './scss/parts';
  private scss_files = [];
  private files = [];

  constructor(partsDirectoryPath) {
    this.partsDirectoryPath = partsDirectoryPath;

    this.fetchScssFiles(() => {
      this.filterScssFiles(partsDirectoryPath, () => {

      });
      this.createFilesData();
      this.makeFiles();

      console.log(this);
    });
  }

  public filterScssFiles(partsDirectoryPath, callback?) {
    this.scss_files = this.scss_files.filter((file) => {
      return !(new Common().isFile(partsDirectoryPath + '/' + file));
    });

    callback();
  }

  public fetchScssFiles(callback?) {
    new Common().fetchScssFiles('parts', (data) => {
      this.scss_files = data;
      callback();
    });
  }

  public createFilesData() {
    this.scss_files.forEach((file) => {
      this.files.push(File.fromData({
        name: file,
        path: this.partsDirectoryPath + '/' + file
      }));
    });
  }

  public makeFiles() {
    let data = "//test";

    this.files.forEach((file) => {
      fs.mkdir(this.partsDirectoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(file.path, data, (err) => {
          if (err) { throw err; }
        });
      });
    });
  }
}

export default PartsModel;
