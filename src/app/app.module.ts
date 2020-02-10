import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapboxModule } from './mapbox/mapbox.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule} from './app-routing/app-routing.module';
import { FirearmsComponent } from './firearms/firearms.component';
import { JournalComponent } from './journal/journal.component';
import { DirectionsComponent } from './directions/directions.component';
import { ActivityService } from './services/journal.service';
import { MapService } from './services/map.service';

//firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MapComponent } from './map/map.component';
import { LiveComponent } from './live/live.component';
import { LoginComponent } from './login/login.component';
import { LiveCasesComponent } from './live-cases/live-cases.component';
import { LightsComponent } from './lights/lights.component';



@NgModule({
  declarations: [AppComponent, HomeComponent, FirearmsComponent, JournalComponent, DirectionsComponent, MapComponent, LiveComponent, LoginComponent, LiveCasesComponent, LightsComponent],
  imports: [BrowserModule, MapboxModule, AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
  ],
  providers: [ActivityService, MapService],
  bootstrap: [AppComponent],
})
export class AppModule {}
