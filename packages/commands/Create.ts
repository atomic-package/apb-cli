import CreateModel from  '../models/create/index';

export class Create {
  constructor(params) {
    new CreateModel(params.directoryPath, '', () => {
        new CreateModel(params.baseDirectoryPath, params.baseDirectoryName, () => {});
        new CreateModel(params.pagesDirectoryPath, params.pagesDirectoryName, () => {});
        new CreateModel(params.partsDirectoryPath, params.partsDirectoryName, () => {});
    });
  }
}

export default Create;
