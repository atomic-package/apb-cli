import App from  '../../config/app';
import Common from './common_model';
import File from '../../store/File';

const fs   = require('fs');
const path = require('path');

export class CreateModel {
  private directoryPath: string = './scss/base';
  private directoryName: string = 'base';
  private scss_files: string[]  = [];
  private files                 = [];

  constructor(directoryPath: string, directoryName: string, callback?: Function) {
    this.directoryPath = directoryPath;
    this.directoryName = directoryName;

    this.fetchScssFiles(() => {
      this.filterScssFiles(directoryPath, () => {});
      this.createFilesData();
      this.makeFiles();

      callback();
    })
  }

  /**
   * Public Function
   **/
  public filterScssFiles(pagesDirectoryPath: string, callback?: Function): void {
    this.scss_files = this.scss_files.filter((file) => {
      return !(new Common().isFile(pagesDirectoryPath + '/' + file));
    });

    callback();
  }

  public fetchScssFiles(callback?: Function): void {
    new Common().fetchScssFiles(this.directoryName, (data) => {
      this.scss_files = data;
      callback();
    });
  }

  public createFilesData(): void {
    this.scss_files.forEach((file) => {
      this.files.push(File.fromData({
        name: file,
        path: this.directoryPath + '/' + file,
        data: this.fetchFileData(path.resolve(App.SCSS_FILES_PATH, this.directoryName, file))
      }));
    });
  }

  public makeFiles(): void {
    this.files.forEach((file) => {
      fs.mkdir(this.directoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(file.path, file.data, (err) => {
          if (err) { throw err; }
        });
      });
    });
  }

  public fetchFileData(filePath: string) {
    return fs.readFileSync(filePath, 'utf8', (err, text) => {
      if (err) { throw err; }

      return text;
    });
  }
}
export default CreateModel;
