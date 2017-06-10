import App from  '../config/app';

let program = require('commander');

export class Program {
  constructor() {
    program
      .version(App.VERSION)
      .option('-n, --new', 'Add new')
      .option('-g, --generate', 'Add generate')
      .parse(process.argv);

    Object.assign( this, program );
  }
}

export default Program;
