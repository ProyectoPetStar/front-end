import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {
  private URL = environment.BASE_URL_SERVICE + '/Login';
  
  
  constructor(private http: HttpClient) { }



  login(usuario_acceso:string, clave_acceso:string, id_sistemas:number): Observable<any>{
    // let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
    const body = new HttpParams()
    .set('action', 'Login')
    .set('usuario_acceso', usuario_acceso)
    .set('clave_acceso', clave_acceso)
    .set('id_sistemas', ""+id_sistemas);

    // return this.http.post<User>(this.URL,body.toString(),{headers: headers});
    return this.http.post<User>(this.URL,body);
  }


}
