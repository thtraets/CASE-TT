import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CourseAddComponent } from './components/courseinstance/course-add/course-add.component';
import { CourseinstanceOverviewComponent } from './components/courseinstance/courseinstance-overview/courseinstance-overview.component';
import { HomeComponent } from './components/home/home.component';


const appRoutes : Routes = [
  {path: '', component: CourseinstanceOverviewComponent},
  {path: 'secretariaat', component: CourseinstanceOverviewComponent},
  {path: 'coördinatoren', component: CourseAddComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    CourseinstanceOverviewComponent,    
    HomeComponent, 
    CourseAddComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
