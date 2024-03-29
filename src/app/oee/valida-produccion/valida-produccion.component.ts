import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto';
import { Linea } from '../../models/linea';
import { Catalogo } from '../../models/catalogo';
import { ValidaProduccionService } from './valida-produccion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Falla } from '../../models/falla';
import Swal from 'sweetalert2';

declare var $: any;
declare var Materialize: any;

@Component({
  selector: 'app-valida-produccion',
  templateUrl: './valida-produccion.component.html',
  styleUrls: ['./valida-produccion.component.css'],
  providers: [ValidaProduccionService]
})
export class ValidaProduccionComponent implements OnInit {

  public loading: boolean;
  public mostrarBtnValidar:boolean;
  public productos: Array<Producto>;
  public lineas: Array<Linea>;
  public fallas: Array<Falla>;
  public grupos: Array<Catalogo>;
  public turnos: Array<Catalogo>;
  public formulario: FormGroup;
  public height:number;
  public rutaPagina:string;
  public estatusPeriodo:boolean;
  public meta: any = {
    id_meta: 0,
    id_linea: 0,
    id_turno: 0,
    id_grupo: 0,
    diaString: ''
  }

  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: ValidaProduccionService
  ) { }

  ngOnInit() {
   
    this.loading = true;
    this.mostrarBtnValidar = true;
    this.productos = [];
    this.lineas = [];
    this.grupos = [];
    this.turnos = [];
    let tmp = this.router.url.split('/');
    this.rutaPagina = tmp[tmp.length - 2 ]

    this.route.paramMap.subscribe(params => {

      let id_meta = parseInt(params.get('id'));

      this.service.init(this.auth.getIdUsuario(), id_meta).subscribe(result => {

        if (result.response.sucessfull) {
          this.estatusPeriodo = result.data.estatusPeriodo;
          this.grupos = result.data.listGrupos || [];
          this.lineas = result.data.listLineas || [];
          this.turnos = result.data.listTurnos || [];
          this.productos = result.data.listProduccion || [];
          this.fallas = result.data.listFallas || [];
          this.meta.id_meta = result.data.meta.id_meta;
          this.meta.diaString = result.data.meta.dia;
          this.meta.id_linea = result.data.meta.id_linea;
          this.meta.id_turno = result.data.meta.id_turno;
          this.meta.id_grupo = result.data.meta.id_grupo;
          this.loading = false;
          this.loadFormulario();
          setTimeout(() => this.ngAfterViewInit(), 20);
        } else {
          this.loading = false;

          Materialize.toast(result.response.message, 4000, 'red');
        }
      }, error => {
        this.loading = false;
        Materialize.toast('Ocurrió un error en el servicio!', 4000, 'red');
      });
    });

  }

  loadFormulario(): void {
    this.formulario = this.fb.group({
      diaString: new FormControl({ value: this.meta.diaString, disabled: true }, [Validators.required]),
      id_linea: new FormControl({ value: this.meta.id_linea, disabled: true }, [Validators.required]),
      id_grupo: new FormControl({ value: this.meta.id_grupo, disabled: true }, [Validators.required]),
      id_turno: new FormControl({ value: this.meta.id_turno, disabled: true }, [Validators.required])
    });
  }

  /* 
* Carga de plugins para el componente
*/
  ngAfterViewInit(): void {
    $('.tooltipped').tooltip({ delay: 50 });
  
  }

  regresar() {
    $('.tooltipped').tooltip('hide');

  }

  validar(opcion:string): void{
    let titulo =  '';
    let status = -1;
    let mensaje= '';
    let html = '';

    if(opcion == 'quitar'){
      status = 0;
      titulo = '¿ Está seguro de quitar la validación de esta producción ?';
                html = 'La producción se verá nuevamente en la sección "Producción pendientes por validar" para su posterior modificación';
      mensaje = ' Quito la validación exitosamente';
    }else if(opcion == 'liberar'){
      status = 1;
      titulo = '¿ Está seguro de validar la producción ? ';
      mensaje = 'Validación exitosa!'
    }
   
    Swal.fire({
      title: '<span style="color: #303f9f ">'+ titulo +'</span>',
      icon: 'question',
      html: '<p style="color: #303f9f ">'+ html +'</b></p>',
      showCancelButton: true,
      confirmButtonColor: '#303f9f',
      cancelButtonColor: '#9fa8da ',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
       * Si acepta
       */
      if (result.value) {

        this.service.liberarDatos(this.auth.getIdUsuario(), this.meta.id_meta, status).subscribe(result => {

          if (result.response.sucessfull) {
            this.mostrarBtnValidar = false;
            Materialize.toast(mensaje, 4000, 'green');

          } else {
            Materialize.toast(result.response.message, 4000, 'red');
          }
        }, eror => {
          Materialize.toast('Ocurrió un error en el servicio!', 4000, 'red');
        });

        /*
        * Si cancela accion
        */
      } else if (result.dismiss === Swal.DismissReason.cancel) {

      }
    })

  }

}
