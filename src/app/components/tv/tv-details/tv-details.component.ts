import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {TvService} from '../../../core/services/tv.service';
import {Tv} from '../../../shared/interfaces/tv';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-tv-details',
  templateUrl: './tv-details.component.html',
  styleUrls: ['./tv-details.component.css']
})
export class TvDetailsComponent implements OnInit {
  selectedTv$: Observable<Tv>;
  selectedPicLocation: string;

  constructor(private tvService: TvService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const tvId = this.activatedRoute.snapshot.params.id;
    this.selectedTv$ = this.tvService.getTv(tvId);
  }

}
