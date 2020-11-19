// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`. 
// The list of file replacements can be found in `angular.json`.
import { version} from '../../package.json'

export const environment = {
  production: false,
  Version: version,
  firebase : {

    apiKey: "AIzaSyAK5IpnbWJQ3hKe5kN98TwNPuvQMqYHgt4",
    authDomain: "tcs-maitree-titans.firebaseapp.com",
    databaseURL: "https://tcs-maitree-titans.firebaseio.com",
    projectId: "tcs-maitree-titans",
    storageBucket: "tcs-maitree-titans.appspot.com",
    messagingSenderId: "954936397148",
    appId: "1:954936397148:web:1a6260c037bda0d552c599",
    measurementId: "G-MBL04ZV08Q"
  }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
