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

  private pageUpdatedSubject$ = new Subject<number>();
  private numberOfPagesSubject$ = new Subject<number>();

  constructor(
    private newsApiService: NewsApiService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      tap(() => {
        this.isLoading = true;
      }),
      switchMap(params => {
        const category = params.get('category');
        return this.newsApiService.fetchArticles(category, 1);
      })
    ).subscribe(response => {
      this.articles = response.articles;
      const totalPages = Math.ceil(response.totalResults / this.pageSize);
      this.numberOfPagesSubject$.next(totalPages);
      this.isLoading = false;
    });

    // get acount all pages
    this.numberOfPagesSubject$.subscribe(numberOfPages => {
      this.numberOfPages = numberOfPages;
    });

    // get current page
    this.pageUpdatedSubject$.pipe(
      tap(() => {
        this.isLoading = true;
      })
    ).subscribe((page) => {
      const category = this.route.snapshot.params.category;
      this.page = page;
      this.newsApiService.fetchArticles(category, page).subscribe(response => {
        this.articles = response.articles;
        this.isLoading = false;
      });
    });
  }

  next() {
    this.page++;
    this.pageUpdatedSubject$.next(this.page);
  }

  prev() {
    this.page--;
    this.pageUpdatedSubject$.next(this.page);
  }

}


