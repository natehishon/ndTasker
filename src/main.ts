import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

let defferedPrompt;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => {
    if ('serviceWorker' in navigator && environment.production) {
      navigator.serviceWorker.register('/ngsw-worker.js', {
        updateViaCache: 'none'
      }).then((sw) => {
        sw.update();
      });
    }
  })
  .catch(err => console.log(err))
  .then(() => {
    console.log('here');
    window.addEventListener('beforeinstallprompt', function(event) {
      console.log('beforeinstallprompt fired');
      event.preventDefault();
      defferedPrompt = event;
      defferedPrompt.prompt();
      defferedPrompt.userChoice.then(function(choiceResult) {
        console.log(choiceResult.outcome);
        if (choiceResult.outcome === 'dismissed') {
          console.log('user cancelled installation');
        } else {
          console.log('user added to homescreen');
        }
      });

      return false;
    });
  });
