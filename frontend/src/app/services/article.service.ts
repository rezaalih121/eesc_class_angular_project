import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Article } from 'src/model/article-model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private apiUrl1: string = 'http://localhost:5000/articles';
  private apiUrl2: string = 'http://localhost:8080/article';
  private apiUrl = this.apiUrl2;

  constructor(
    private httpClient: HttpClient,
    private reouter: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(this.apiUrl);
  }

  getArticlesByTitleOrContent(searchTerm: string): Observable<Article[]> {
    if (this.apiUrl.includes('5000')) {
      return this.httpClient.get<Article[]>(this.apiUrl + '?q=' + searchTerm);
    } else {
      return this.httpClient.get<Article[]>(
        this.apiUrl + '-by-searchTerm/' + searchTerm
      );
    }
  }

  getArticlesById(id: string = '0'): Observable<Article> {
    return this.httpClient.get<Article>(this.apiUrl + '/' + id);
  }

  deleteArticle(articleId: number): Observable<Article> {
    const url = this.apiUrl + '/' + articleId;
    return this.httpClient.delete<Article>(url);
  }

  updateArticle(article: Article): Observable<Article> {
    const url = this.apiUrl + '/' + article.id;
    return this.httpClient.put<Article>(url, article, httpOptions);
  }
  addArticle(article: Article): Observable<Article> {
    return this.httpClient
      .post<Article>(this.apiUrl, article, httpOptions)
      .pipe(
        tap({
          next: (article) => {
            console.log(article);
          },
          error: (result: HttpErrorResponse) => {
            if (result.status == 400) {
            } else {
              console.log(result);
            }
          },
        })
      );
  }
}
