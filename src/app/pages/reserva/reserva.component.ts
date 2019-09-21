import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OficialModel } from 'src/app/models/oficial.model';
import { OficialesService } from '../../services/oficiales.service';
import { DatePipe } from '@angular/common';
import { ReservaModel } from '../../models/reserva.model';


import Swal from 'sweetalert2';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  oficial = new OficialModel();
  reserva = new ReservaModel();
  fecha1: any;
  hora: any;
  fecha: any;
  tipo: any;

  fechaHoy = new Date();

  lat = -17.382816;
  lng = -66.160055;


  constructor( private oficialService: OficialesService,
               private route: ActivatedRoute,
              //  private router: Router,
               private datePipe: DatePipe

                ) { }

    ngOnInit() {
    this.reserva.estado = false;
    this.reserva.cantidadAvaluos = '1';

    this.fecha = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss' );

    this.reserva.reservaDia =  new Date().getDate();
    this.reserva.reservaMes =  (new Date().getMonth());
    this.reserva.reservaYear =  new Date().getFullYear();



    const id = this.route.snapshot.paramMap.get('id');

    this.oficialService.getOficial( id )
    .subscribe( (resp: OficialModel) => {
      this.oficial = resp;
      this.oficial.id = id;
      console.log(resp);
      // this.nombreCompleto = this.oficial.nombre + ' ' + this.oficial.apellido;
      // console.log(this.nombreCompleto);
      // this.cargando = false;
    });

    this.reserva.oficial = this.oficial.usuario;
    this.reserva.banco = this.oficial.banco;

  }

  guardar( form) {

    console.log(form);
    // controlamos que se introduzca el mapa y el formulario sea valido
    if ( form.invalid || this.reserva.latitud == null  ) {
      console.log('Formulario no válido');
      Swal.fire({
        title: 'Error al Enviar',
        text: 'Debe llenar todos los campos del formulario',
        type: 'error',
        allowOutsideClick: true
      });

      return;
    }
    this.reserva.oficialID = this.oficial.id;
    this.fecha1 = this.datePipe.transform(this.reserva.fechaCliente, 'dd/MM/yyyy' );
    this.reserva.fechaCliente = this.fecha1;
    this.reserva.fechaReserva = this.fecha;
    this.reserva.banco = this.oficial.banco;
    this.reserva.oficial = this.oficial.usuario;


    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    peticion = this.oficialService.crearReserva( this.reserva );

    peticion.subscribe( resp => {

      Swal.fire({
        title: 'Reserva Agregada',
        text: 'Se registró correctamente',
        type: 'success'
      });

    });

    // console.log(this.fecha1);
    // console.log(this.reserva);
    // this.router.navigate(['/registrar', this.oficial.id]);

  }

  agregarMarcador( evento ) {
    this.reserva.latitud = evento.coords.lat;
    this.reserva.longitud = evento.coords.lng;

    console.log(this.reserva.latitud);
    console.log(this.reserva.longitud);

  }

}
