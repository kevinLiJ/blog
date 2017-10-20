import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
    ) {}

    articleInfo: any = {
        creat_time: new Date()
    };
    articleId: number = 0;
    lastModTimeText = "";
    isToTopShow = document.body.scrollHeight > document.body.clientHeight;
    isTop = true;
    timer = null;
    ngOnInit() {
        this.articleId = this._activatedRoute.snapshot.params['id'];
        this.getArticle();
        window.onscroll = () => { //滚动条滚动事件
            var clientHeight = document.documentElement.clientHeight;
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //如果滚动超出一屏，则显示回到顶部按钮
            if (osTop >= clientHeight) {
                this.isToTopShow = true;
            } else { //否则隐藏
                this.isToTopShow = false;
            }
            //主要用于判断当 点击回到顶部按钮后 滚动条在回滚过程中，若手动滚动滚动条，则清除定时器
            if (!this.isTop) {
                clearInterval(this.timer);
            }
            this.isTop = false;
        }
    }

    // 点击喜欢按钮事件
    like() {
        this._articlesService.likeArticle(this.articleId)
            .subscribe(
                resp => {
                    console.log(resp);
                    this.getArticle();
                },
                error => console.log(error)
            )
    }

    // 回到頂部點擊事件
    toTop() {
        this.timer = setInterval(() => {
            //获取滚动条的滚动高度
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            //用于设置速度差，产生缓动的效果
            var speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            this.isTop = true; //用于阻止滚动事件清除定时器
            if (osTop == 0) {
                clearInterval(this.timer);
            }
        }, 30);
    }

    // 获取文章信息
    getArticle() {
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