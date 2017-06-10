import CreateModel from  '../models/create/index';

export class Generate {
  constructor(params, types) {

    console.log(params);

    switch (types) {
      case 'base':
        new CreateModel(params.baseDirectoryPath, params.baseDirectoryName, () => {});
        break;
      case 'pages':
        new CreateModel(params.directoryPath, '', () => {
          new CreateModel(params.pagesDirectoryPath, params.pagesDirectoryName, () => {});
        });
        break;
      case 'parts':
        new CreateModel(params.directoryPath, '', () => {
          new CreateModel(params.partsDirectoryPath, params.partsDirectoryName, () => {});
        });
    }
  }
}

export default Generate;
