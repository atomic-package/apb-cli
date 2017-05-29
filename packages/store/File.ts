export class File {
  constructor(
    public name: string,
    public extension: string,
    public path: string,
    public data: string,
  ) {
  }

  /**
   * Static Function
   **/
  static fromData(data: any): File {
    return new File(
      data.name ? data.name : '',
      data.extension ? data.extension : '.scss',
      data.path ? data.path : './',
      data.data ? data.data : ''
    );
  }
}

export default File;
