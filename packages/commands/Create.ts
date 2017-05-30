import App from  '../config/app';
import BaseModel from  '../models/create/base_model';
import PagesModel from  '../models/create/pages_model';
import PartsModel from  '../models/create/parts_model';


const fs = require('fs');

export class Create {
  constructor(params) {
    console.log('new', params);


    fs.mkdir(params.directoryPath, App.DIRECTORY_PERMISSION, () => {
      let data            = "//test";
      let common_inc_file = params.directoryPath + '/_common_inc.scss';
      let parts_file      = params.directoryPath + '/_parts.scss';
      let style_file      = params.directoryPath + '/style.scss';

      new BaseModel(params.baseDirectoryPath);

      new PagesModel(params.pagesDirectoryPath);

      new PartsModel(params.partsDirectoryPath);

      fs.writeFile(common_inc_file, data, (err) => {
        if (err) { throw err; }
      });

      fs.writeFile(parts_file, data, (err) => {
        if (err) { throw err; }
      });

      fs.writeFile(style_file, data, (err) => {
        if (err) { throw err; }
      });

    });
  }
}

export default Create;
