import {Routes} from '@angular/router';

// guard还没有涉及到
import { LoginGuard } from './shared/guard/can-Activate-guard';
import { CanDeactivateGuard } from './shared/guard/can-Deactivate-guard';
import { EditArticleGuard } from './shared/guard/resolve-guard';

import { EditArticleComponent } from './editArticle/editArticle.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { AddArticleComponent } from './add-article/add-article.component';

export const rootRouterConfig:Routes = [
    {path: '', redirectTo: 'articleList', pathMatch: 'full'},
    {path: 'addArticle', component: AddArticleComponent},
    {path: 'editArticle/:id', component: EditArticleComponent},
    {path: 'articleList', component: ArticlesListComponent},
    {path: 'article/:id', component: ArticleDetailComponent}
]
