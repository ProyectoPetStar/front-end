import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { NgPipesModule } from 'ngx-pipes';
import { AuthGuardEtad } from '../auth/auth.guard.etad';
import { OptionsComponent } from './options/options.component';
import { MetaMasivaComponent } from './meta-masiva/meta-masiva.component';
import { ListaMetasComponent } from './lista-metas/lista-metas.component';
import { PipesCustomModule } from '../pipes/pipes.custom.module';
import { MetaManualComponent } from './meta-manual/meta-manual.component';
import { ListCatalogsComponent } from './list-catalogs/list-catalogs.component';
import { ListByCatalogComponent } from './list-by-catalog/list-by-catalog.component';
import { FormularioDetalleComponent } from './list-by-catalog/formulario-detalle/formulario-detalle.component';
import { PonderacionManualComponent } from './ponderacion-manual/ponderacion-manual.component';
import { PonderacionMasivaComponent } from './ponderacion-masiva/ponderacion-masiva.component';
import { ListaPonderacionComponent } from './lista-ponderacion/lista-ponderacion.component';
import { SubMenuPonderacionesComponent } from './sub-menu-ponderaciones/sub-menu-ponderaciones.component';
import { SubMenuIndicadoresComponent } from './sub-menu-indicadores/sub-menu-indicadores.component';
import { FormularioIndicadorDayComponent } from './formulario-indicador-day/formulario-indicador-day.component';
import { ListaIndicadorDayComponent } from './lista-indicador-day/lista-indicador-day.component';
import { FormularioIndicadorMothComponent } from './formulario-indicador-moth/formulario-indicador-moth.component';
import { ListaIndicadorMothComponent } from './lista-indicador-moth/lista-indicador-moth.component';
import { ListaReportesComponent } from './lista-reportes/lista-reportes.component';
import { RptGlobalAreaComponent } from './rpt-global-area/rpt-global-area.component';
import { RptIndicadoresPkiComponent } from './rpt-indicadores-pki/rpt-indicadores-pki.component';
import { RptGraficasKpiComponent } from './rpt-graficas-kpi/rpt-graficas-kpi.component';
import { RptEnlaceObjKpiComponent } from './rpt-enlace-obj-kpi/rpt-enlace-obj-kpi.component';
import { ListaConfiguracionReporteComponent } from './lista-configuracion-reporte/lista-configuracion-reporte.component';
import { ConfRptEnlaceObjKpiComponent } from './conf-rpt-enlace-obj-kpi/conf-rpt-enlace-obj-kpi.component';
import { RptBonosComponent } from './rpt-bonos/rpt-bonos.component';
import { RptDetalleBonosComponent } from './rpt-detalle-bonos/rpt-detalle-bonos.component';
import { RptPosicionTrimestralComponent } from './rpt-posicion-trimestral/rpt-posicion-trimestral.component';
import { RptPosicionAnualComponent } from './rpt-posicion-anual/rpt-posicion-anual.component';
import { ListaValidacionComponent } from './lista-validacion/lista-validacion.component';
import { SharedModule } from '../@shared/@shared.module';



