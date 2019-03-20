import Utils from "../../utils/utils";
import {Base} from "../core/base";
import File from '../core/file';
import {IClientOptions} from './client-options.model';

export class ClientFiles extends File {

  private static CLIENT_TEMPLATE_PATH = '../../../templates/client';
  private static ANGULAR_PATH = 'angular/';

  constructor(generator: Base, options: IClientOptions) {
    super(generator, options, ClientFiles.CLIENT_TEMPLATE_PATH);
  }

  public files() {
    return this.angularFiles();
  }

  public destinationName(): string {
    return Utils.convertKebabCase(this.options.baseName + '-client');
  }

  private angularFiles() {
    return {
      assets: [
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/assets/img/logo.svg',
            'src/assets/img/oval.svg',
            'src/assets/scss/global.scss',
            'src/assets/scss/vendor.scss',
            'src/assets/.gitkeep',
          ]
        },
      ],
      common: [
        {
          templates: [
            '.editorconfig',
            '.gitignore',
          ]
        },
      ],
      project: [
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'angular.json',
            'package.json',
            'README.md',
            'tsconfig.json',
            'tslint.json'
          ]
        },
      ],
      src: [
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/browserslist',
            'src/favicon.ico',
            'src/index.html',
            'src/karma.conf.js',
            'src/main.ts',
            'src/polyfills.ts',
            'src/styles.scss',
            'src/test.ts',
            'src/tsconfig.app.json',
            'src/tsconfig.spec.json',
            'src/tslint.json',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/environments/environment.prod.ts',
            'src/environments/environment.ts',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/app/app.component.html',
            'src/app/app.component.ts',
            'src/app/app.module.ts',
            'src/app/app-routing.module.ts',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/app/shared/index.ts',
            'src/app/shared/shared.module.ts',
            'src/app/shared/directives/index.ts',
            'src/app/shared/directives/has-any-role.directive.ts',
            'src/app/shared/directives/match-height.directive.ts',
            'src/app/shared/directives/toggle-fullscreen.directive.ts',
            'src/app/shared/footer/footer.component.ts',
            'src/app/shared/footer/footer.component.html',
            'src/app/shared/footer/footer.component.scss',
            'src/app/shared/navbar/navbar.component.ts',
            'src/app/shared/navbar/navbar.component.html',
            'src/app/shared/navbar/navbar.component.scss',
            'src/app/shared/footer/footer.component.ts',
            'src/app/shared/footer/footer.component.html',
            'src/app/shared/footer/footer.component.scss',
            'src/app/shared/routes/content-layout.routes.ts',
            'src/app/shared/routes/full-layout.routes.ts',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [

            'src/app/pages/content-pages/content-pages.module.ts',
            'src/app/pages/content-pages/content-pages-routing.module.ts',
            'src/app/pages/content-pages/error/error-page.component.html',
            'src/app/pages/content-pages/error/error-page.component.ts',
            'src/app/pages/content-pages/error/error-page.component.scss',
            'src/app/pages/content-pages/callback/callback.component.html',
            'src/app/pages/content-pages/callback/callback.component.ts',
            'src/app/pages/content-pages/callback/callback.component.scss',
            'src/app/pages/full-pages/full-pages.module.ts',
            'src/app/pages/full-pages/full-pages-routing.module.ts',
            'src/app/pages/full-pages/home/home-page.component.html',
            'src/app/pages/full-pages/home/home-page.component.ts',
            'src/app/pages/full-pages/profile/profile-page.component.scss',
            'src/app/pages/full-pages/profile/profile-page.component.html',
            'src/app/pages/full-pages/profile/profile-page.component.ts',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/app/dashboard/dashboard.component.html',
            'src/app/dashboard/dashboard.component.ts',
            'src/app/dashboard/dashboard.module.ts',
            'src/app/dashboard/dashboard-routing.module.ts',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/app/layouts/index.ts',
            'src/app/layouts/content/content-layout.component.html',
            'src/app/layouts/content/content-layout.component.ts',
            'src/app/layouts/full/full-layout.component.html',
            'src/app/layouts/full/full-layout.component.scss',
            'src/app/layouts/full/full-layout.component.ts',
          ]
        },
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'src/app/core/index.ts',
            'src/app/core/core.module.ts',
            'src/app/core/auth/auth.service.ts',
            'src/app/core/auth/auth-guard.service.ts',
            'src/app/core/auth/index.ts',
            'src/app/core/auth/role-guard.service.ts',
            'src/app/core/interceptors/auth.interceptor.ts',
            'src/app/core/interceptors/auth-expired.interceptor.ts',
            'src/app/core/interceptors/error-handler.interceptor.ts',
            'src/app/core/interceptors/index.ts',
            'src/app/core/models/index.ts',
            'src/app/core/models/user.model.ts',
            'src/app/core/services/index.ts',
            'src/app/core/services/logger.service.ts',
            'src/app/core/services/user.service.ts',
          ]
        },
      ],

      teste2e: [
        {
          path: ClientFiles.ANGULAR_PATH,
          templates: [
            'e2e/tsconfig.e2e.json',
            'e2e/protractor.conf.js',
            'e2e/src/app.e2e-spec.ts',
            'e2e/src/app.po.ts',
          ]
        }
      ],
    };
  }

}
