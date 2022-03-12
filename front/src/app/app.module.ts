import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ActionReducer, MetaReducer, StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {LayoutComponent} from './ui/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {FileInputComponent} from "./ui/file-input/file-input.component";
import {ImagePipe} from './pipes/image.pipe';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatMenuModule} from "@angular/material/menu";
import {CenterCardComponent} from './ui/center-card/center-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ItemComponent} from './pages/item/item.component';
import {itemReducer} from "./store/item.reducer";
import {UserReducer} from "./store/users.reducer";
import {ItemEffects} from "./store/item.effects";
import {UsersEffects} from "./store/users.effects";
import {localStorageSync} from "ngrx-store-localstorage";
import { OneItemComponent } from './pages/one-item/one-item.component';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    FileInputComponent,
    ImagePipe,
    RegisterComponent,
    LoginComponent,
    CenterCardComponent,
    ItemComponent,
    OneItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      items: itemReducer,
      users: UserReducer
    }, {metaReducers}),
    EffectsModule.forRoot([ItemEffects, UsersEffects]),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatMenuModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
