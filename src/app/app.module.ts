import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModules } from './material-imports';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CollectionComponent } from './collection/collection.component';
import { RatingCategoryPipe } from './pipes/rating-category.pipe';
import { RatingComponent } from './rating/rating.component';
import { HttpModule } from '@angular/http';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CollectionComponent,
    RatingCategoryPipe,
    RatingComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...MaterialModules,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
