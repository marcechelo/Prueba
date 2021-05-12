import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from './api/api.component';
import { ChartsComponent } from './charts/charts.component';
import { DatabaseComponent } from './database/database.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'home',
  
  },
  {
    path: 'home',
    component: HomeComponent,
    children:[
      {path:'', pathMatch: 'full', redirectTo:'welcome'},
      {path:'welcome', component: WelcomeComponent},
      {path:'api', component: ApiComponent},
      {path:'db', component:DatabaseComponent},
      {path:'charts', component:ChartsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
