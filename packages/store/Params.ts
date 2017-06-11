const path = require('path');

export class Params {
  constructor(
    public rootPath: string, // ./
    public directoryName: string, // scss
    public directoryPath: string, // ./scss
    public baseDirectoryName: string, // base
    public baseDirectoryPath: string, // ./scss/bass
    public pagesDirectoryName: string, // pages
    public pagesDirectoryPath: string, // ./scss/pages
    public partsDirectoryName: string, // parts
    public partsDirectoryPath: string // ./scss/parts
  ) {
    this.init();
  }

  /**
   * Static Function
   **/
  static fromData(data: any): Params {
    return new Params(
      data.path ? path.resolve(process.cwd(), data.path) : process.cwd() + '/',
      data.directoryName ? data.directoryName : 'scss',
      null,
      data.baseDirectoryName ? data.baseDirectoryName : 'base',
      null,
      data.pagesDirectoryName ? data.pagesDirectoryName : 'pages',
      null,
      data.partsDirectoryName ? data.partsDirectoryName : 'parts',
      null
    );
  }

  private init() {
    if(!this.directoryPath) {
      this.directoryPath = path.resolve(this.rootPath, this.directoryName);
    }

    if(!this.baseDirectoryPath) {
      this.baseDirectoryPath = path.resolve(this.directoryPath, this.baseDirectoryName);
    }

    if(!this.pagesDirectoryPath) {
      this.pagesDirectoryPath = path.resolve(this.directoryPath, this.pagesDirectoryName);
    }

    if(!this.partsDirectoryPath) {
      this.partsDirectoryPath = path.resolve(this.directoryPath, this.partsDirectoryName);
    }
  }
}