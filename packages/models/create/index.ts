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

    console.log(this.directoryName);

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
  /**
   * SCSS 存在しないファイルを取得
   * @param {string} pagesDirectoryPath
   * @param {Function} callback
   */
  public filterScssFiles(pagesDirectoryPath: string, callback?: Function): void {
    this.scss_files = this.scss_files.filter((file) => {
      return !(new Common().isFile(pagesDirectoryPath + '/' + file));
    });

    callback();
  }

  /**
   * ディレクトリ単位 SCSS ファイルを取得
   * @param {Function} callback
   */
  public fetchScssFiles(callback?: Function): void {
    new Common().fetchScssFiles(this.directoryName, (data) => {
      this.scss_files = data;
      callback();
    });
  }

  /**
   * Fileを生成
   */
  public createFilesData(): void {
    this.scss_files.forEach((file) => {
      this.files.push(
        File.fromData({
          name: file,
          path: this.directoryPath + '/' + file,
          data: this.fetchFileData(path.resolve(App.SCSS_FILES_PATH, this.directoryName, file))
        })
      );
    });
  }

  /**
   * SCSS ファイルを作成
   */
  public makeFiles(): void {
    this.files.forEach((file) => {
      fs.mkdir(this.directoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(file.path, file.data, (err) => {
          if (err) { throw err; }

          console.log("created file: " + file.path);
        });
      });
    });
  }

  /**
   * SCSS ファイルデータを取得
   * @param {string} filePath
   */
  public fetchFileData(filePath: string) {
    return fs.readFileSync(filePath, 'utf8', (err, text) => {
      if (err) { throw err; }

      return text;
    });
  }
}
export default CreateModel;
