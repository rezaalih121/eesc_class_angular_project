import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  searchForm!: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', [Validators.required]],
    });
  }

  searchInArticles() {
    this.router.navigateByUrl(
      '/home/' + this.searchForm.get('searchTerm')?.value
    );
  }
}
