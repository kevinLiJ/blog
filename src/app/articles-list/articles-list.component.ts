import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../shared/service/articles.service';
import { ClassService } from '../shared/service/class.service';
import { TimeFormatterPipe } from '../shared/time-formatter.pipe';

@Component({
    selector: 'app-articles-list',
    templateUrl: './articles-list.component.html',
    styleUrls: ['./articles-list.component.css']
})

export class ArticlesListComponent implements OnInit {

    constructor(
        private _articlesService: ArticlesService,
        private _classService: ClassService
    ) {}

    public articlesNumPerPage = 8;
    public totalItems: number = 0;
    public currentPage: number = 1;
    public articles: any[] = [];
    public classes: any[] = [];
    public currentClass: String = '';
    public hotArticles: any[] = [];

    // 分页查询封装
    getArticleList(articleClass = '') {
        this.currentClass = articleClass;
        let paginationData = {
            start: this.articlesNumPerPage * (this.currentPage - 1),
            end: this.articlesNumPerPage * (this.currentPage) - 1,
            type: this.currentClass
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
        // 获取class类别
        this._classService.getclass()
            .subscribe(
                classes => {
                    this.classes = classes;
                    console.log(this.classes);
                },
                error => console.log(error)
            )

        this._articlesService.getHotArticles()
            .subscribe(
                hotArticles => this.hotArticles = hotArticles,
                error => console.log(error)
            )
    }

    // pagintaion 按钮点击事件
    public pageChanged(event: any): void {
        this.currentPage = event.page;
        this.getArticleList();
    }
}