const routes: Routes = [
  { path: 'opciones', component: OptionsComponent },
  /* rutas de metas */
  {
    path: 'opciones/metas-carga-masiva', component: MetaMasivaComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 28
    }
  },
  {
    path: 'opciones/lista-metas', component: ListaMetasComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 33
    }
  },
  {
    path: 'opciones/metas-carga-manual/:id', component: MetaManualComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 31
    }
  },
  /* rutas de catalogos */
  {
    path: 'opciones/catalogos', component: ListCatalogsComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 53
    }
  },
  {
    path: 'opciones/catalogos/:name', component: ListByCatalogComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 53
    }
  },
  {
    path: 'opciones/catalogos/:name/formulario/:id', component: FormularioDetalleComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 53
    }
  },
  /* rutas de ponderaciones */
  {
    path: 'opciones/:seccion/sub-menu', component: SubMenuPonderacionesComponent,
    // , canActivate: [AuthGuardEtad],
    // data: {
    //   expectedRole: 
    // }
  },
  {
    path: 'opciones/:seccion/sub-menu/:tipo/:id', component: PonderacionManualComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 37
    }
  },
  {
    path: 'opciones/:seccion/sub-menu/:tipo', component: ListaPonderacionComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 39
    }
  },
  {
    path: 'opciones/ponderacion-carga-masiva', component: PonderacionMasivaComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 36
    }
  },
  /* rutas registro de indicadores */
  {
    path: 'opciones/:seccion/sub-menu-indicadores', component: SubMenuIndicadoresComponent,
    // , canActivate: [AuthGuardEtad],
    // data: {
    //   expectedRole: 
    // }
  },
  {
    path: 'opciones/:seccion/sub-menu-indicadores/diarios', component: ListaIndicadorDayComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 43
    }
  }, {
    path: 'opciones/:seccion/sub-menu-indicadores/nuevo', component: FormularioIndicadorDayComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 41
    }
  },
  {
    path: 'opciones/:seccion/sub-menu-indicadores/mensuales', component: ListaIndicadorMothComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 47
    }
  }, {
    path: 'opciones/:seccion/sub-menu-indicadores/registro-mensual', component: FormularioIndicadorMothComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 45
    }
  },
  /* ruta validaciones */
  {
    path: 'opciones/validaciones', component: ListaValidacionComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 52
    }
  },
  /* rutas de reportes */
  { path: 'opciones/lista-reportes', component: ListaReportesComponent },
  { path: 'opciones/lista-reportes/reporte-global-area', component: RptGlobalAreaComponent },
  { path: 'opciones/lista-reportes/reporte-indicadores-kpi', component: RptIndicadoresPkiComponent },
  { path: 'opciones/lista-reportes/reporte-indicadores-graficas', component: RptGraficasKpiComponent },
  { path: 'opciones/lista-reportes/reporte-enlace-obj-kpi', component: RptEnlaceObjKpiComponent },
  { path: 'opciones/lista-reportes/reporte-bonos', component: RptBonosComponent },
  { path: 'opciones/lista-reportes/reporte-detalle-bonos', component: RptDetalleBonosComponent },
  { path: 'opciones/lista-reportes/reporte-posicion-trimestral', component: RptPosicionTrimestralComponent },
  { path: 'opciones/lista-reportes/reporte-posicion-anual', component: RptPosicionAnualComponent },

  /* rutas configuracion reportes */
  {
    path: 'opciones/configuraciones-reportes', component: ListaConfiguracionReporteComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 50
    }
  },
  {
    path: 'opciones/configuraciones-reportes/conf-rpt-obj-kpi', component: ConfRptEnlaceObjKpiComponent, canActivate: [AuthGuardEtad],
    data: {
      expectedRole: 50
    }
  },

];

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
    ReactiveFormsModule,
    FormsModule,
    NgPipesModule,
    PipesCustomModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    OptionsComponent,
    MetaMasivaComponent,
    ListaMetasComponent,
    MetaManualComponent,
    ListCatalogsComponent,
    ListByCatalogComponent,
    FormularioDetalleComponent,
    PonderacionManualComponent,
    PonderacionMasivaComponent,
    ListaPonderacionComponent,
    SubMenuPonderacionesComponent,
    SubMenuIndicadoresComponent,
    FormularioIndicadorDayComponent,
    ListaIndicadorDayComponent,
    FormularioIndicadorMothComponent,
    ListaIndicadorMothComponent,
    ListaReportesComponent,
    RptGlobalAreaComponent,
    RptIndicadoresPkiComponent,
    RptGraficasKpiComponent,
    RptEnlaceObjKpiComponent,
    ListaConfiguracionReporteComponent,
    ConfRptEnlaceObjKpiComponent,
    RptBonosComponent,
    RptDetalleBonosComponent,
    RptPosicionTrimestralComponent,
    RptPosicionAnualComponent,
    ListaValidacionComponent
  ],
  providers: [
    AuthGuardEtad
  ]
})
export class EtadModule { }
