import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{
	API_URI = 'http://localhost:3000/user';
	
	constructor(private http: HttpClient){}

	listarUsuarios(){
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/list`);
		//si no funciona usar 
		//return this.http.get(this.API_URI+'/list');
	}
	
	buscarUsuario(id:string){
		return this.http.get(`${this.API_URI}/find/${id}`);
	}

  guardarUsuario(usuario: Usuario){
    return this.http.post(`${this.API_URI}/create`,usuario);
  }
  
  eleminarUsuario(id:string){
    return this.http.delete(`${this.API_URI}/delete/${id}`);
  }
  
  actualizarUsuario(id:string, actualizaUsuario: Usuario):Observable<Usuario>{
    return this.http.put(`${this.API_URI}/update/${id}`,actualizaUsuario);
  }
}
