import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/news-api/news-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  language: string;
  constructor(
    private newsApiService: NewsApiService
  ) { }

  ngOnInit() {
    this.newsApiService.languageSubject$.subscribe(language => {
      this.language = language;
    });
  }

  changeLanguage(language) {
    this.newsApiService.languageSubject$.next(language);
    // console.log('laguage', language);
  }

  isDisabled(language) {
    return this.language === language;
  }

}
