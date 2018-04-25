import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BASE_URL_SERVICE } from '../../constants';

@Injectable()
export class ListaFallasService {

  private URL = BASE_URL_SERVICE + '/Fallas';
 
  constructor(private http: HttpClient) { }

  /*
   * Consulta de catalogo de lineas. Its important for form of Line
   */ 
  getCatalogos(id_usuario: number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=loadCombobox&id_usuario=' + id_usuario);
  }
  /*
   * Fin de catalogos requeirdos
   */ 

  getAllFallasByDays(id_usuario: number, params:any): Observable<any> {
    return this.http.get<any>(this.URL + '?action=getAllFallasByDays&id_usuario=' + id_usuario + 
    '&fecha_inicio='+ params.inicio +
    '&fecha_termino='+ params.fin + 
    '&id_linea='+ params.id_linea +
    '&id_grupo='+ params.id_grupo +
    '&id_turno='+ params.id_turno );
  }

  delete(id_usuario: number, id_falla: number): Observable<any> {
    const body = new HttpParams()
      .set('action', '')
      .set('id_falla', '' + id_falla)
      .set('id_usuario', '' + id_usuario)
    return this.http.post(this.URL, body);
  }


}