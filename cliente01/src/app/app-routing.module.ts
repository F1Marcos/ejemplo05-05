import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuariosListarComponent} from "./components/usuarios-listar/usuarios-listar.component";
import {UsuariosIngresarComponent} from "./components/usuarios-ingresar/usuarios-ingresar.component";
import {UsuariosRegistrarComponent} from "./components/usuarios-registrar/usuarios-registrar.component";

const routes: Routes = [
	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent
	},
	{
		path: 'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},
	{
		path: 'usuarios/registrar',
		component: UsuariosRegistrarComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
