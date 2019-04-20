import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {FileUploadComponent} from './file-upload/file-upload.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
  ],
  providers: [],
  exports: [
    NavBarComponent,
    FileUploadComponent,
  ]
})
export class SharedModule {
}
