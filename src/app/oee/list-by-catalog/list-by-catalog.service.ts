import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogo } from '../../models/catalogo';
import { Linea } from '../../models/linea';
import { Equipo } from '../../models/equipo';
import { Producto } from '../../models/producto';
import { RazonParo } from  '../../models/razon-paro';
import { environment } from '../../../environments/environment';

@Injectable()
export class ListByCatalogService {

  private URL = environment.BASE_URL_SERVICE + '/Catalogos';
  private URL_EQUIPOS= environment.BASE_URL_SERVICE + '/Equipos';
  private URL_PRODUCTOS= environment.BASE_URL_SERVICE + '/Productos';
  private URL_RAZON = environment.BASE_URL_SERVICE + '/RazonParo';

  constructor(private http: HttpClient) { }

  /* 
   * Fragmento de codigo para catalogos genericos 
   */
  getElementsByCatalog(id_usuario: number, tableName: string): Observable<any> {
    return this.http.get<Catalogo>(this.URL + '?action=getCatalogosData&tableName=' + tableName + '&id_usuario=' + id_usuario);
  }

  update(id_usuario: number, tableName: string, catalogo: Catalogo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'blockCatalogo')
      .set('tableName', tableName)
      .set('idCatalogo', "" + catalogo.id)
      .set('activoCatalogo', "" + catalogo.activo)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL, body);
  }


   /*
    * Peticiones para catalogo de equipos
    */ 
  getElementsEquipos(id_usuario: number): Observable<any> {
    return this.http.get<Equipo>(this.URL_EQUIPOS + '?action=getAllEquipos&id_usuario=' + id_usuario);
  }

  updateEquipos(id_usuario: number, equipo: Equipo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'blockEquipo')
      .set('id_equipo', ''+equipo.id_equipos)
      .set('activo', ''+equipo.activo)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL_EQUIPOS, body);
  }

   /*
    * Peticiones para catalogo de productos
    */ 
  getElementsProductos(id_usuario: number): Observable<any> {
    return this.http.get<Producto>(this.URL_PRODUCTOS + '?action=getAllProductos&id_usuario=' + id_usuario);
  }

  updateProducto(id_usuario: number, producto: Producto): Observable<any> {
    const body = new HttpParams()
      .set('action', 'blockProducto')
      .set('id_producto', ''+producto.id_producto)
      .set('activo', ''+producto.activo)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL_PRODUCTOS, body);
  }

    /*
    * Peticiones para catalogo de razones de paro
    */ 
   getElementsRazones(id_usuario: number): Observable<any> {
    return this.http.get<any>(this.URL_RAZON + '?action=getAllRazon&id_usuario=' + id_usuario);
  }

  updateRazones(id_usuario: number, razon: RazonParo): Observable<any> {
    const body = new HttpParams()
      .set('action', 'blockRazon')
      .set('id_razon', ''+razon.id_razon_paro)
      .set('activo', ''+razon.activo)
      .set('id_usuario', "" + id_usuario);
    return this.http.post(this.URL_RAZON, body);
  }

}
