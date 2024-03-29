import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ListaFallasService } from './lista-fallas.service';
import Swal from 'sweetalert2';
import { DataTableFallas , deleteItemArray, findRol} from '../../utils';
import { Falla } from '../../models/falla';
import { Linea } from '../../models/linea';
import { Catalogo } from '../../models/catalogo';
import { AuthService } from '../../auth/auth.service';
import { Periodo } from '../../models/periodo';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-lista-fallas',
  templateUrl: './lista-fallas.component.html',
  providers: [ListaFallasService],
  animations: [
    trigger('visibility', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', animate('1s ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class ListaFallasComponent implements OnInit {

  public loading: boolean;
  public submitted: boolean;
  public bVistaPre: boolean;
  public pintaForm:boolean;
  public formBusqueda: FormGroup;
  public paramsBusqueda: any;
  public status: string;
  public mensajeModal:string;
  public noVerBtnFallas: boolean;
  public estatusPeriodo:boolean;
  public verGrupo:boolean;


  public fallas: Array<Falla> = [];
  public gruposLineas: Array<Catalogo>= [];
  public fallaSeleccionada:number;
  /* Catalogos requeridos */
  public lineas: Array<Linea>;
  public grupos: Array<Catalogo>;
  public turnos: Array<Catalogo>;

  public periodos: Array<Periodo> = [];
  public anios: any = [];
  public meses: Array<any> = [];
  public height: number;

  public permission: any = {
    consultFails: false,
    addFail: false,
    editFail:false,
    deleteFail: false
  };

  constructor(
    private service: ListaFallasService,
    private auth: AuthService,
    private fb: FormBuilder ) { }

  ngOnInit() {
    
    this.loading = true;
    this.verGrupo = false;
    this.submitted = false;
    this.bVistaPre = false;
    this.status = "inactive";
    this.paramsBusqueda = {};
    this.fallaSeleccionada = 0;
    this.pintaForm = false;
    this.noVerBtnFallas = false;
    this.estatusPeriodo = true;

    this.permission.addFail = findRol(6, this.auth.getRolesOee());
    this.permission.consultFails = findRol(7, this.auth.getRolesOee());
    this.permission.editFail = findRol(9, this.auth.getRolesOee());
    this.permission.deleteFail = findRol(8, this.auth.getRolesOee());


    this.paramsBusqueda.id_grupo = this.auth.getId_Grupo();
    this.paramsBusqueda.id_linea = this.auth.getId_Linea();
    this.paramsBusqueda.idGpoLinea = this.auth.getId_GpoLinea();

    this.verGrupo = this.auth.permissionEdit(4);
    

    this.service.getCatalogos(this.auth.getIdUsuario()).subscribe(result => {

      if (result.response.sucessfull) {
        this.lineas = result.data.listLineas || [];
        this.grupos = result.data.listGrupos || [];
        this.turnos = result.data.listTurnos || [];
        this.periodos = result.data.listPeriodos || []; 
        this.gruposLineas = result.data.listGposLineas || [];
        this.grupos = this.grupos.filter(el=>el.id != 6);
        
        let tmpAnios = this.periodos.map(el => el.anio);
        this.periodos.filter((el, index) => {
          return tmpAnios.indexOf(el.anio) === index;
        }).forEach((el) => {
          let tmp = el.anio;
          this.anios.push({value: tmp , text: tmp });
        });

        this.meses = this.periodos.filter(el => el.anio == 0);


        this.loading = false;
        this.loadFormulario();

        setTimeout(() => { this.ngAfterViewHttp(); }, 200)
      } else {


        this.loading = false;
        Materialize.toast(result.response.message, 4000, 'red');
      }
    }, error => {


      this.loading = false;
      Materialize.toast('Ocurrió un error en el servicio!', 4000, 'red');
    });


  }

  loadFormulario(): void {
    this.formBusqueda = this.fb.group({
      anio: new FormControl({ value: this.paramsBusqueda.anio, disabled: false }, [Validators.required]),
      idGpoLinea: new FormControl({ value: this.paramsBusqueda.idGpoLinea, disabled: !(!this.auth.permissionEdit(1) || !this.auth.permissionEdit(2) || !this.auth.permissionEdit(3)) }, [Validators.required]),
      idPeriodo: new FormControl({ value: this.paramsBusqueda.idPeriodo, disabled: false }, [Validators.required]),
      id_linea: new FormControl({ value: this.paramsBusqueda.id_linea, disabled: !(!this.auth.permissionEdit(1) || !this.auth.permissionEdit(2) || !this.auth.permissionEdit(3)) }, [Validators.required]),
      id_grupo: new FormControl({ value: this.paramsBusqueda.id_grupo, disabled: !(!this.auth.permissionEdit(1) || !this.auth.permissionEdit(2) || !this.auth.permissionEdit(3)) }, [Validators.required]),
      id_turno: new FormControl({ value: this.paramsBusqueda.id_turno, disabled: false }, [Validators.required])
    });

  }

  /*
 * Carga plugins despues de cargar y mostrar objetos en el DOM
 */
  ngAfterViewHttp(): void {

    $('.tooltipped').tooltip({ delay: 50 });

    $('#modalEdicion').modal({
      opacity: 0.6,
      inDuration: 500,
      complete : ()=>{
         this.fallaSeleccionada = 0;
         this.pintaForm = false;
      }
    });

    this.height = $( document  ).height();

  }

  agregar() {
    $('.tooltipped').tooltip('hide');
  }

  regresar() {
    $('.tooltipped').tooltip('hide');
  }

  changeCombo(accion:string):void{
    if(accion == 'anio'){
      this.meses = this.periodos.filter(el => el.anio == this.paramsBusqueda.anio);
    }
    this.estatusPeriodo = true;
    this.bVistaPre = false;
    this.status = 'inactive';
  }

  busqueda(parametrosBusqueda: any) {
    this.status = 'inactive';
    this.bVistaPre = false;
    this.submitted = true;
    this.estatusPeriodo = true;
    $(document).height(this.height+'px');


    if (this.formBusqueda.valid) {
      this.service.getAllFallasByDays(this.auth.getIdUsuario(), parametrosBusqueda).subscribe(result => {

        if (result.response.sucessfull) {
          this.fallas = result.data.listFallas || [];
          this.estatusPeriodo = result.data.estatusPeriodo;
          this.bVistaPre = true;

          setTimeout(() => { 
            this.status = 'active';
            if(this.fallas.length > 0){
              DataTableFallas('#tabla');
            }
          }, 400)

        } else {
          this.status = 'inactive';
          this.bVistaPre = false;
          Materialize.toast(result.response.message, 4000, 'red');
        }
      }, error => {
        this.status = 'inactive';
        this.bVistaPre = false;
        Materialize.toast('Ocurrió un error en el servicio!', 4000, 'red');
      });
    } else {
      this.status = 'inactive';
      Materialize.toast('Ingrese todos los datos para mostrar fallas!', 4000, 'red');
    }
  }

  openModalConfirmacion(falla: Falla, accion: string, event?: any): void {
    this.mensajeModal = '';

    switch (accion) {
      case 'activar':
        break;
      case 'eliminar':
        this.mensajeModal = '¿Está seguro de eliminar falla? ';
        break;
    }


    /* 
     * Configuración del modal de confirmación
     */
    Swal.fire({
      title: '<span style="color: #303f9f ">' + this.mensajeModal + '</span>',
      icon: 'question',
      html: '<p style="color: #303f9f "><b> Día: </b>' + falla.dia + '<b> Tiempo total de paro: </b>' + falla.tiempo_paro + ' Hrs</p>',
      showCancelButton: true,
      confirmButtonColor: '#303f9f',
      cancelButtonColor: '#9fa8da ',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
       * Si acepta
       */
      if (result.value) {
        switch (accion) {
          case 'activar':
            break;
          case 'eliminar':
            this.service.delete(this.auth.getIdUsuario(), falla.id_falla).subscribe(result => {
              if (result.response.sucessfull) {
                deleteItemArray(this.fallas,  falla.id_falla, 'id_falla');
                if(this.fallas.length > 0){
                  $('#tabla').DataTable().row('.'+falla.id_falla).remove().draw( false );
                }else if(this.fallas.length == 0){
                  $('#tabla').DataTable().destroy();
                }
                Materialize.toast('Se eliminó correctamente ', 4000, 'green');
              } else {
                Materialize.toast(result.response.message, 4000, 'red');
              }
            }, error => {
              Materialize.toast('Ocurrió  un error en el servicio!', 4000, 'red');
            });
            break;
        }
        /*
        * Si cancela accion
        */
      } else if (result.dismiss === Swal.DismissReason.cancel) {
       
      }
    })

  }

  openModalEdicion(id:number){
    this.pintaForm = true;
    this.fallaSeleccionada = id;
    $('#modalEdicion').modal('open');
  }

  modoEdicion(){
    this.noVerBtnFallas = true;
  }

  modoInicial(){
  
    this.noVerBtnFallas = false;
    this.bVistaPre = false;

  }

  refreshDataTable(event):void{
    let tmpFalla = event.falla;

    this.fallas.filter(el=>{
      if(el.id_falla == tmpFalla.id_falla){
        el.valor_fuente = tmpFalla.valor_fuente;
        el.valor_razon = tmpFalla.valor_razon;
        el.valor_equipo = tmpFalla.valor_equipo; 
        el.descripcion_equipo = tmpFalla.descripcion_equipo; 
        el.hora_inicio = tmpFalla.hora_inicio; 
        el.hora_final = tmpFalla.hora_final;
        el.tiempo_paro = tmpFalla.tiempo_paro;
        el.descripcion = tmpFalla.descripcion;
      
        let tabla =  $('#tabla').DataTable();
        tabla.cell('.'+tmpFalla.id_falla,4).data(tmpFalla.valor_fuente);
        tabla.cell('.'+tmpFalla.id_falla,5).data(tmpFalla.valor_razon);
        tabla.cell('.'+tmpFalla.id_falla,6).data(tmpFalla.valor_equipo);
        tabla.cell('.'+tmpFalla.id_falla,7).data(tmpFalla.descripcion_equipo);
        tabla.cell('.'+tmpFalla.id_falla,9).data(tmpFalla.hora_inicio);
        tabla.cell('.'+tmpFalla.id_falla,10).data(tmpFalla.hora_final);
        tabla.cell('.'+tmpFalla.id_falla,11).data(tmpFalla.tiempo_paro);
        tabla.cell('.'+tmpFalla.id_falla,8).data(tmpFalla.descripcion);
      }
    });
  
  }


}
