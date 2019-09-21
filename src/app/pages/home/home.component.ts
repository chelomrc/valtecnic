import { Component, OnInit } from '@angular/core';
import { OficialModel } from 'src/app/models/oficial.model';
import { OficialesService } from 'src/app/services/oficiales.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  oficiales: OficialModel[] = [];

  usuario: string;
  password: string;

  cargando = false;

  userToken: string;


  constructor( private oficialesService: OficialesService,
               private router: Router ) { }

  ngOnInit() {


  }

  ingresar() {

    (async () => {

      const { value: password } = await Swal.fire( {
        title: 'Enter your password',
        input: 'password',
        inputPlaceholder: 'Enter your password',
        inputAttributes: {
          maxlength: '10',
          autocapitalize: 'off',
          autocorrect: 'off'
        }
      });

      if (password) {
        Swal.fire('Entered password: ' + password);
      }

      })();
  }

  login( ) {

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    if (this.validarLogin()) {

      this.cargando = true;
      this.oficialesService.getOficiales()
          .subscribe( resp => {
            // console.log(resp);
            Swal.close();
            this.oficiales = resp;
            this.cargando = false;
            this.verificarUsuario();
          });
    }

  }


  validarLogin(): boolean {

    if ( this.usuario && this.password) {
      return true;
    } else {

      Swal.fire({
        title: 'Error',
        text: 'Debe ingresar Usuario y Contraseña',
        type: 'error'
      });
      return false;
    }


  }
  verificarUsuario() {

    let encontrado = false;
    let oficialID = null;
    for ( const oficial of this.oficiales) {

      if ( !encontrado ) {

          if ( this.usuario === oficial.usuario && this.password === oficial.contrasena ) {

            this.guardarToken();
            this.guardarID(oficial.id);
            oficialID = oficial.id;
            encontrado = true;
          }
        }
      }

    // console.log(encontrado);
    // console.log(oficialID);
    if ( encontrado ) {
      $('#loginModal').modal('hide');
      this.router.navigate(['/registrar', oficialID]);
    } else {
      Swal.fire({
          title: 'Error de Acceso',
          text: 'Usuario y/o Contraseña Incorrecto',
          type: 'error'
        });

      }


  }

  private guardarToken() {

    const hoy = new Date();
    hoy.setSeconds( 3600 );
    // localStorage.setItem('expira', hoy.getTime().toString() );
    sessionStorage.setItem('expira', hoy.getTime().toString() );
    return;
  }

  guardarID(id: string) {

    sessionStorage.setItem('id', id );
    this.oficialesService.oficialActual = id;


  }

  // Verificar si presionó enter
  enter( e: any ) {
    if ( e.key === 'Enter' ) { this.login(); }
    // console.log(e);
  }

}
