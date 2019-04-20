import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Tv} from '../../shared/interfaces/tv';

const domain = 'http://localhost:9999';

@Injectable({
  providedIn: 'root',
})
export class TvService {

  constructor(private http: HttpClient) {
  }

  createTv(tvData: Tv, picturesArr?: Array<File>): Observable<Tv> {
    const userToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', userToken);

    const formData = new FormData();
    formData.append('brand', tvData.brand);
    formData.append('model', tvData.model);
    formData.append('description', tvData.description);
    formData.append('price', tvData.price.toString());

    if (picturesArr && picturesArr.length > 0) {
      picturesArr.forEach((file, fileIndex) => {
        formData.append(`${file.name}${fileIndex}`, file);
      });
    }
    return this.http.post<Tv>(`${domain}/feed/tv/create`, formData, {headers});
  }

  editTv(tvData: Tv, picturesArr?: Array<File>): Observable<Tv> {
    const userToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', userToken);

    const formData = new FormData();
    formData.append('brand', tvData.brand);
    formData.append('model', tvData.model);
    formData.append('description', tvData.description);
    formData.append('price', tvData.price.toString());

    if (picturesArr && picturesArr.length > 0) {
      picturesArr.forEach((file, fileIndex) => {
        formData.append(`${file.name}${fileIndex}`, file);
      });
    }
    return this.http.post<Tv>(`${domain}/feed/tv/edit`, formData, {headers});
  }

  getAllTvs(): Observable<Array<Tv>> {
    return this.http.get<Array<Tv>>(`${domain}/feed/tv/all`);
  }

  getTv(id: string): Observable<Tv> {
    return this.http.get<Tv>(`${domain}/feed/tv/find/${id}`);
  }

  deleteTv(tvId: string) {
    const userToken = sessionStorage.getItem('token');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', userToken || '');

    return this.http.post(`${domain}/feed/tv/delete`, {
      tvId
    }, {headers});
  }
}
