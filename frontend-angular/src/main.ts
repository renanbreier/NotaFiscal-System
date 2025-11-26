import themes from 'devextreme/ui/themes';
import { bootstrapApplication } from '@angular/platform-browser';
import { locale } from 'devextreme/localization';
import { appConfig } from './app/app.config';
import { App } from './app/app';

locale('pt-BR');

themes.initialized(() => {
  bootstrapApplication(App, appConfig)
    .catch((err) => console.error(err));
});
