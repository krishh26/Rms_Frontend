// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,

	// proxy server
	baseUrl: 'http://localhost:4200',

	// staging server
	//baseUrl: 'http://www.totalhealthbazaar.com/totalhealthbazar/backend/web/index.php/v1',
	fileUrl: 'http://www.totalhealthbazaar.com/bo/backend/web/uploads',

	// baseUrl : 'https://thbbo.fusioninformatics.net/backend/web/index.php/v1',    13.232.97.74
	url: 'http://www.totalhealthbazaar.com/thb/partner',
	socketUrl: 'ws://localhost:3000',
	googleMapAPIKey: 'AIzaSyDOZjUeOBB6qO_15gPimPg4WPNC2I_EDL4'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
