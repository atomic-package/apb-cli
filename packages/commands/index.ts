// commands
import Create from  './Create';
import Generate from  './Generate';

import { isArray } from "util";
import { Params } from "../store/Params";

export class Commands {
  private params: Params;

  constructor(
    public userArgs,
    public commands,
    public program
  ) {
    this.init();
  }

  /**
   * Static Function
   **/
  static fromData(data: any): Commands {
    return new Commands(
      data.userArgs ? data.userArgs : null,
      data.commands ? data.commands : null,
      data.program ? data.program: null
    );
  }

  /**
   * Private Function
   **/
  /**
   * 初期化
   */
  private init(): void {
    console.log(this.program.new);
    console.log(this.program.generate);


    console.log('----userArgs----');
    console.log(this.userArgs);
    console.log('--------');

    console.log('----commands----');
    console.log(this.commands);
    console.log('--------');

    if(this.program.new) {
      this.runNewCommand();
    }

    if(this.program.generate) {
      this.runGenerateCommand();
    }

  }

  /**
   * New Command
   */
  private runNewCommand(): void {
    if(isArray(this.program.new) && this.program.new.length > 0) {
      this.setParams({
        directoryName: this.program.new[0]
      });
    } else if(this.userArgs.length > 1) {
      this.setParams({
        directoryName: this.userArgs[1]
      });
    } else {
      this.setParams({});
    }

    new Create(this.params);
  }

  /**
   * Generate Command
   */
  private runGenerateCommand(): void {
    if(this.userArgs.length > 1) {
      this.setParams({});

      new Generate(this.params, this.userArgs[1]);
    }
  }

  /**
   * Params 生成
   * @param {Params} data
   */
  private setParams(data): void {
    this.params = Params.fromData(data);
  }
}


export default Commands;
