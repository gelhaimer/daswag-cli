// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:4200',
  auth: {
    clientID: '6NyNZJsRV_ZPXLQKiQbRlFbJCvomIPPU',
    domain: 'shipster-ippon.eu.auth0.com', // e.g., you.auth0.com
    audience: 'https://shipster-ippon.eu.auth0.com/api/v2/',
    scope: 'openid profile email',
    callbackUrl: 'http://localhost:4200/pages/callback',
    returnTo: 'http://localhost:4200'
  },
  rolesNamespaces: 'http://shipster-app.com/roles'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
