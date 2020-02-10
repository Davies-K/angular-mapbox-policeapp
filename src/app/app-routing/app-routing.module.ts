import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MapboxComponent } from '../mapbox/mapbox.component';
import { FirearmsComponent } from '../firearms/firearms.component'
import { JournalComponent } from '../journal/journal.component';
import { DirectionsComponent } from '../directions/directions.component';
import {MapComponent } from '../map/map.component';
import {LiveComponent } from '../live/live.component';
import { LoginComponent } from '../login/login.component';
import { LiveCasesComponent  } from '../live-cases/live-cases.component';
import { LightsComponent } from '../lights/lights.component'

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'fire', component: FirearmsComponent},
  { path : 'runs', component: JournalComponent},
  { path : 'directions', component: DirectionsComponent},
  { path: 'run/:id', component: MapComponent },
  { path: 'live', component: LiveComponent },
  { path : 'lights', component: LightsComponent },
  { path: 'login', component: LoginComponent},
  { path: 'live-cases', component : LiveCasesComponent },
  {
    path: 'app-home',
    component: HomeComponent
  },
  { path : 'polstations', component: MapboxComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
