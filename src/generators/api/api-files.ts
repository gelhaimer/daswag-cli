import {Base} from "../core/base";
import File from '../core/file';
import {IApiOptions} from './api-options.model';

export class ApiFiles extends File {

  private static API_TEMPLATE_PATH = '../../../templates/api';
  private static PYTHON37_PATH = 'python37/';
  private static COMMON_PATH = './';

  constructor(generator: Base, options: IApiOptions) {
    super(generator, options, ApiFiles.API_TEMPLATE_PATH);
  }

  public files() {
    return this.python37Files();
  }

  private commonFiles() {
    return [
      {
        path: ApiFiles.COMMON_PATH,
        templates: [
          'docs/config/config.properties',
          'docs/files/.gitkeep',
          'docs/images/.gitkeep',
          'docs/index.adoc'
        ]
      },
      {
        path: ApiFiles.COMMON_PATH,
        templates: [
          'specs/specs.yml'
        ]
      },
      {
        path: ApiFiles.COMMON_PATH,
        templates: [
          'README.md',
          'sonar-project.properties',
          'template-init.yml',
          'template.yml'
        ]
      },
    ];
  }

  private python37Files() {
    return {
      common: this.commonFiles(),
      project: [
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'dev-requirements.txt',
            'test-requirements.txt',
            'requirements.txt',
            'Makefile',
            'setup.cfg',
            'setup.py',
            'tox.ini',
            'VERSION'
          ]
        },
      ],
      src: [
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'src/__init__.py',
            'src/main.py'
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'src/core/__init__.py',
            'src/core/config.py',
            'src/core/logger.py',
            'src/core/response.py',
            'src/core/decorator/__init__.py',
            'src/core/decorator/api_endpoint.py',
            'src/core/decorator/api_required.py',
            'src/core/request/__init__.py',
            'src/core/request/api_request.py',
            'src/core/validator/__init__.py',
            'src/core/validator/uuid_validator.py',
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'src/handlers/__init__.py',
            'src/handlers/user_handler.py',

          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'src/models/__init__.py',
            'src/models/model.py',
            'src/models/user_model.py',
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'src/schemas/__init__.py',
            'src/schemas/user_schema.py',
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'src/services/__init__.py',
          ]
        },
      ],
      test: [
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'tests/__init__.py',
            'tests/conftest.py',
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'tests/unit/__init__.py',
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'tests/unit/core/__init__.py',
            'tests/unit/core/test_logger.py',
            'tests/unit/core/test_response.py',
            'tests/unit/core/decorator/__init__.py',
            'tests/unit/core/decorator/test_api_endpoint.py',
            'tests/unit/core/decorator/test_api_required.py',
            'tests/unit/core/request/__init__.py',
            'tests/unit/core/request/test_api_request.py',
            'tests/unit/core/validator/__init__.py',
            'tests/unit/core/validator/test_validator.py',
          ]
        },
        {
          path: ApiFiles.PYTHON37_PATH,
          templates: [
            'tests/unit/handlers/__init__.py',
            'tests/unit/handlers/test_user_handler',
          ]
        },
      ],
    };
  }

}
