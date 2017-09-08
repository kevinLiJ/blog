import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/service/articles.service';
import { TimeFormatterPipe } from '../shared/time-formatter.pipe';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})

export class ArticlesListComponent implements OnInit {

  constructor(private _articlesService:ArticlesService) { }

  public articlesNumPerPage = 8;
  public totalItems: number = 0;
  public currentPage: number = 1;
  public articles:any[] = [];

  // 分页查询封装
  getArticleList(){
    console.log(this.currentPage)
    let paginationData = {
      start: this.articlesNumPerPage * (this.currentPage - 1),
      end: this.articlesNumPerPage * (this.currentPage) - 1
    };

    this._articlesService.getArticles(paginationData)
    .subscribe(
      articles => {
        this.totalItems = articles.articlesSum;
        this.articles = articles.articlesInfo;
      },
      error => console.log(error)
    )
  }
 
  ngOnInit() {
    this.getArticleList();
  }

  // pagintaion 按钮点击事件
  public pageChanged(event: any): void {
    this.currentPage = event.page;
    this.getArticleList();
  }
}
