import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ToDoListComponent } from './to-do-list/to-do-list.component';
import { ItemDetailFormComponent } from './item-detail-form/item-detail-form.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoListService } from './shared/to-do-list.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ToDoListComponent,
    ItemDetailFormComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: ToDoListComponent, pathMatch: 'full' },
    ]),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToDoListService],
  bootstrap: [AppComponent]
})
export class AppModule { }

