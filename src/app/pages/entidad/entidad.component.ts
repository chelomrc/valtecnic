import { Component, OnInit } from '@angular/core';
import { OficialesService } from 'src/app/services/oficiales.service';
import { ActivatedRoute } from '@angular/router';
import { EntidadModel } from '../../models/entidad.model';
import { NgForm } from '@angular/forms';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {

  entidad = new EntidadModel();

  constructor(private oficialService: OficialesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      this.oficialService.getEntidad( id )
          .subscribe( (resp: EntidadModel) => {
            this.entidad = resp;
            this.entidad.id = id;
            console.log(resp);
          });
    } else {

      console.log(id);
    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    let peticion: Observable<any>;
    if (this.entidad.id) {
      peticion = this.oficialService.actualizarEntidad( this.entidad );
    } else {
      peticion = this.oficialService.crearEntidad( this.entidad );
    }
    peticion.subscribe( resp => {
      console.log(resp);
      Swal.fire({
        title: this.entidad.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
    });
    console.log(this.entidad);
  }
}
