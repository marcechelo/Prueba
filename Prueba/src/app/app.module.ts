import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { WelcomeComponent } from './welcome/welcome.component';
import { ApiComponent } from './api/api.component';
import { DatabaseComponent } from './database/database.component';
import { ChartsComponent } from './charts/charts.component';
import { CommonModule } from '@angular/common'; 

//ng-formly
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyHorizontalWrapper } from '../app/database/horizontal-wrapper';

//Angular Material Componets
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    ApiComponent,
    DatabaseComponent,
    ChartsComponent,
    FormlyHorizontalWrapper
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatDividerModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    FormlyModule.forRoot({ 
      extras: { lazyRender: true },
      wrappers: [{ name: 'form-field-horizontal', component: FormlyHorizontalWrapper }],
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
     }),
    FormlyBootstrapModule,
    MatSnackBarModule,
    MatListModule,
    CommonModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
