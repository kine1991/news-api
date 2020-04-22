import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AppRoutingModule } from '../app-routing.module';
import { PaginationComponent } from './components/pagination/pagination.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SpinnerComponent,
    PaginationComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent,
    PaginationComponent,
    SpinnerComponent
  ]
})
export class SharedModule { }
