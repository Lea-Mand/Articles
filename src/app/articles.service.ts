import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from "./models/article.model";
// import { Comment } from "./models/comment.model";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  _http!: HttpClient;

  constructor(private http: HttpClient) {
    this._http = http;
  }
  
  getArticlesFromServer = (): Observable<Article[]> => {
    debugger;
    return this._http.get<Article[]>("/articles/")
  }
  getArticleComments = (selectedArticle: number): Observable<Article> => {
    debugger;
    return this._http.get<Article>(`/articles/${selectedArticle}/`);
  }
}