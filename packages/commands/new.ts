const fs = require('fs');


export class New {
  constructor(params) {
    console.log('new', params);

    fs.mkdir(params.directoryPath, '757', () => {
      let data            = "//test";
      let common_inc_file = params.directoryPath + '/_common_inc.scss';
      let parts_file      = params.directoryPath + '/_parts.scss';
      let style_file      = params.directoryPath + '/style.scss';


      fs.mkdir(params.baseDirectoryPath, '757', () => {
        let base_file    = params.baseDirectoryPath + '/_base.scss';
        let mixin_file   = params.baseDirectoryPath + '/_mixin.scss';
        let reset_file   = params.baseDirectoryPath + '/_reset.scss';
        let setting_file = params.baseDirectoryPath + '/_setting.scss';

        fs.writeFile(base_file, data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(mixin_file, data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(reset_file, data, (err) => {
          if (err) { throw err; }
        });

        fs.writeFile(setting_file, data, (err) =>  {
          if (err) { throw err; }
        });

      });


      fs.mkdir(params.pagesDirectoryPath, '757', () => {
        let pages_file = params.pagesDirectoryPath + '/_pages_inc.scss';
        let index_file = params.pagesDirectoryPath + '/_index.scss';

        fs.writeFile(pages_file, data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(index_file, data, function(err) {
          if (err) { throw err; }
        });
      });


      fs.mkdir(params.partsDirectoryPath, '757', function () {
        fs.writeFile(params.partsDirectoryPath + '/_animation.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_base.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_bg.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_box.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_button.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_footer.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_header.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_icon.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_list.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_media_queries.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_modal.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_navigation_menu.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_paragraph.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_separate.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_table.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(params.partsDirectoryPath + '/_title.scss', data, function(err) {
          if (err) { throw err; }
        });
      });

      fs.writeFile(common_inc_file, data, function(err) {
        if (err) { throw err; }
      });

      fs.writeFile(parts_file, data, function(err) {
        if (err) { throw err; }
      });

      fs.writeFile(style_file, data, function(err) {
        if (err) { throw err; }
      });

    });
  }
}

export default New;
