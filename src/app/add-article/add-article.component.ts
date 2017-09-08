import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router  } from '@angular/router';
import { timeFormatter } from '../shared/util';
import { ArticlesService } from '../shared/service/articles.service';
import { LoginStatusService } from '../shared/service/loginStatus.service';

@Component({
  selector: 'app-add-article',
  styleUrls:['../editArticle/editArticle.component.css'],
  templateUrl: '../editArticle/editArticle.component.html'
})

export class AddArticleComponent {
  
  constructor(
  private _articlesService:ArticlesService,
  private _router: Router, 
  private _loginStatusService: LoginStatusService){}
  
  @ViewChild('htmlArticleContent') htmlArticleContent;

  public isLogin = this._loginStatusService.getLoginStatus();
  articleInfo:any = {
    md_content : '',
    title: ''
  };
  
  public isTipShow = false;
  // 显示提示框
  showTips(){
    this.isTipShow = true;
    setTimeout(() => {
      this.isTipShow = false;
    },4000)
  }
  textareaAllowTab(e) {
    if (e.keyCode == 9) {
        e.preventDefault();
        var indent = '    ';
        var thisTextarea = e.target;
        var start = thisTextarea.selectionStart;
        var end = thisTextarea.selectionEnd;
        var selected = window.getSelection().toString();
        selected = indent + selected.replace(/\n/g, '\n' + indent);
        thisTextarea.value = thisTextarea.value.substring(0, start) + selected
                + thisTextarea.value.substring(end);
        thisTextarea.setSelectionRange(start + indent.length, start
                + selected.length);
    }
  }

  ngOnInit(){
    if(!this.isLogin){
      this.showTips();
    }
  }

  submitArticles(){
    if(!this.isLogin){
      this.showTips();
      return;
    }
    let htmlContent = this.htmlArticleContent.el.nativeElement.innerHTML;
    let date = new Date();
    var articleInfoObj = {
      last_mod_time: timeFormatter(new Date()),
      creat_time: timeFormatter(new Date()),
      num_of_collections: 0,
      content: htmlContent,
      title: this.articleInfo.title,
      md_content: this.articleInfo.md_content
    }
    this._articlesService.addArticle(articleInfoObj)
    .subscribe(
      resp => {
        this._router.navigateByUrl('/');
      },
      error => {
        console.log(error);
      }
    )
  }





}

