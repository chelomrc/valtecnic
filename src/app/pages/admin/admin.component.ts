import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { OficialesService } from 'src/app/services/oficiales.service';


import Swal from 'sweetalert2';
import { OficialModel } from 'src/app/models/oficial.model';
import { AdminModel } from '../../models/admin.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  admins: AdminModel[] = [];


  admin = new AdminModel();

  usuario: string;
  password: string;

  cargando = false;

  userToken: string;

  constructor( private oficialesService: OficialesService,
               private router: Router) { }

  ngOnInit() {
    if ( this.oficialesService.adminLogueado) {
      this.router.navigateByUrl('/panel');
    }
  }

  login() {

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...'
    });
    Swal.showLoading();

    if (this.validarLogin()) {

      this.cargando = true;
      this.oficialesService.getAdmins()
          .subscribe( resp => {
              // console.log(resp);
              Swal.close();
              this.admins = resp;
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

    for ( const admin of this.admins) {
      if ( this.usuario === admin.usuario && this.password === admin.password ) {

         this.guardarToken();
         this.guardarID(admin.id);
        //  console.log('login correcto');
         this.router.navigate(['/panel']);
         return;

      } else {

        Swal.fire({
          title: 'Error de Acceso',
          text: 'Usuario y/o Contraseña Incorrecto',
          type: 'error'
        });

        this.password = null;
      }
    }
  }

  private guardarToken() {

    const hoy = new Date();
    hoy.setSeconds( 3600 );
    sessionStorage.setItem('expira', hoy.getTime().toString() );
    return;
  }

  guardarID(id: string) {
    sessionStorage.setItem('id', id );
    sessionStorage.setItem('admin', id );
    this.oficialesService.oficialActual = id;
  }

    // Verificar si presionó enter
  enter( e: any ) {
    if ( e.key === 'Enter' ) { this.login(); }
    // console.log(e);
  }

}
