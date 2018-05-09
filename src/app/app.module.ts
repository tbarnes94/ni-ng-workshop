import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModules } from './material-imports';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './rootReducer';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HttpModule } from '@angular/http';
import { TabsComponent } from './tabs/tabs.component';

import { CollectionEffects } from './collection/collection-effects';
import { BookDetailEffects } from './book-detail/book-detail-effects';
import { DataService } from './services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...MaterialModules,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CollectionEffects,
      BookDetailEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : []
  ],
  providers: [DataService],
  bootstrap: [AppComponent]

})
export class AppModule { }
