import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ListaValidacionService {

  private URL = environment.BASE_URL_SERVICE + '/Produccion';

  constructor(private http: HttpClient) { }

  getProducuccionForLiberar(id_usuario: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getProducuccionForLiberar&id_usuario=' + id_usuario);
  }



}
