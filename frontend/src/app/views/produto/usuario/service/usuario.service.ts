import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from 'src/environments/environment';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = environment.apiUrl + '/usuarios';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  mostrarMenu : boolean = false;
  mostarMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  login(credentials: Login): Observable<any> {
    return this.http.post(this.url + '/entrar',{
      username: credentials.username,
      password: credentials.senha
    }, this.httpOptions);
  }

  registrar(user: Usuario): Observable<any> {
    return this.http.post(this.url , user, this.httpOptions);
  }

  buscar(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.url);
  }

  obterPorId(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.url + `/${id}`);
  }
  editar(produto: Usuario): Observable<any>{
    return this.http.put(this.url, produto);
  }
  deletar(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(this.url + `/${id}`);
  }

}
