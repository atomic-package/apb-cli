const fs = require('fs');


export class New {
  private _root_path: string = './';
  private _directory_name: string = 'scss';
  private _root_directory_path: string;

  constructor(params) {
    if(params.length > 0) {
      this._directory_name = params[0];
    }
    console.log('new', params);

    this._root_directory_path = this._root_path + this._directory_name;


    fs.mkdir(this._root_directory_path, '757', () => {
      let data            = "//test";
      let common_inc_file = this._root_directory_path + '/_common_inc.scss';
      let parts_file      = this._root_directory_path + '/_parts.scss';
      let style_file      = this._root_directory_path + '/style.scss';


      fs.mkdir(this._root_directory_path + '/base', '757', () => {
        let base_file    = this._root_directory_path + '/base/_base.scss';
        let mixin_file   = this._root_directory_path + '/base/_mixin.scss';
        let reset_file   = this._root_directory_path + '/base/_reset.scss';
        let setting_file = this._root_directory_path + '/base/_setting.scss';

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


      fs.mkdir('./scss/pages', '757', function () {
        var pages_file = './scss/pages/_pages_inc.scss';
        var index_file = './scss/pages/_index.scss';

        fs.writeFile(pages_file, data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile(index_file, data, function(err) {
          if (err) { throw err; }
        });
      });


      fs.mkdir('./scss/parts', '757', function () {
        fs.writeFile('./scss/parts/_animation.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_base.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_bg.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_box.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_button.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_footer.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_header.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_icon.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_list.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_media_queries.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_modal.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_navigation_menu.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_paragraph.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_separate.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_table.scss', data, function(err) {
          if (err) { throw err; }
        });

        fs.writeFile('./scss/parts/_title.scss', data, function(err) {
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
