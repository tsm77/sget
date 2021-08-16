import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AlertaService } from 'src/app/shared/util/alerta.service';
import { ModalService } from 'src/app/shared/util/modal.serivce';
import { FormularioUsuarioComponent } from '../formulario-usuario/formulario-usuario.component';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';
import { TokenStorageService } from '../service/token-storage.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() emitUsuario: EventEmitter<Login> = new EventEmitter
  login = new Login();
  formLogin : FormGroup;

  constructor(private modalService: ModalService, 
    private fb : FormBuilder, 
    private usuarioService: UsuarioService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private alertaService: AlertaService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    this.iniciarForm();
  }

  abrirModal(){
  this.modalService.modalComponente(FormularioUsuarioComponent)
  }


  iniciarForm(){
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    })
  }

  telaInicial(){
    this.router.navigate(['']);

  }
  
  doLogin() {
    this.onSubmit();
  }

  onSubmit() {
    this.usuarioService.login(this.login).subscribe( data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.getUser();
        this.emitUsuario.emit(data);      
        const msg = `Login realizado com sucesso.`;
        this.alertaService.sucesso(msg);
        this.telaInicial();  
      },
      err => {        
        const msg = `O Usuario ${this.login.username} Não encontrado.`;
        this.alertaService.erro(msg);
      }
    );
  }
}
