import App from  '../config/app';

let program = require('commander');

export class Program {
  constructor() {
    program
      .version(App.VERSION)
      .option('-n, --new', 'Add new')
      .option('-g, --generate', 'Add generate')
      .option('-p, --peppers', 'Add peppers')
      .option('-P, --pineapple', 'Add pineapple')
      .option('-b, --bbq-sauce', 'Add bbq sauce')
      .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
      .parse(process.argv);

    Object.assign( this, program );
  }
}

export default Program;
