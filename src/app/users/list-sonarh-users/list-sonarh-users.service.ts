import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSonarh } from '../../models/user-sonarh';
import { environment } from '../../../environments/environment';


@Injectable()
export class ListSonarhUsersService {
  private URL = environment.BASE_URL_SERVICE + '/Users';

  constructor(private http: HttpClient) { }

  getSonarhUsuarios(id_usuario:number): Observable<any> {
    return this.http.get<UserSonarh>(this.URL + '?action=getUsersSonarh&id_usuario='+id_usuario);
  }

}
