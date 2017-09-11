import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../service/comment.service';
import { timeFormatter } from '../util'
@Component({
  selector: 'article-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() articleId:number;
  @Input() commentId:number;
  constructor(
    private _commentService: CommentService
  ) { }

  commentObj:any = {
    article_id: 0,
    comment_id: null,
    comment: '',
    creat_time: ''
  };

  comments:any[] = [];
  isTextareaShow:Boolean = false;
  isArticleComment:Boolean;
  ngOnInit() {
    // 判断当前的评论的层级：文章的评论、还是评论的评论
    this.isArticleComment = this.commentId === undefined;
    this.commentObj.article_id = this.articleId;
    this.updateComment()
  }

  updateComment(){
    this._commentService.getComment(this.articleId)
    .subscribe(
      resp => this.comments = resp.result,
      error => console.log(error.message)
    )
  }

  // 评论提交
  submit(){
    this.commentObj.creat_time = timeFormatter(new Date());
    this._commentService.addComment(this.commentObj)
    .subscribe(
      resp => {
        this.commentObj.comment = '';
        this.updateComment();
        this.isTextareaShow = false;
      },
      error => console.log(error.message)
    )
  }

}
