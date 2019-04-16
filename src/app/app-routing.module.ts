import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'auth', loadChildren: './components/authentication/authentication.module#AuthenticationModule'},
  // {
  //   path: 'event', children: [
  //     {path: ':id/live', component: EventLiveComponent}
  //   ]
  // },
  // {
  //   path: 'user', children: [
  //     {path: '', component: UserTabComponent},
  //     {path: 'create', component: EventCreateComponent},
  //     {path: 'list', component: EventListComponent}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
