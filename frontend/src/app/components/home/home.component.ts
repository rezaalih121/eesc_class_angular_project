import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/model/article-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private articleService: ArticleService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  public listeArticls: Article[] = [];

  searchTerm: string = '';

  ngOnInit() {
    this.searchTerm =
      this.activatedRoute.snapshot.paramMap.get('searchTerm') || '';
    this.reload();
  }
  reload() {
    console.log(this.searchTerm);

    if (this.searchTerm == '') {
      this.articleService.getArticles().subscribe((articles) => {
        console.log(articles);
        this.listeArticls = articles;
      });
    } else {
      this.articleService
        .getArticlesByTitleOrContent(this.searchTerm)
        .subscribe((articles) => {
          console.log(articles);
          this.listeArticls = articles;
        });
    }
  }

  deleteArticle(articleId: number | undefined) {
    if (articleId != undefined) {
      const dialogResponse = this.dialog.open(DeleteDialog, {
        disableClose: true,
        width: '250px',
        exitAnimationDuration: '1210',
        enterAnimationDuration: '1210',
      });

      dialogResponse.afterClosed().subscribe((deleteResponse) => {
        if (deleteResponse) {
          this.articleService.deleteArticle(articleId).subscribe({
            next: (result) => {
              this._snackBar.open('Article deleted successfully!!', 'close', {
                duration: 5500,
                panelClass: 'app-notification-success',
              });
              this.reload();
            },
            error: (result) => {
              this._snackBar.open('Article was deleted before!!', 'close', {
                duration: 5500,
                panelClass: 'app-notification-error',
              });
              this.reload();
            },
          });
        }
      });
    }
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: '../../public/dialogs/deleteDialog.html',
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>) {}
}
