import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiComponent } from './news-api/news-api.component';



@NgModule({
  declarations: [
    NewsApiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsApiComponent
  ]
})
export class NewsApiModule { }
