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

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CollectionComponent,
    RatingCategoryPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ...MaterialModules,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
