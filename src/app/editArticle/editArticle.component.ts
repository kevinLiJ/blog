import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { timeFormatter } from '../shared/util';
import { ActivatedRoute, Router  } from '@angular/router';
import { ArticlesService } from '../shared/service/articles.service';
import { LoginStatusService } from '../shared/service/loginStatus.service';
import { ClassService } from '../shared/service/class.service';

@Component({
  selector: 'edit-article',
  styleUrls:['./editArticle.component.css'],
  templateUrl: './editArticle.component.html'
})

export class EditArticleComponent {
  
  constructor(
    private _articlesService:ArticlesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _loginStatusService: LoginStatusService,
    private _classService: ClassService
    ){}
  
  @ViewChild('htmlArticleContent') htmlArticleContent;

  public isLogin = this._loginStatusService.getLoginStatus();
  public articleInfo:any = {
    md_content : ''
  };
  public isTipShow = false;
  public classes:string[] = [];

  // 允许textarea输入tab
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

  // 显示提示框
  showTips(){
    this.isTipShow = true;
    setTimeout(() => {
      this.isTipShow = false;
    },4000)
  }

  ngOnInit(){
    if(!this.isLogin){
      this.showTips();
    }
    // 初始化文章内容
    let articleId = this._activatedRoute.snapshot.params['id'];
    this._articlesService.getArticle(articleId)
    .subscribe(
      articleInfo => {
        this.articleInfo = articleInfo;
        console.log(this.articleInfo.type)
      },
      error => console.log(error)
    )
    // 获取class类别
    this._classService.getclass()
    .subscribe(
      classes => {this.classes = classes;console.log(this.classes);
      },
      error => console.log(error)
    )
  }

  // 修改提交事件
  submitArticles(){
    // 没登录情况不可提交
    if(!this.isLogin){
      this.showTips();
      return ;
    }

    // 获取翻译的html内容
    this.articleInfo.content = this.htmlArticleContent.el.nativeElement.innerHTML;
    // 更新文章的对象
    var editArticleInfoObj = {
      last_mod_time: timeFormatter(new Date()),
      content: this.articleInfo.content,
      md_content: this.articleInfo.md_content,
      title: this.articleInfo.title,
      type: this.articleInfo.type
    }
    this._articlesService.updateArticle(this.articleInfo.id, editArticleInfoObj)
    .subscribe(
      resp => {
        this._router.navigateByUrl('/article/' + this.articleInfo.id)
      },
      error => {
        console.log(error);
      }
    )
  }
}
