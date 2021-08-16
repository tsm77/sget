import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Produto } from '../models/produto';

@Injectable({
  providedIn: 'root'
})

export class ProdutosService {
  
   url = environment.apiUrl + '/produtos';
  constructor(private http: HttpClient) {  }

  create(produto: Produto): Observable<any> {
    return this.http.post(this.url, produto);
  }
  
  getProduto(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url);
  }

  obterPorId(id: number): Observable<Produto>{
    return this.http.get<Produto>(this.url + `/${id}`);
  }
  editar(produto: Produto): Observable<any>{
    return this.http.put(this.url, produto);
  }
  deletar(id: number): Observable<Produto>{
    return this.http.delete<Produto>(this.url + `/${id}`);
  }
}
