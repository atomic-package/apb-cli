// commands
import Create from  './Create';

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

  private init() {
    console.log(this.program.new);
    console.log(this.program.generate);
    console.log(this.program.peppers);

    console.log('----userArgs----');
    console.log(this.userArgs);
    console.log('--------');

    console.log('----commands----');
    console.log(this.commands);
    console.log('--------');

    if(this.program.new && isArray(this.program.new)) {
      if(this.program.new.length > 0) {
        this.setParams({
          directoryName: this.program.new[0]
        });
      } else {
        this.setParams({});
      }

      new Create(this.params);
    }
  }

  private setParams(data) {
    this.params = Params.fromData(data);
  }
}


export default Commands;
