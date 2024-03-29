import { Injectable } from '@angular/core';
import { Catalogo } from '../../../models/catalogo';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../../../models/equipo';
import { Producto } from '../../../models/producto';
import { RazonParo } from '../../../models/razon-paro';
import { environment } from '../../../../environments/environment';

@Injectable()
export class FormularioDetalleServiceService {

  private URL = environment.BASE_URL_SERVICE + '/Catalogos';
  private URL_EQUIPOS = environment.BASE_URL_SERVICE + '/Equipos';
  private URL_PRODUCTOS= environment.BASE_URL_SERVICE + '/Productos';
  private URL_RAZON = environment.BASE_URL_SERVICE + '/RazonParo';

  constructor(private http: HttpClient) { }
  
  /*
   * Bloque de codigo para peticiones de catalogos genericos
   */
  agregar(id_usuario: number, tableName: string, catalogo: Catalogo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'insertNewCatalogo')
      .set('tableName', tableName)
      .set('valor', catalogo.valor)
      .set('descripcion', "" + catalogo.descripcion)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }

  update(id_usuario: number, tableName: string, catalogo: Catalogo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'updateCatalogo')
      .set('tableName', tableName)
      .set('idCatalogo', "" + catalogo.id)
      .set('activoCatalogo', "" + catalogo.activo)
      .set('descripcion', catalogo.descripcion)
      .set('valor', catalogo.valor)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }

  getElementById(id_usuario: number, tableName: string, id_catalogo:number): Observable<any> {
    return this.http.get<Catalogo>(this.URL + '?action=getDataByID&tableName=' + tableName + '&id_usuario=' + id_usuario + '&idCatalogo='+id_catalogo);
  }

  

  /*
   * Bloque de codigo para peticiones de catalogos de Equipos
   */
  agregarEquipo(id_usuario: number, equipo: Equipo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'insertEquipo')
      .set('descripcion', '' + equipo.descripcion)
      .set('valor', ''+equipo.valor)
      .set('id_usuario', '' + id_usuario );
    return this.http.post(this.URL_EQUIPOS, body);
  }

  updateEquipo(id_usuario: number, equipo: Equipo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'updateEquipo')
      .set('descripcion', ''+equipo.descripcion)
      .set('id_equipo', ''+equipo.id_equipos)
      .set('valor', ''+equipo.valor)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL_EQUIPOS, body);
  }

  getElementEquipoById(id_usuario: number,  id_equipo:number): Observable<any> {
    return this.http.get<Equipo>(this.URL_EQUIPOS + '?action=getEquipoById&id_usuario=' + id_usuario + '&id_equipo='+id_equipo);
  }

  /*
   * Bloque de codigo para peticiones de catalogos de Productos
   */
  agregarProducto(id_usuario: number, producto: Producto): Observable<any> {
    const body = new HttpParams()
      .set('action', 'insertProductos')
      .set('id_linea', '' + producto.id_linea)
      .set('valor', ''+ producto.valor)
      .set('descripcion', ''+ producto.descripcion)
      .set('id_tipo_producto', '' + producto.id_tipo_producto)
      .set('id_usuario', '' + id_usuario );
    return this.http.post(this.URL_PRODUCTOS, body);
  }

  updateProducto(id_usuario: number, producto: Producto): Observable<any> {
    const body = new HttpParams()
      .set('action', 'updateProductos')
      .set('id_producto', ''+producto.id_producto)
      .set('id_linea', ''+producto.id_linea)
      .set('id_tipo_producto', ''+producto.id_tipo_producto)
      .set('valor', ''+producto.valor)
      .set('descripcion', ''+producto.descripcion)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL_PRODUCTOS, body);
  }

  getElementProductoById(id_usuario: number,  id_producto:number): Observable<any> {
    return this.http.get<Producto>(this.URL_PRODUCTOS + '?action=getProductoById&id_usuario=' + id_usuario + '&id_producto='+id_producto);
  }

  getInitProductos(id_usuario: number): Observable<any> {
    return this.http.get<Producto>(this.URL_PRODUCTOS + '?action=loadList&id_usuario=' + id_usuario);
  }


    /*
   * Bloque de codigo para peticiones de catalogos de Razones
   */
  agregarRazon(id_usuario: number, razon: RazonParo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'insertRazon')
      .set('valor', ''+ razon.valor)
      .set('descripcion', ''+ razon.descripcion)
      .set('id_fuente', '' + razon.id_fuente_paro)
      .set('id_usuario', '' + id_usuario );
    return this.http.post(this.URL_RAZON, body);
  }

  updateRazon(id_usuario: number, razon: RazonParo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'updateRazon')
      .set('id_razon', ''+razon.id_razon_paro)
      .set('id_fuente', ''+razon.id_fuente_paro)
      .set('descripcion', ''+razon.descripcion)
      .set('valor', ''+razon.valor)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL_RAZON, body);
  }

  getElementRazonById(id_usuario: number,  id_razon:number): Observable<any> {
    return this.http.get<RazonParo>(this.URL_RAZON + '?action=getRazonById&id_usuario=' + id_usuario + '&id_razon='+id_razon);
  }

  getInitRazon(id_usuario: number): Observable<any> {
    return this.http.get<RazonParo>(this.URL_RAZON + '?action=loadList&id_usuario=' + id_usuario);
  }

}
