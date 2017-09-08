import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';


import { ArticlesService } from '../shared/service/articles.service';
import { timeFormatter } from '../shared/util';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _articlesService: ArticlesService
    ) { }


  articleInfo:any = {
    creat_time: new Date()
  };
  articleId:number = 0;
  lastModTimeText = "";

  ngOnInit() {
    this.articleId = this._activatedRoute.snapshot.params['id'];
    this.getArticle();
  }

  // 点击喜欢按钮事件
  like(){
    this._articlesService.likeArticle(this.articleId)
    .subscribe(
      resp => {
        console.log(resp);
        this.getArticle();
      },
      error => console.log(error)
    )
  }

  // 获取文章信息
  getArticle(){
    this._articlesService.getArticle(this.articleId)
    .subscribe(
      articleInfo => {
        this.articleInfo = articleInfo;
        this.lastModTimeText = "最后编辑于" + this.articleInfo.last_mod_time
      },
      error => console.log(error)
    )
  }

}
