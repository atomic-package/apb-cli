import App from  '../../config/app';
import Common from './common_model';
import File from '../../store/File';

const fs = require('fs');

export class PagesModel {
  private pagesDirectoryPath = './scss/pages';
  private scss_files = [];
  private files = [];

  constructor(pagesDirectoryPath) {
    this.pagesDirectoryPath = pagesDirectoryPath;

    this.fetchScssFiles(() => {
      this.filterScssFiles(pagesDirectoryPath, () => {

      });
      this.createFilesData();
      this.makeFiles();

      console.log(this);
    })
  }

  public filterScssFiles(pagesDirectoryPath, callback?) {
    this.scss_files = this.scss_files.filter((file) => {
      return !(new Common().isFile(pagesDirectoryPath + '/' + file));
    });

    callback();
  }

  public fetchScssFiles(callback?) {
    new Common().fetchScssFiles('pages', (data) => {
      this.scss_files = data;
      callback();
    });
  }

  public createFilesData() {
    this.scss_files.forEach((file) => {
      this.files.push(File.fromData({
        name: file,
        path: this.pagesDirectoryPath + '/' + file
      }));
    });
  }

  public makeFiles() {
    let data = "//test";

    this.files.forEach((file) => {
      fs.mkdir(this.pagesDirectoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(file.path, data, (err) => {
          if (err) { throw err; }
        });
      });
    });
  }
}

export default PagesModel;
