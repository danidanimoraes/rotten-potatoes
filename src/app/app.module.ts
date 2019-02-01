import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule  } from '@angular/fire/storage';
import { AngularFireAuthModule  } from '@angular/fire/auth';


import { environment } from '../environments/environment';
import { AppRoutingModule } from './/app-routing.module';

import { AppComponent } from './app.component';
import { ItemsComponent } from './items/items.component';
import { FirebaseService } from './firebase.service';
import { NewItemComponent } from './new-item/new-item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './authentitcation.service';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    NewItemComponent,
    ItemDetailComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    AngularFireStorageModule,
    CommonModule,
    AngularFireAuthModule
  ],
  providers: [FirebaseService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
