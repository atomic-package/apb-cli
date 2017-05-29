import App from  '../config/app';
import BaseModel from  '../models/create/base_model';


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
      
      fs.mkdir(params.pagesDirectoryPath, App.DIRECTORY_PERMISSION, () => {
        let pages_file = params.pagesDirectoryPath + '/_pages_inc.scss';
        let index_file = params.pagesDirectoryPath + '/_index.scss';

        fs.writeFile(pages_file, data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(index_file, data, (err) => {
          if (err) { throw err; }
        });
      });


      fs.mkdir(params.partsDirectoryPath, App.DIRECTORY_PERMISSION, () => {
        fs.writeFile(params.partsDirectoryPath + '/_animation.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_base.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_bg.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_box.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_button.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_footer.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_header.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_icon.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_list.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_media_queries.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_modal.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_navigation_menu.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_paragraph.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_separate.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_table.scss', data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_title.scss', data, (err) => {
          if (err) { throw err; }
        });
      });

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
