import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ngxBootstrap from 'ngx-bootstrap';
import { MarkdownModule } from 'angular2-markdown';

import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { ListComponent } from './shared/list/list.component';
import { HeadComponent } from './shared/head/head.component';
import { EditArticleComponent } from './editArticle/editArticle.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AddArticleComponent } from './add-article/add-article.component';


import { LoginService } from './shared/service/login.service';
import { ArticlesService } from './shared/service/articles.service';
import { LoginStatusService } from './shared/service/loginStatus.service';
import { LoginGuard } from './shared/guard/can-Activate-guard';
import { CanDeactivateGuard } from './shared/guard/can-Deactivate-guard';
import { EditArticleGuard } from './shared/guard/resolve-guard';
import { TimeFormatterPipe } from './shared/time-formatter.pipe';

let rootRouterModule:ModuleWithProviders = RouterModule.forRoot(rootRouterConfig, {useHash : true});

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    HeadComponent,
    EditArticleComponent,
    ArticlesListComponent,
    TimeFormatterPipe,
    ArticleDetailComponent,
    AddArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    rootRouterModule,
    FormsModule,
    ReactiveFormsModule,
    ngxBootstrap.PaginationModule.forRoot(),
    ngxBootstrap.PopoverModule.forRoot(),
    ngxBootstrap.ModalModule.forRoot(),
    ngxBootstrap.AlertModule.forRoot(),
    ngxBootstrap.BsDropdownModule.forRoot(),
    MarkdownModule.forRoot()
  ],
  providers: [ArticlesService, LoginService, LoginStatusService, LoginGuard, CanDeactivateGuard, EditArticleGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
