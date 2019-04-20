import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {TvService} from '../../../core/services/tv.service';
import {Tv} from '../../../shared/interfaces/tv';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tv-edit',
  templateUrl: './tv-edit.component.html',
  styleUrls: ['./tv-edit.component.css']
})
export class TvEditComponent implements OnInit {
  tvForm$: Observable<FormGroup>;
  selectedPictures: Array<File>;
  private tvId: string;

  constructor(private tvService: TvService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.tvId = this.activatedRoute.snapshot.params.id;
    this.fillForm();
  }

  private fillForm(): void {
    this.tvForm$ = this.tvService.getTv(this.tvId).pipe(map((tv: Tv) => {
      return this.fb.group({
        brand: [tv.brand, [Validators.required]],
        model: [tv.model, [Validators.required]],
        price: [tv.price, [Validators.required, Validators.min(0)]],
        description: [tv.description, [Validators.required]],
      });
    }));
  }

  handleEdit(formGroup: FormGroup) {
    const tvObj: Tv = formGroup.value;
    this.tvService.editTv(tvObj, this.selectedPictures).subscribe(() => {
      this.snackbar.open('Промените са запазени успешно!', 'Затвори', {
        duration: 3000,
      });
      this.fillForm();
    }, error => {
      this.snackbar.open('Зъзникна грешка при запазване на промените!', 'Затвори', {
        duration: 3000,
      });
    });
  }


}
