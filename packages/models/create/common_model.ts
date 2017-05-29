import App from  '../../config/app';

const fs = require('fs');

export class CreateCommonModel {
  constructor() {
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
}

export default CreateCommonModel;
