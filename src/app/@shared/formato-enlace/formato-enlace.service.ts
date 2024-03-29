import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PetReporteEnlace } from '../../models/pet-reporte-enlace';
import { environment } from '../../../environments/environment';

@Injectable()
export class FormatoEnlaceService {

  private URL = environment.BASE_URL_SERVICE + '/EtadReporteEnlace';

  constructor(private http: HttpClient) { }

  /*
* Bloque de codigo para peticiones CRUD 
*/
  insertConfiguracion(id_usuario: number, reporte: PetReporteEnlace): Observable<any> {
    let contenedor: any = { record: reporte };
    const body = new HttpParams()
      .set('action', 'insertConfiguracion')
      .set('record', JSON.stringify(contenedor))
      .set('id_usuario', '' + id_usuario);
    return this.http.post(this.URL, body);
  }

  updateConfiguracion(id_usuario: number, reporte: PetReporteEnlace): Observable<any> {
    let contenedor: any = { record: reporte };
    const body = new HttpParams()
      .set('action', 'updateConfiguracion')
      .set('record', JSON.stringify(contenedor))
      .set('id_usuario', '' + id_usuario);
    return this.http.post(this.URL, body);
  }

}
