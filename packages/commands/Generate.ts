import CreateModel from  '../models/create/index';

export class Generate {
  constructor(params) {

    switch (params.generateParams.type) {
      case 'base':
        new CreateModel(params.directoryPath, params.baseDirectoryName, () => {});
        break;
      case 'pages':
        new CreateModel(params.directoryPath, params.pagesDirectoryName, () => {});
        break;
      case 'parts':
        new CreateModel(params.directoryPath, params.partsDirectoryName, () => {});
    }
  }
}

export default Generate;
