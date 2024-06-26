import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './components/intro/intro.component';
import { BlogGridComponent } from './components/blog-grid/blog-grid.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SharedMaterialModule } from './modules/shared-material/shared-material.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PostPanelComponent } from './components/post-panel/post-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterByPipe } from './filter-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    BlogGridComponent,
    PostPanelComponent,
    FilterByPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SharedMaterialModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    InfiniteScrollModule,
    MatChipsModule
  ],
  providers: [
    provideAnimationsAsync('noop')
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
