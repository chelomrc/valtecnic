import { Component, OnInit } from '@angular/core';
import { OficialesService } from '../../services/oficiales.service';
import { OficialModel } from '../../models/oficial.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-oficiales',
  templateUrl: './oficiales.component.html',
  styleUrls: ['./oficiales.component.css']
})
export class OficialesComponent implements OnInit {

  oficiales: OficialModel[] = [];
  cargando = false;


  constructor( private oficialesService: OficialesService ) { }

  ngOnInit() {

    this.cargando = true;
    this.oficialesService.getOficiales()
        .subscribe( resp => {
          console.log(resp);
          this.oficiales = resp;
          this.cargando = false;
        });

        console.log(this.oficiales);

  }

  borrarOficial( oficial: OficialModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${oficial.nombre}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {

      if ( resp.value ) {

      this.oficiales.splice(i, 1 );
      this.oficialesService.borrarOficial( oficial.id ).subscribe();

      }
    } );

  }

}
