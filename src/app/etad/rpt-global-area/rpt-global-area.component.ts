import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Catalogo } from '../../models/Catalogo';
import { AuthService } from '../../auth/auth.service';
import { Periodo } from '../../models/periodo';
import { getTablaUtf8 } from '../../utils';
import { RptGlobalAreaService } from './rpt-global-area.service';


declare var $: any;
declare var Materialize: any;
@Component({
  selector: 'app-rpt-global-area',
  templateUrl: './rpt-global-area.component.html',
  styleUrls: ['./rpt-global-area.component.css'],
  providers: [RptGlobalAreaService]
})
export class RptGlobalAreaComponent implements OnInit {

  public loading: boolean;
  public submitted: boolean;
  public viewReport: boolean;
  public formConsultaPeriodo: FormGroup;
  public paramsBusqueda: any;
  public etads: Array<Catalogo>;
  public tituloGrafica: string;
  public anios: Array<any>;
  public meses: Array<any>;
  public periodos: Array<Periodo>;
  public registros:Array<any>;
  public total_bono:any;


  constructor(
    private service: RptGlobalAreaService,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.loading = true;
    this.submitted = false;
    this.viewReport = false;
    this.registros = [];
    this.tituloGrafica = "";
    this.paramsBusqueda = {};

    this.anios = [];
    this.meses = [];
    this.periodos = [];

    this.service.getCatalogos(this.auth.getIdUsuario()).subscribe(result => {

      if (result.response.sucessfull) {
        this.etads = result.data.listEtads || [];
        this.periodos = result.data.listPeriodos || [];
        let tmpAnios = this.periodos.map(el => el.anio);
        this.periodos.filter((el, index) => {
          if (tmpAnios.indexOf(el.anio) === index) {
            this.anios.push({ valor: el.anio });
          }
        });

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
    this.formConsultaPeriodo = this.fb.group({
      idEtad: new FormControl({ value: this.paramsBusqueda.idEtad }, [Validators.required]),
      anio: new FormControl({ value: this.paramsBusqueda.anio }, [Validators.required]),
      idPeriodo: new FormControl({ value: this.paramsBusqueda.idPeriodo }, [Validators.required])
    });

  }

  /*
   * Carga plugins despues de cargar y mostrar objetos en el DOM cuando carga la pagina
   */
  ngAfterViewHttp(): void {
    $('.tooltipped').tooltip({ delay: 50 });
    $('select').material_select();
  }


  agregar() {
    $('.tooltipped').tooltip('hide');
  }

  regresar() {
    $('.tooltipped').tooltip('hide');
  }

  changeCombo(params: string): void {
    this.viewReport = false;
    if (params == 'anio') {
      this.meses = this.periodos.filter(el => el.anio == this.paramsBusqueda.anio)
    }
  }

  busqueda(parametrosBusqueda: any) {

    this.viewReport = false;
    this.submitted = true;
    this.registros = [];
    this.total_bono = {};

    if (this.formConsultaPeriodo.valid) {

      this.service.getIndicadorClaveDesempenoGlobal(this.auth.getIdUsuario(), parametrosBusqueda).subscribe(result => {
     
        if (result.response.sucessfull) {
          this.registros = result.data.indicadorDesempeno || [];
          this.total_bono = this.registros.filter(el=>el.total == 1)[0];
          this.registros = this.registros.filter(el=>el.total==0);
          this.viewReport = true;

         

        } else {

          this.viewReport = false;
          Materialize.toast(result.response.message, 4000, 'red');
        }
      }, error => {

        this.viewReport = false;
        Materialize.toast('Ocurrió un error en el servicio!', 4000, 'red');
      });
    } else {
      this.viewReport = false;
      Materialize.toast('Ingrese todos los datos para mostrar reporte!', 4000, 'red');
    }
  }

  getTextoLinea(lineas: Array<Catalogo>, id_etad: number): string {
    let el = lineas.filter(el => el.id == id_etad);

    if (el.length > 0) {
      return el[0].valor;
    } else {
      return "Linea no identificada"
    }
  }


  exportarExcel(): void {

    let linkFile = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel;';

    if (linkFile.download != undefined) {
      document.body.appendChild(linkFile);
      let tabla = getTablaUtf8('tblReporte');

      linkFile.href = data_type + ', ' + tabla;
      linkFile.download = 'ReporteGlobalArea';

      linkFile.click();
      linkFile.remove();
    } else {

      let elem = $("#tblReporte")[0].outerHTML;
      let blobObject = new Blob(["\ufeff", elem], { type: 'application/vnd.ms-excel' });
      window.navigator.msSaveBlob(blobObject, 'ReporteGlobalArea.xls');
    }


  }

  getPeriodo(periodos: Array<Periodo>, id_periodo: number): string {
    let el = periodos.filter(el => el.id_periodo == id_periodo);

    if (el.length > 0) {
      return "  " + el[0].descripcion_mes + " " + el[0].anio;
    } else {
      return "Linea no identificada"
    }
  }


}
