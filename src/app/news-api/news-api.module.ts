import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsApiComponent } from './news-api/news-api.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    NewsApiComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    NewsApiComponent
  ]
})
export class NewsApiModule { }
