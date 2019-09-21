import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OficialModel } from '../models/oficial.model';
import { map, delay } from 'rxjs/operators';
import { ReservaModel } from '../models/reserva.model';
import { AdminModel } from '../models/admin.model';
import { EntidadModel } from '../models/entidad.model';


@Injectable({
  providedIn: 'root'
})
export class OficialesService {

  private url = 'https://valtecnic-app.firebaseio.com/';

  logueado = false;
  adminLogueado = false;
  oficialActual = null;

  constructor( private http: HttpClient) { }

  crearOficial( oficial: OficialModel ) {
    return this.http.post(`${ this.url }/oficiales.json`, oficial)
            .pipe(
              map( (resp: any) => {
                oficial.id = resp.name;
                return oficial;
              })
            );
  }

  crearReserva( reserva: ReservaModel) {

    return this.http.post(`${ this.url }/${ reserva.reservaYear }/${reserva.reservaMes}.json`, reserva);

  }

  actualizarOficial( oficial: OficialModel) {

    const oficialTemp = {
      ...oficial
    };
    delete oficialTemp.id;

    return this.http.put(`${ this.url }/oficiales/${ oficial.id }.json`, oficialTemp);

  }

  borrarOficial( id: string ) {
    return this.http.delete(`${ this.url }/oficiales/${ id }.json`);
  }

  getOficial( id: string ) {

    return this.http.get(`${ this.url }/oficiales/${ id }.json`);
  }

  getOficiales() {
    return this.http.get(`${ this.url }/oficiales.json`)
              .pipe( map ( resp => this.crearArreglo(resp) ) );
  }


  private crearArreglo( oficialesObj: object) {

    const oficiales: OficialModel[] = [];
    //  console.log(oficialesObj);
    if ( oficialesObj === null) { return []; }
    Object.keys( oficialesObj ).forEach( key => {

      const oficial: OficialModel = oficialesObj[key];
      oficial.id = key;
      oficiales.push( oficial );
    } );
    return oficiales;
  }

  getReservas() {
    return this.http.get(`${ this.url }/2019.json`)
              .pipe( map ( resp => this.crearArregloReservas(resp) ) );
  }

  private crearArregloReservas( reservasObj: object) {

    const reservas: ReservaModel[] = [];
    // console.log(reservasObj);
    if ( reservasObj === null) { return []; }
    Object.keys( reservasObj ).forEach( key => {

      const reserva: ReservaModel = reservasObj[key];
      // reserva.id = key;

      reservas.push( reserva );

    } );

    // console.log(reservas);
    return reservas;
  }

  public crearArregloReservasMes( reservasObj: object) {

    const reservas: ReservaModel[] = [];
    // console.log(reservasObj);
    if ( reservasObj === null) { return []; }
    Object.keys( reservasObj ).forEach( key => {

      const reserva: ReservaModel = reservasObj[key];
      reserva.id = key;

      reservas.push( reserva );

    } );

    // console.log(reservas);
    return reservas;
  }

  getReserva( gestion: string, mes: string, id: string ) {

    return this.http.get(`${ this.url }/${ gestion }/${ mes }/${ id }.json`);

  }

  actualizarReserva( reserva: ReservaModel ) {

    // const reservaTemp = {
    //   ...reserva
    // };
    // delete reservaTemp.id;

    return this.http.put(`${ this.url }/${ reserva.reservaYear }/${ reserva.reservaMes }/${ reserva.id }/estado.json`, reserva.estado);

  }

  public crearArregloReservasMesOficial( reservasObj: object, id: string) {

    const reservas: ReservaModel[] = [];
    // console.log(reservasObj);
    if ( reservasObj === null) { return []; }
    Object.keys( reservasObj ).forEach( key => {

      const reserva: ReservaModel = reservasObj[key];
      reserva.id = key;

      if (reserva.oficialID === id) {
        reservas.push( reserva );
      }
    } );
    return reservas;
  }

  verificarToken() {

    const expira = Number(sessionStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      this.logueado = true;
      if (sessionStorage.getItem('admin')) {
        this.adminLogueado = true;
      }
      return true;
    } else {
      this.logueado = false;
      this.adminLogueado = false;
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem('expira');
    sessionStorage.removeItem('id');
    if (sessionStorage.getItem('admin')) {
      sessionStorage.removeItem('admin');
    }
    this.logueado = false;
  }

  // **************  Gestion usuarios Administradores *****************

  getAdmins() {
    return this.http.get(`${ this.url }/admins.json`)
              .pipe( map ( resp => this.crearArregloAdmins(resp) ) );
  }


  private crearArregloAdmins( adminsObj: object) {

    const admins: AdminModel[] = [];
    //  console.log(oficialesObj);
    if ( adminsObj === null) { return []; }
    Object.keys( adminsObj ).forEach( key => {

      const admin: AdminModel = adminsObj[key];
      admin.id = key;

      admins.push( admin );

    } );

    return admins;
  }

  crearAdmin( oficial: AdminModel ) {
    return this.http.post(`${ this.url }/admins.json`, oficial)
            .pipe(
              map( (resp: any) => {
                oficial.id = resp.name;
                return oficial;
              })
            );
  }

  // **************  Gestion Bancos Administradores *****************

  crearEntidad( entidad: EntidadModel ) {
    return this.http.post(`${ this.url }/entidades.json`, entidad)
            .pipe(
              map( (resp: any) => {
                entidad.id = resp.name;
                return entidad;
              })
            );
  }

  getEntidades() {
    return this.http.get(`${ this.url }/entidades.json`)
              .pipe( map ( resp => this.crearArregloEntidades(resp) ) );
  }


  private crearArregloEntidades( entidadesObj: object) {

    const entidades: EntidadModel[] = [];

    if ( entidadesObj === null) { return []; }
    Object.keys( entidadesObj ).forEach( key => {

      const entidad: EntidadModel = entidadesObj[key];
      entidad.id = key;
      // console.log(entidad);
      entidades.push( entidad );
    } );
    return entidades;
  }

  getEntidad( id: string ) {

    return this.http.get(`${ this.url }/entidades/${ id }.json`);
  }

  actualizarEntidad( entidad: EntidadModel) {

    const entidadTemp = {
      ...entidad
    };
    delete entidadTemp.id;
    return this.http.put(`${ this.url }/entidades/${ entidad.id }.json`, entidadTemp);
  }

}
