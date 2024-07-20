import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppComponent } from './app.component';
import { ComicListComponent } from './comics/comic-list/comic-list.component';
import { ComicDetailModalComponent } from './comics/comic-detail-modal/comic-detail-modal.component';
import { ComicFavoritesComponent } from './comics/comic-favorites/comic-favorites.component';
import { LayoutComponent } from './layout/layout.component';
import { LoadingService } from './services/loading.service';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './app.routes';
import { AuthInterceptor } from './utils/auth.intecerptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ComicListComponent,
    ComicDetailModalComponent,
    ComicFavoritesComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule, // Requerido por ngx-toastr
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    TabsModule.forRoot(), // Añadir el módulo de ngx-bootstrap aquí
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: [
          'http://localhost:3000/auth/login',
          'http://localhost:3000/auth/register',
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    LoadingService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
