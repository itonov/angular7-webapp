import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {NonAuthGuard} from './core/guards/non-auth.guard';
import {AdminGuard} from './core/guards/admin.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'auth',
    loadChildren: './components/authentication/authentication.module#AuthenticationModule',
    canActivate: [NonAuthGuard]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'tv',
        loadChildren: './components/tv/tv.module#TvModule'
      }
    ],
    canActivate: [AdminGuard]
  },
  {
    path: 'tv',
    loadChildren: './components/tv/tv.module#TvModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
