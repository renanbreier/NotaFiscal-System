import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import {
    AppInfoService,
    AuthGuardService,
    AuthService,
    ScreenService,
} from './shared/services';
import {provideHttpClient} from "@angular/common/http";
import {ClienteService} from "./shared/services/cliente.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    ClienteService,
    AuthGuardService,
    AuthService,
    ScreenService,
    AppInfoService,
  ]
};
