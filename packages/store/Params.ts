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
    public partsDirectoryPath: string, // ./scss/parts
    public generateParams: GenerateParams
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
      data.baseDirectoryPath ? data.baseDirectoryPath : null,
      data.pagesDirectoryName ? data.pagesDirectoryName : 'pages',
      null,
      data.partsDirectoryName ? data.partsDirectoryName : 'parts',
      null,
      data.generateParams ? GenerateParams.fromData(data.generateParams) : null
    );
  }

  private init() {
    if(!this.directoryPath) {
      this.directoryPath = this.getDirectoryPath();
    }

    if(!this.baseDirectoryPath) {
      this.baseDirectoryPath = this.getBaseDirectoryPath();
    }

    if(!this.pagesDirectoryPath) {
      this.pagesDirectoryPath = this.getPagesDirectoryPath();
    }

    if(!this.partsDirectoryPath) {
      this.partsDirectoryPath = this.getPartsDirectoryPath();
    }
  }

  private getDirectoryPath(): string {
    if(this.generateParams) {
      return this.generateParams.getDirectoryPath();
    } else {
      return path.resolve(this.rootPath, this.directoryName);
    }
  }

  private getBaseDirectoryPath(): string {
    return path.resolve(this.directoryPath, this.baseDirectoryName);
  }

  private getPagesDirectoryPath(): string {
    return path.resolve(this.directoryPath, this.pagesDirectoryName);
  }

  private getPartsDirectoryPath(): string {
    return path.resolve(this.directoryPath, this.partsDirectoryName);
  }
}

export class GenerateParams {
  constructor(
    public rootPath: string,
    public directoryName: string,
    public type: string
  ) {
  }

  /**
   * Static Function
   **/
  static fromData(data: any): GenerateParams {
    return new GenerateParams(
      data.path ? path.resolve(process.cwd(), data.path) : process.cwd() + '/',
      data.directoryName ? data.directoryName : data.type,
      data.type ? data.type : 'base'
    );
  }

  public getDirectoryPath(): string {
    return path.resolve(this.rootPath, this.directoryName);
  }
}