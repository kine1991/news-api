import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewsApiComponent } from './news-api/news-api/news-api.component';
import { HeaderComponent } from './shared/components/header/header.component';


const routes: Routes = [
  { path: '', component: HeaderComponent},
  { path: 'news/:category', component: NewsApiComponent},
  // { path: 'general', component: NewsApiComponent},
  // { path: 'health', component: NewsApiComponent},
  // { path: 'science', component: NewsApiComponent},
  // { path: 'sports', component: NewsApiComponent},
  // { path: 'technology', component: NewsApiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// business general health science sports technology
