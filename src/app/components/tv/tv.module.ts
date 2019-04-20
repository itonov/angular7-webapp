import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';

import {TvAddComponent} from './tv-add/tv-add.component';
import {TvRoutingModule} from './tv-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TvAllComponent} from './tv-all/tv-all.component';
import {TvEditComponent} from './tv-edit/tv-edit.component';
import {TvDetailsComponent} from './tv-details/tv-details.component';

@NgModule({
  declarations: [
    TvAddComponent,
    TvAllComponent,
    TvEditComponent,
    TvDetailsComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule,
    RouterModule,
    TvRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
  ],
  providers: [],
  exports: [
    TvAddComponent,
    TvAllComponent,
    TvEditComponent,
    TvDetailsComponent,
  ],
})
export class TvModule {
}
