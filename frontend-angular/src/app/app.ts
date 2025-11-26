import { Component, HostBinding, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { DxHttpModule } from 'devextreme-angular/http';
import { FooterComponent } from './shared/components';
import { UnauthenticatedContentComponent } from './unauthenticated-content';
import { SideNavOuterToolbarComponent as SideNavToolbarComponent } from './layouts';

registerLocaleData(localePt);

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    CommonModule,
    DxHttpModule,
    SideNavToolbarComponent,
    FooterComponent,
    UnauthenticatedContentComponent,
  ],
  providers: [
      { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})

export class App {
  @HostBinding('class') get getClass() {
    const sizeClassName = Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
    return `${sizeClassName} app` ;
  }

  constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) { }

  isAuthenticated() {
    return this.authService.loggedIn;
  }
}
