'use strict';
const path = require('path');

let userRunPath = process.cwd();
let userArgs = process.argv.slice(2);

import Program from  './lib/commander';
import Model from './models/index';
import Commands from  './commands';

/**
 * APB CLI Class
 * @public
 **/
export class ApbCli {
  private _model: Model;

  constructor(
    public userArgs: any,
    public commands: any
  ) {
    this._model = new Model();

    Commands.fromData({
      userArgs: userArgs,
      commands: commands,
      program: new Program()
    });
  }

  /**
   * Static Function
   **/
  static fromData(data: any): ApbCli {
    return new ApbCli(
      data.userArgs ? data.userArgs : null,
      data.commands ? data.commands : null
    );
  }
}

export default ApbCli.fromData({
  userArgs: userArgs,
  commands: userArgs[0]
});
