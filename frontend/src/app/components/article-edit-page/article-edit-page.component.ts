import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/model/article-model';
import { fileValidator } from 'src/app/public/validator/file-validator';

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.scss'],
})
export class ArticleEditPageComponent {
  formContact!: FormGroup;
  isSubmitted: boolean = false;

  articleId: string = '';
  article!: Article;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.articleId = this.activatedRoute.snapshot.paramMap.get('id') || '';

    if (this.articleId != '') {
      this.articleService.getArticlesById(this.articleId).subscribe({
        next: (result) => {
          this.article = result;
          this.formContact.setValue({
            title: this.article.title,
            content: this.article.content,
            author: this.article.author,
          });
        },
        error: (result: HttpErrorResponse) => {
          this._snackBar.open(
            'Article with given Id does not exists !!',
            'close',
            {
              duration: 5500,
              panelClass: 'app-notification-error',
            }
          );
        },
      });
    }
    this.formContact = this.formBuilder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(10),
        ],
      ],
      author: [
        'author name',
        [
          Validators.required,
          Validators.maxLength(40),
          Validators.minLength(10),
        ],
      ],

      content: [
        '',
        [
          Validators.required,
          Validators.minLength(70),
          Validators.maxLength(121),
        ],
      ],
      image: ['', [fileValidator(['jpg', 'png', 'gif', 'jpeg'])]],
    });
  }

  onSubmit(): void {
    if (this.formContact.valid) {
      if (this.articleId != '') {
        this.article.title = this.formContact.get('title')?.value;
        this.article.author = this.formContact.get('author')?.value;
        this.article.content = this.formContact.get('content')?.value;

        this.articleService.updateArticle(this.article).subscribe({
          next: (result) => {
            this._snackBar.open('Article edited successfully!!', 'close', {
              duration: 5500,
              panelClass: 'app-notification-success',
            });
            this.router.navigateByUrl('/home');
          },
          error: (result: HttpErrorResponse) => {
            this._snackBar.open('Article added successfully!!', 'close', {
              duration: 5500,
              panelClass: 'app-notification-error',
            });
          },
        });
      } else {
        this.articleService.addArticle(this.formContact.value).subscribe({
          next: (result) => {
            this._snackBar.open('Article added successfully!!', 'close', {
              duration: 5500,
              panelClass: 'app-notification-success',
            });
            this.router.navigateByUrl('/home');
          },
          error: (result: HttpErrorResponse) => {
            if (result.status == 400) {
              this._snackBar.open(
                'Article with given title is exist!!',
                'close',
                {
                  duration: 5500,
                  panelClass: 'app-notification-error',
                }
              );
            } else {
              this._snackBar.open('Article added successfully!!', 'close', {
                duration: 5500,
                panelClass: 'app-notification-error',
              });
              console.log(result);
            }
          },
        });
      }
    }
  }
}
