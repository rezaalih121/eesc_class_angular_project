import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleEditPageComponent } from './components/article-edit-page/article-edit-page.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/:searchTerm', component: HomeComponent }, // this is the way to add parameters to URL not with ?searchTerm
  { path: 'contact', component: ContactComponent },
  { path: 'article-edit', component: ArticleEditPageComponent },
  { path: 'article-edit/:id', component: ArticleEditPageComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
