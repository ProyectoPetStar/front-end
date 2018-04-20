import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ProductoAsignacion } from '../../models/producto-asignacion';
import { BASE_URL_SERVICE } from '../../constants';

@Injectable()
export class ListaAsignacionProductoService {

  private URL = BASE_URL_SERVICE + '/Productos';

  constructor(private http: HttpClient) { }

  getAllAsignacionMetasByDays(id_usuario:number, perfil:number,id_grupo:number,id_linea:number,fecha_inicio:string, fecha_fin:string): Observable<any> {
    return this.http.get<ProductoAsignacion>(this.URL + '?action=getAllAsignacionMetasByDays&fecha_inicio='+fecha_inicio+'&fecha_fin='+fecha_fin+'&perfil='+perfil+'&id_grupo='+id_grupo+'&id_linea='+id_linea+'&id_usuario='+id_usuario);
  }

  delete(id_usuario: number, id: number): Observable<any> {
    const body = new HttpParams()
      .set('action', 'deleteAsignacionMeta')
      .set('id_usuario', '' + id_usuario)
    return this.http.post(this.URL, body);
  }

}