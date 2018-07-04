import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { User } from '../../models/user';
import { BASE_URL_SERVICE } from '../../constants';

@Injectable()
export class MetaMasivaService {

  private URL = BASE_URL_SERVICE + '/EtadMetasMasivas';

  constructor(private http: HttpClient) { }

  getInitCatalogos(idUsuario:number): Observable<any> {
    return this.http.get<any>(this.URL + '?action=loadCombobox&id_usuario='+idUsuario);
  }

  preview(id_usuario:number, file:string, idPeriodo:number, idEtad:number, tipoMeta:number, frecuencia:string, anio:number): Observable<any>{
    const body = new HttpParams()
    .set('action', 'preview')
    .set('file', file)
    .set('tipo_meta', ""+tipoMeta)
    .set('frecuencia', ""+frecuencia)
    .set('id_etad', ""+idEtad)
    .set('id_periodo', ""+idPeriodo)
    .set('anio', ""+anio)
    .set('id_usuario', ""+id_usuario)
    return this.http.post<any>(this.URL,body);
  }


  loadData(id_usuario:number, idEtad:number, anio:any, idPeriodo:number ,frecuencia:string, tipo_meta:number): Observable<any>{
    const body = new HttpParams()
    .set('action', 'loadData')
    .set('id_etad', ""+idEtad)
    .set('anio', ""+anio)
    .set('id_periodo', ""+idPeriodo)
    .set('frecuencia', ""+frecuencia)
    .set('tipo_meta', ""+tipo_meta)
    .set('id_usuario', ""+id_usuario)
    return this.http.post<any>(this.URL,body);
  }

  reWriteFile(id_usuario:number, idPeriodo:number, IdLinea:number): Observable<any>{
    const body = new HttpParams()
    .set('action', 'reWriteFile')
    .set('id_periodo', ""+idPeriodo)
    .set('id_linea', ""+IdLinea)
    .set('id_usuario', ""+id_usuario)
    return this.http.post<any>(this.URL,body);
  }

  downloadTemplate(id_usuario:number, idTipoMeta:number, frecuencia:string): Observable<any>{
    const body = new HttpParams()
    .set('action', 'downloadTempleate')
    .set('tipo_meta', ""+idTipoMeta)
    .set('frecuencia', ""+frecuencia)
    .set('id_usuario', ""+id_usuario)
    return this.http.post<any>(this.URL,body);
  }

}