import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';

import {TvAddComponent} from './tv-add/tv-add.component';
import {TvAllComponent} from './tv-all/tv-all.component';
import {TvEditComponent} from './tv-edit/tv-edit.component';
import {TvDetailsComponent} from './tv-details/tv-details.component';

const tvRoutes: Route[] = [
  {path: 'add', component: TvAddComponent},
  {path: 'all', component: TvAllComponent},
  {path: 'edit/:id', component: TvEditComponent},
  {path: 'details/:id', component: TvDetailsComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(tvRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TvRoutingModule {
}
