import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OficialModel } from 'src/app/models/oficial.model';
import { OficialesService } from '../../services/oficiales.service';

import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  oficial = new OficialModel();
  nombreCompleto: string;
  cargando = false;

  constructor( private oficialService: OficialesService,
               private route: ActivatedRoute,
               private router: Router ) { }

  ngOnInit() {
    this.cargando = true;
    const id = this.route.snapshot.paramMap.get('id');

    this.oficialService.getOficial( id )
    .subscribe( (resp: OficialModel) => {
      this.oficial = resp;
      this.oficial.id = id;
      // console.log(resp);
      this.nombreCompleto = this.oficial.nombre + ' ' + this.oficial.apellido;
      // console.log(this.nombreCompleto);
      this.cargando = false;
    });
  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      // console.log('Formulario no válido');
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

    peticion = this.oficialService.actualizarOficial( this.oficial );

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.oficial.nombre,
        text: 'Se actualizó correctamente',
        type: 'success'
      });
      this.router.navigate(['/registrar', this.oficial.id]);
    });


  }


}
