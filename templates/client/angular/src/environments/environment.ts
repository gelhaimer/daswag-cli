// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'YOUR-API-URL',
  auth: {
    clientID: 'AUTH0-CLIENT-ID',
    domain: 'AUTH0-DOMAINE', // e.g., you.auth0.com
    audience: 'AUTH0-AUDIENCE',
    scope: 'openid profile email',
    callbackUrl: 'YOUR-CALLBACK-URL',
    returnTo: 'YOUR-URL'
  },
  rolesNamespaces: 'AUTH0-ROLE-NAMESPACE'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
