import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as ngxBootstrap from 'ngx-bootstrap';
import { MarkdownModule } from 'angular2-markdown';

// 路由
import { rootRouterConfig } from './app.routes';
// 组件
import { AppComponent } from './app.component';
import { HeadComponent } from './shared/head/head.component';
import { EditArticleComponent } from './editArticle/editArticle.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { CommentComponent } from './shared/comment/comment.component';
import { HomeComponent } from './home/home.component';
// ajax封装
import { LoginService } from './shared/service/login.service';
import { ArticlesService } from './shared/service/articles.service';
import { CommentService } from './shared/service/comment.service';
import { ClassService } from './shared/service/class.service';
// 服务、路由拦截、管道
import { LoginStatusService } from './shared/service/loginStatus.service';
import { LoginGuard } from './shared/guard/can-Activate-guard';
import { CanDeactivateGuard } from './shared/guard/can-Deactivate-guard';
import { EditArticleGuard } from './shared/guard/resolve-guard';
import { TimeFormatterPipe } from './shared/time-formatter.pipe';

let rootRouterModule:ModuleWithProviders = RouterModule.forRoot(rootRouterConfig, {useHash : true});

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    EditArticleComponent,
    ArticlesListComponent,
    TimeFormatterPipe,
    ArticleDetailComponent,
    AddArticleComponent,
    CommentComponent,
    HomeComponent
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
  providers: [
    ArticlesService,
    LoginService,
    CommentService,
    LoginStatusService,
    LoginGuard,
    CanDeactivateGuard,
    EditArticleGuard,
    ClassService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
