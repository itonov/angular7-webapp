import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TvService} from '../../../core/services/tv.service';
import {MatSnackBar} from '@angular/material';
import {Tv} from '../../../shared/interfaces/tv';

@Component({
  selector: 'app-tv-add',
  templateUrl: './tv-add.component.html',
  styleUrls: ['./tv-add.component.css']
})
export class TvAddComponent implements OnInit {
  tvForm: FormGroup;
  selectedPictures: Array<File>;
  currentlyUploading: boolean = false;

  constructor(private fb: FormBuilder,
              private tvService: TvService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.tvForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required]],
    });
  }

  get formControls() {
    return this.tvForm.controls;
  }

  addTv() {
    this.currentlyUploading = true;

    this.tvService.createTv(this.tvForm.value, this.selectedPictures).subscribe((data: Tv) => {
      this.snackBar.open(`${data.brand} ${data.model} е добавен успешно!`, 'Затвори', {
        duration: 3000,
      });

      this.currentlyUploading = false;
    }, error => {
      this.snackBar.open(`Грешка при добавяне!`, 'Затвори', {
        duration: 3000,
      });

      this.currentlyUploading = false;
      console.log(error);
    });
  }

}
