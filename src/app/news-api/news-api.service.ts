import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


interface Article {
  source: {
    id: any;
    name: string;
  };
  author: any;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date | string;
  content: string;
}

interface ArticleResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private url = 'https://newsapi.org/v2/top-headlines';
  private pageSize = 10;
  private apiKey = '92a88fddeb2f485baec2fd18bdde2207';
  private country = 'ru';
  // private country = 'us';
  // private category = 'sports';
  private page = 2;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  fetchArticles(category) {
    const options = {
      params: new HttpParams()
      .set('apiKey', this.apiKey)
      .set('country', this.country)
      .set('pageSize', String(this.pageSize))
      .set('category', String(category))
      .set('page', String(this.page))
    };

    return this.http.get<ArticleResponse>(`${this.url}`, options);
    // .pipe(
    //   map(res => res)
    // );
  }
}
