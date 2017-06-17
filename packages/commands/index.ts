// commands
import Create from  './Create';
import Generate from  './Generate';

import { Params } from "../store/Params";
import App from "../config/app";

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
    console.log("apb-cli start of version " + App.VERSION);

    if(this.program.new) {
      this.runNewCommand();
    }

    if(this.program.generate) {
      this.runGenerateCommand();
    }
  }

  /**
   * 指定されているパス名を取得
   * @return string
   */
  private getInputPath(): null | string {
    let path = null;

    this.userArgs.forEach((args) => {
      if(/^--path=."?.+."?$/.test(args)) {
        path = args.replace( /--path=/g , "");
      }
    });

    return path;
  }

  /**
   * 指定されているディレクトリ名を取得
   * @return string
   */
  private getDirectoryName(): null | string {
    if(!this.isDirectoryName()) return null;

    for(let i = 1; i < this.userArgs.length; i++) {
      if(!/^--path=."?.+."?$/.test(this.userArgs[i])) {
        if(this.program.generate) {
          if(
            !/^base$/.test(this.userArgs[i]) &&
            !/^parts$/.test(this.userArgs[i]) &&
            !/^pages$/.test(this.userArgs[i])
          ) {
            return this.userArgs[i];
          }

        } else {
          return this.userArgs[i];
        }
      }
    }
  }

  /**
   * ディレクトリ名が指定されているか判定
   * @return boolean
   */
  private isDirectoryName(): boolean {
    if(this.userArgs.length < 1) return false;

    let isDirectoryName = false;

    for(let i = 1; i < this.userArgs.length; i++) {
      if(!/^--path=."?.+."?$/.test(this.userArgs[i])) {
        isDirectoryName = true;
      }
    }

    return isDirectoryName;
  }

  /**
   * 指定されているGenerate Command タイプを取得
   * @return string
   */
  private getGenerateType(): string {
    for(let i = 1; i < this.userArgs.length; i++) {
      if(!/^--path=."?.+."?$/.test(this.userArgs[i])) {
        if(/^base$/.test(this.userArgs[i])) {
          return 'base';
        } else if(/^parts$/.test(this.userArgs[i])) {
          return 'parts';
        } else if(/^pages$/.test(this.userArgs[i])) {
          return 'pages';
        }
      }
    }
  }

  /**
   * New Command
   */
  private runNewCommand(): void {
    this.setParams({
      directoryName: this.getDirectoryName(),
      path: this.getInputPath()
    });

    new Create(this.params);
  }

  /**
   * Generate Command
   */
  private runGenerateCommand(): void {
    this.setParams({
      generateParams: {
        directoryName: this.getDirectoryName(),
        path: this.getInputPath(),
        type: this.getGenerateType()
      }
    });

    new Generate(this.params);
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
