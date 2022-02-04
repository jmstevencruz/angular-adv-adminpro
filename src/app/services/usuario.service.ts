import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

declare const gapi: any;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario : Usuario = new Usuario("",""); 

  constructor(private http: HttpClient, private router: Router, private ngZone:NgZone) {
    this.googleInit();
  }

  get token () : string {
    return localStorage.getItem('token') || ''; 
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean> {
    //console.log("Validar token");
   
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(map((resp: any) => {
      console.log (resp);
      const { email, google, nombre, role, img = '', uid } = resp.usuario; 
      this.usuario = new Usuario( nombre, email, '' , google, img, role, uid);
      //this.usuario.imprimirUsuario();
      localStorage.setItem('token', resp.token);
      return true;
    }), 
      catchError(error => of(false)));
  }

  crearUsuario(formData: RegisterForm) {

    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  actualizarPerfil (data : { email : string, nombre : string, role: string}) {

    data = {
      ...data,
      role : this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, { headers: {
      'x-token': this.token
    }});
  }

  login(formData: LoginForm) {

    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );



  }


  loginGoogle(token: any) {

    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );

  }

  logout() {
    localStorage.removeItem('token');
    this.auth2.signOut().then(() => {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });     
    });
  }

  googleInit() {

    return new Promise<void> ( resolve  => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '451468221953-ukl3o4cgts91v3un9q9o3gj6q4kf7p3d.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });
        resolve();
      });

    });
   
  }


}
