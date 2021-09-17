import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PetIshikawa } from '../../models/pet-ishikawa';
import { environment } from '../../../environments/environment';

@Injectable()
export class RegistroService {
  /* 
   * URL del servicio del componente
   */

  private URL = environment.BASE_URL_SERVICE + '/Ishikawa';

  constructor(private http: HttpClient) { }

  /*
   * Consulta de catalogo de lineas. Its important for form of Line
   */
  init(id_usuario: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=loadCombobox&id_usuario=' + id_usuario);
  }

  /*
* Bloque de codigo para peticiones CRUD 
*/
  saveIshikawa(id_usuario: number, ishikawa: PetIshikawa): Observable<any> {
    let contenedor: any = { ishikawa };
    const body = new HttpParams()
      .set('action', 'saveIshikawa')
      .set('data', JSON.stringify(contenedor))
      .set('id_usuario', '' + id_usuario);
    return this.http.post(this.URL, body);
  }

}
