import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicListComponent } from './comics/comic-list/comic-list.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './utils/auth.guards';
import { ComicFavoritesComponent } from './comics/comic-favorites/comic-favorites.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: '/comics', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'comics', component: ComicListComponent },
      { path: 'favorites', component: ComicFavoritesComponent }
    ]
  },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
