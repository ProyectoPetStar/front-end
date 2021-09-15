import { Injectable } from '@angular/core';
import { JwtHelperService  } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

  constructor(private jwtHelper: JwtHelperService){}

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting 
    // whether or not the token is expired
    return !this.jwtHelper.isTokenExpired(token);
    
  }

  public getIdUsuario(): number{
     return this.jwtHelper.decodeToken(this.getToken()).sub || -1;
     
  }

  public getRolesOee():string{
    return this.jwtHelper.decodeToken(this.getToken()).roles_oee || "0";
  }
  public getRolesEtad():string{
    return this.jwtHelper.decodeToken(this.getToken()).roles_etad || "0";
  }
  public getRolesIshikawa():string{
    return this.jwtHelper.decodeToken(this.getToken()).roles_ishikawa || "0";
  }
  public getRolesGenerales():string{
    return this.jwtHelper.decodeToken(this.getToken()).roles_generales || "0";
  }
  public getRolesVideoWall():string{
    return this.jwtHelper.decodeToken(this.getToken()).roles_videowall || "0";
  }

  public getId_Grupo():number{
    return this.jwtHelper.decodeToken(this.getToken()).id_grupo || -1;
  }

  public getId_Linea():number{
    return this.jwtHelper.decodeToken(this.getToken()).id_linea || -1;
  }

  public getId_GpoLinea():number{
    return this.jwtHelper.decodeToken(this.getToken()).id_grupo_linea || -1;
  }

  public getIdEtad():number{
    return this.jwtHelper.decodeToken(this.getToken()).id_etad || -1;
  }

/**
 * @function permissionEdit
 * @param  {number} idPerfil -  id del perfil que tiene permiso a tener editado el campo
 * @return  {boolean} 
 * @description funcion utilizada para recuperar los perfiles que vienen en el token y verifica 
 * si dentro de los perfiles viene el que tiene permiso para editar
 */
  public permissionEdit(idPerfil:number):boolean{

    let perfiles:string = this.jwtHelper.decodeToken(this.getToken()).perfiles || "-1";
    let idPerfiles = perfiles.split(",").map(el=>parseInt(el));
    return (idPerfiles.indexOf(idPerfil) == -1);
  }

}