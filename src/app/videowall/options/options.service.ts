import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class OptionsService {

  /* 
   * URL del servicio del componente
   */ 

  private URL = environment.BASE_URL_SERVICE + '/videoWall';

  constructor(private http: HttpClient) { }
    /*
   * Consulta datos video wall
   */ 
  generateVideoWall(id_usuario: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=generateVideoWall&id_usuario=' + id_usuario);
  }

  

}
