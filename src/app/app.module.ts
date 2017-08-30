import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ngxBootstrap from 'ngx-bootstrap';

import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { ListComponent } from './shared/list/list.component';
import { HeadComponent } from './shared/head/head.component';
import { EditArticleComponent } from './editArticle/editArticle.component';
import { ContactService } from './shared/service/contact.service';

let rootRouterModule:ModuleWithProviders = RouterModule.forRoot(rootRouterConfig, {useHash : true});

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeadComponent,
    EditArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    rootRouterModule,
    FormsModule,
    ReactiveFormsModule,
    ngxBootstrap.TabsModule .forRoot()
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {}
