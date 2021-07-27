import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article.model';
import {Comment} from '../models/comment.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { ArticleService } from '../articles.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent implements OnInit {
 

  startDate = String(new Date().getDate() + "/" + (new Date().getMonth() + 1) + "/" + new Date().getFullYear()+ " "+new Date().getHours()+":"+new Date().getMinutes());
  select:boolean=false;
  articles: Article[] = 
  [{id:1,title:"מאמר 1",content:"אני מאמר 1",comments:[],date:this.startDate},{id:2,title:"מאמר 2",content:"אני מאמר 2",comments:[],date:this.startDate},{id:3,title:"מאמר 3",content:"אני מאמר 3",comments:[],date:this.startDate}];
  selectedArticle!: Article;
  showArticle: boolean=true;
  showComment:boolean=false;
  onSelectedArticle(article: Article){
    this.selectedArticle=article
  }

  constructor( private _articleService: ArticleService){
    debugger
    this._articleService.getArticlesFromServer().subscribe((data) => {
      data.forEach((element) => {
        this.articles.push(element);
      });
    });
     }
 
  ngOnInit() {
  }

  openComments=(article: Article)=>{
    this.showArticle=false;
    this.showComment=true;
    this.onSelectedArticle(article);
    this.select=!this.select;
  }
}
