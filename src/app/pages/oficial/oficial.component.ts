
import { Component, OnInit } from '@angular/core';
import { OficialModel } from '../../models/oficial.model';
import { NgForm} from '@angular/forms';
import { OficialesService } from '../../services/oficiales.service';

import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';
import { csLocale } from 'ngx-bootstrap/chronos/i18n/cs';
import { EntidadModel } from 'src/app/models/entidad.model';

@Component({
  selector: 'app-oficial',
  templateUrl: './oficial.component.html',
  styleUrls: ['./oficial.component.css']
})
export class OficialComponent implements OnInit {

  entidades: EntidadModel [] = [];
  oficial = new OficialModel();
  fechaHoy =  new Date();

  constructor( private oficialService: OficialesService,
               private route: ActivatedRoute) { }

  ngOnInit( ) {

    this.oficialService.getEntidades()
    .subscribe( resp => {
      console.log(resp);
      this.entidades = resp;
      // this.cargando = false;
    });

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {
      this.oficialService.getOficial( id )
          .subscribe( (resp: OficialModel) => {
            this.oficial = resp;
            this.oficial.id = id;
            console.log(resp);
          });
    } else {
      const hoy = this.fechaHoy.getDate() + ' / ' + (this.fechaHoy.getMonth() + 1 )
                    + ' / ' + this.fechaHoy.getFullYear();
      this.oficial.fechaRegistro = hoy;
      // this.oficial.fechaRegistro = ;
      // console.log(this.oficial.fechaRegistro);
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

    if (this.oficial.id) {

      peticion = this.oficialService.actualizarOficial( this.oficial );
    } else {
      peticion = this.oficialService.crearOficial( this.oficial );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.oficial.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });
  }

}
