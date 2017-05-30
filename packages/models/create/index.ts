import App from  '../../config/app';
import Common from './common_model';
import File from '../../store/File';

const fs = require('fs');

export class CreateModel {
  private directoryPath = './scss/base';
  private directoryName = 'base';
  private scss_files = [];
  private files = [];

  constructor(directoryPath, directoryName, callback?) {
    this.directoryPath = directoryPath;
    this.directoryName = directoryName;

    this.fetchScssFiles(() => {
      this.filterScssFiles(directoryPath, () => {

      });
      this.createFilesData();
      this.makeFiles();

      console.log(this);

      callback();
    })
  }

  public filterScssFiles(pagesDirectoryPath, callback?) {
    this.scss_files = this.scss_files.filter((file) => {
      return !(new Common().isFile(pagesDirectoryPath + '/' + file));
    });

    callback();
  }

  public fetchScssFiles(callback?) {
    new Common().fetchScssFiles(this.directoryName, (data) => {
      this.scss_files = data;
      callback();
    });
  }

  public createFilesData() {
    this.scss_files.forEach((file) => {
      this.files.push(File.fromData({
        name: file,
        path: this.directoryPath + '/' + file
      }));
    });
  }

  public makeFiles() {
    let data = "//test";

    this.files.forEach((file) => {
      fs.mkdir(this.directoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(file.path, data, (err) => {
          if (err) { throw err; }
        });
      });
    });
  }
}
export default CreateModel;
