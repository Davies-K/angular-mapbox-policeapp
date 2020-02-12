// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase : {
    apiKey: "Type in your api key here",
    authDomain: "police-patrol-513dc.firebaseapp.com",
    databaseURL: "https://police-patrol-513dc.firebaseio.com",
    projectId: "police-patrol-513dc",
    storageBucket: "police-patrol-513dc.appspot.com",
    messagingSenderId: "227402738864"
  },

  mapbox: {
    accessToken:
      'type in your api key here',
  },
};
