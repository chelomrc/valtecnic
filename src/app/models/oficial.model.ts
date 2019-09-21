

export class OficialModel {

  id: string;
  nombre: string;
  apellido: string;
  usuario: string;
  contrasena: string;
  email: string;
  telefono: string;
  banco: string;
  fechaRegistro: string;
  estado: boolean;

  constructor() {
      this.estado = true;
  }

}
