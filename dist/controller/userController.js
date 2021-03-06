"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import {connect} from '../models/userModels';
const userModels_1 = __importDefault(require("../models/userModels"));
const listado = [
    { "id": "1", "usuario": "Juan Perez", "password": "123456" },
    { "id": "2", "usuario": "Pepe Cadena", "password": "123456" },
    { "id": "3", "usuario": "Martin Gonzalez", "password": "123456" }
];
class UserController {
    signin(req, res) {
        console.log(req.body);
        //res.send('Sign In!!!');
        res.render("partials/signinForm");
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body;
            const result = yield userModels_1.default.buscarNombre(usuario);
            console.log(usuario);
            console.log(password);
            console.log(result);
            //if (!result) {
            if (!result || usuario != result.nombre || password != result.password) {
                // res.send({ "Usuario no registrado Recibido": req.body });
                req.flash('error_session', 'Usuario y/o Password Incorrectos');
                res.redirect("./error");
            }
            if (result.nombre == usuario && result.password == password) {
                req.session.user = result;
                req.session.auth = true;
                res.redirect("./home");
                return;
            }
            // res.send({ "Usuario y/o contrase??a incorrectos": req.body });
            // error_session es una variable global:
            // PRUEBA: _> req.flash('error_session','Usuario y/o Password Incorrectos');
            // PRUEBA: _> res.redirect("./error");
        });
    }
    //registro
    signup(req, res) {
        console.log(req.body);
        //res.send('Sign Up!!!');
        res.render("partials/signupForm");
    }
    home(req, res) {
        console.log(req.body);
        if (!req.session.auth) {
            // res.redirect("/");
            req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
            res.redirect("./error");
        }
        //res.send('Bienvenido!!!');
        //res.render("partials/home");
        res.render("partials/home", { mi_session: true });
    }
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const usuarios = yield userModels_1.default.listar();
            console.log(usuarios);
            return res.json(usuarios);
            //res.send('Listado de usuarios!!!');
        });
    }
    //FIND:
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModels_1.default.buscarId(id);
            if (usuario)
                return res.json(usuario);
            res.status(404).json({ text: "User doesn't exists" });
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const { id } = req.params;
            const usuario = yield userModels_1.default.buscarId(id);
            if (usuario) {
                // return res.json(usuario);
                const user = usuario;
                console.log(usuario);
                console.log(usuario.id);
                console.log(usuario.nombre);
                res.render("partials/seleccionMod", { user: usuario, userLoginOk: req.session.user, mi_session: true });
            }
            else
                res.status(404).json({ text: "User doesn't exists" });
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = req.body;
            delete usuario.repassword;
            console.log(req.body);
            //res.send('Usuario agregado!!!');
            const busqueda = yield userModels_1.default.buscarNombre(usuario.nombre);
            if (!busqueda) {
                const result = yield userModels_1.default.crear(usuario);
                return res.json({ message: 'User saved!!' });
            }
            return res.json({ message: 'User exists!!' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const { id } = req.params;
            const result = yield userModels_1.default.actualizar(req.body, id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            return res.json({ text: 'updating a user ' + id });
        });
    }
    signMod(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //SESSION: este es un metodo POST no GET!!!
            console.log(req.body);
            const { id } = req.body.id;
            const result = yield userModels_1.default.signMod(req.body, req.body.id);
            //res.send('Usuario '+ req.params.id +' actualizado!!!');
            //return res.json({ text: 'updating a user ' + id });
            res.redirect("/user/controls");
            //res.render('partials/controls', { users: usuarios,mi_session:true });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('ABAJO PRINT BODY:');
            console.log(req.body);
            console.log('ABAJO PRINT PARAMS:');
            console.log(req.params);
            //res.send('Usuario '+ req.params.id +' Eliminado!!!');
            const { id } = req.params; // hacemos detrucsturing y obtenemos el ID. Es decir, obtenemos una parte de un objeto JS.
            //          const result = await userModel.eliminar(id); 
            // return res.json({ text: 'deleting a user ' + id });
            res.redirect('../control');
        });
    }
    //FIN CRUD
    control(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                // res.redirect("/");
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
            }
            //res.send('Controles');
            const usuarios = yield userModels_1.default.listar();
            // const users = usuarios;
            // console.log(users);
            res.render('partials/controls', { users: usuarios, mi_session: true });
        });
    }
    procesar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.auth) {
                // res.redirect("/");
                req.flash('error_session', 'Debes iniciar sesion para ver esta seccion');
                res.redirect("./error");
            }
            console.log(req.body);
            let usuario = req.body.usuario;
            var usuarios = [];
            console.log(usuario);
            console.log('ACA SALIDA COMPROBACION IF');
            //if (usuario.length > 0) {
            // if(usuario == undefined){
            if (usuario) {
                for (let elemento of usuario) {
                    const encontrado = yield userModels_1.default.buscarId(elemento);
                    if (encontrado) {
                        usuarios.push(encontrado);
                        console.log(encontrado);
                    }
                }
            }
            console.log(usuarios);
            //res.send("Recibido");
            // home es una variable  abajo!!!:
            res.render("partials/seleccion", { usuarios, userLoginOk: req.session.user, mi_session: true });
        });
    }
    endSession(req, res) {
        console.log(req.body);
        req.session.user = {};
        req.session.auth = false;
        req.session.destroy(() => console.log("Session finalizada"));
        res.redirect("/");
    }
    showError(req, res) {
        //res.send({ "Usuario y/o contrase??a incorrectos": req.body });
        res.render("partials/error");
    }
}
const userController = new UserController();
exports.default = userController;
//# sourceMappingURL=userController.js.map