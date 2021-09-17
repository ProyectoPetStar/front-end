import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class PerfilService {

  private URL = environment.BASE_URL_SERVICE + '/Users';

  constructor(private http: HttpClient) { }

  miPerfil(id_acceso:number):Observable<any>{
     return this.http.get<User>(this.URL + '?action=miPerfil&id_usuario='+id_acceso);
  }

}
