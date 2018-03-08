import { Component, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';

declare var $:any;

@Component({
  selector: 'app-list-sonarh-users',
  templateUrl: './list-sonarh-users.component.html',
  styles: []
})

export class ListSonarhUsersComponent  implements  AfterViewInit  {

  public usuarios_sonarh: Array<User> = [
   
  ]


  constructor() { }

  ngAfterViewInit() {

    $('#tabla_usuarios_sonarh').DataTable({
      "dom": '<lf<t>ip>',
      "responsive": true,
      "scrollX": true,
      "bSort" : false,
      "bPaginate": true,
      "bLengthChange": true,
      "lengthChange": true,
      "aLengthMenu": [[10, 25, 50, 75, -1], [10, 25, 50, 75, "Todos"]],
      "iDisplayLength": 10,
      "language": {
        "zeroRecords": "No se encontrarón coincidencias",
        "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 a 0 de 0 registros",
        "infoFiltered": "(filtrado de _MAX_ total registros)",
        "lengthMenu": "Mostrar _MENU_ regitros",
        "search": "Buscar:",
        "paginate": {
          "first": "Inicio",
          "last": "Fin",
          "next": "Sig.",
          "previous": "Anterior"
        }
      }

    });

    $('select').val('10'); //seleccionar valor por defecto del select
    $('select').addClass("browser-default"); //agregar una clase de materializecss de esta forma ya no se pierde el select de numero de registros.
    $('select').material_select();

    $('.tooltipped').tooltip({delay: 50});
  }

  ocultarTooltip(){
    $('.tooltipped').tooltip('hide');
  }

}
