import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../news-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-news-api',
  templateUrl: './news-api.component.html',
  styleUrls: ['./news-api.component.scss']
})
export class NewsApiComponent implements OnInit {
  articles = [];
  isLoading = false;
  page = 1;
  numberOfPages;
  private pageSize = 10;
  language: string;


  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.newsApiService.languageSubject$.subscribe(language => {
      this.language = language;
      this.route.paramMap.pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(params => {
          this.page = 1;
          const category = params.get('category');
          return this.newsApiService.fetchArticles({ category, page: 1, language });
        })
      ).subscribe(response => {
        this.articles = response.articles;
        const totalPages = Math.ceil(response.totalResults / this.pageSize);
        this.newsApiService.numberOfPagesSubject$.next(totalPages);
        this.isLoading = false;
      });
    });

    // get acount all pages
    this.newsApiService.numberOfPagesSubject$.subscribe(numberOfPages => {
      this.numberOfPages = numberOfPages;
    });

    // get current page
    this.newsApiService.pageUpdatedSubject$.pipe(
      tap(() => {
        this.isLoading = true;
      })
    ).subscribe((page) => {
      const category = this.route.snapshot.params.category;
      this.page = page;
      this.newsApiService.fetchArticles({ category, page, language: this.language }).subscribe(response => {
        this.articles = response.articles;
        this.isLoading = false;
      });
    });
  }

  next() {
    this.page++;
    this.newsApiService.pageUpdatedSubject$.next(this.page);
  }

  prev() {
    this.page--;
    this.newsApiService.pageUpdatedSubject$.next(this.page);
  }

}

