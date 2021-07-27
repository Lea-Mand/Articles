
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from '../models/article.model';
import { Comment } from '../models/comment.model';
import { ArticleService } from '../articles.service';
import { title } from 'process';



@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  startDate = String(new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes());
  comments1: Comment[] = [
    { id: 1, title: "תגובה 1", content: "אני תגובה 1", article_id: 1, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate},
    { id: 2, title: "תגובה 2", content: "אני תגובה 2", article_id: 1, response_to_comment_id: 0, created_at: this.startDate, updated_at:this.startDate },
    { id: 3, title: "תגובה 3", content: "אני תגובה 3", article_id: 1, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 4, title: "תגובה 4", content: "אני תגובה 4", article_id: 1, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 5, title: "תגובה 5", content: "אני תגובה 5", article_id: 1, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 6, title: "תגובה 6", content: "אני תגובה 6", article_id: 1, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate }];
  comments2: Comment[]= [
    { id: 1, title: "תגובה 1", content: "אני תגובה 1", article_id: 2, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 2, title: "תגובה 2", content: "אני תגובה 2", article_id: 2, response_to_comment_id: 0, created_at: this.startDate, updated_at:this.startDate },
    { id: 3, title: "תגובה 3", content: "אני תגובה 3", article_id: 2, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 4, title: "תגובה 4", content: "אני תגובה 4", article_id: 2, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 5, title: "תגובה 5", content: "אני תגובה 5", article_id: 2, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 6, title: "תגובה 6", content: "אני תגובה 6", article_id: 2, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate }];
  comments3: Comment[] = [
    { id: 1, title: "תגובה 1", content: "אני תגובה 1", article_id: 3, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 2, title: "תגובה 2", content: "אני תגובה 2", article_id: 3, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate},
    { id: 3, title: "תגובה 3", content: "אני תגובה 3", article_id: 3, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 4, title: "תגובה 4", content: "אני תגובה 4", article_id: 3, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 5, title: "תגובה 5", content: "אני תגובה 5", article_id: 3, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate },
    { id: 6, title: "תגובה 6", content: "אני תגובה 6", article_id: 3, response_to_comment_id: 0, created_at: this.startDate, updated_at: this.startDate }];
  articles: Article[] = [{ id: 1, title: "מאמר 1", content: "אני מאמר 1", comments: this.comments1,date:this.startDate }, { id: 2, title: "מאמר 2", content: "אני מאמר 2", comments: this.comments2 ,date:this.startDate }, { id: 3, title: "מאמר 3", content: "אני מאמר 3", comments: this.comments3,date:this.startDate  }];
  startShow: boolean = true;
  returnArticle:boolean=false
  _article: Article = { id: 1, title: "xx", content: "xxx", comments: this.comments1 ,date:this.startDate};
  @Input() article!: Article;

  commentsList: Comment[]=this.comments1;

  
  start() {

    this._article = this.article;
    this.startShow = true;
    this.commentsList!=this.articles[this._article.id-1].comments;
  

  }
  contactForm!: FormGroup;
  options = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6}
  ];


  constructor(private modalService: NgbModal, private fb: FormBuilder, private _articleService: ArticleService) {
    this._articleService.getArticleComments(this._article.id).subscribe((data) => {
      data!.comments!.forEach((element) => {
        this.commentsList.push(element);
      });
    }); 
   }

  ngOnInit(): void {
    this.start();
    this.contactForm = this.fb.group({
      num: [null]
    });
  }

  scrollexe(element: HTMLElement) {

    debugger;
    window.scroll(0, 0);
    element.scrollIntoView();

  }
  async scrollfunc(modal: any) {
    debugger
    modal.close();
    const x = ((this.contactForm.value.num) - 1).toString();
    const myelement = document.getElementById(x)
    if (myelement != null) {

      setTimeout(() => this.scrollexe((myelement) as HTMLElement), 300);
    }

  }
  scrollUp() {
    debugger
    window.scroll(0, 0);

  }
  scrollDwon() {
    debugger
    const x = this.options.length-1
    const app = document.getElementById(x.toString());
    const element = app as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth' });
  }

  closeResult = '';
  open(content: any) {
    this.modalService.open(content,
      { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult =
          `Dismissed ${this.getDismissReason(reason)}`;
      });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
