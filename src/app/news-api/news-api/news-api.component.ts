import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-news-api',
  templateUrl: './news-api.component.html',
  styleUrls: ['./news-api.component.scss']
})
export class NewsApiComponent implements OnInit {
  articles = [];
  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.newsApiService.fetchArticles(params.get('category'));
      })
    ).subscribe(response => {
      console.log('response', response);
      this.articles = response.articles;
    });
  }

}


