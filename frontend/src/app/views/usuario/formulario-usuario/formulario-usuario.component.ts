import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs/operators';
import { Acao, AcaoEnumMapper } from 'src/app/shared/util/acao';
import { AlertaService } from 'src/app/shared/util/alerta.service';
import { MensagemValidacaoUtil } from 'src/app/shared/util/mensagem-validacao.util';
import { MensagensUtil } from 'src/app/shared/util/mensagens.util';
import { Usuario } from '../models/usuario';
import { TokenStorageService } from '../service/token-storage.service';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  usuario = new Usuario();
  form: FormGroup;
  formLogin: FormGroup;
  acao: Acao;
  idUsuario: number;
  tituloModal = 'Cadastrar Usuario';
  constructor(private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService,
    private ddr: DynamicDialogRef) {
    if (config.data) {
      this.idUsuario = config.data;
      this.tituloModal = 'Editar Usuario';
      this.obterProdutoPorId();
    }
  }

  ngOnInit(): void {
    this.iniciarForm();
    this.desabilitarFormulario();
  }

  obterProdutoPorId(): void {
    this.blockUI.start(MensagensUtil.BLOCKUI_CARREGANDO);
    this.usuarioService.obterPorId(this.idUsuario)
      .pipe(finalize(() => this.blockUI.stop())).subscribe(ref => {
        this.usuario = ref;

      });
  }

  private iniciarForm() {
    this.usuario.admin = false;
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      confirmacao: ['', [Validators.required]],
    });
  }

  confirmacaoSenha(): Boolean {
    const confirmacao = this.form.get('confirmacao');
    if (confirmacao?.dirty || confirmacao?.touched) {
      return Object.is(confirmacao.value, this.usuario.senha);
    }
    return true;
  }

  obterRequisicao() {
    return this.usuario.id ?
      this.usuarioService.editar(this.usuario) : this.usuarioService.registrar(this.usuario);
  }

  salvarUsuario() {
    MensagemValidacaoUtil.validarTodosCamposDoForm(this.form);
    this.blockUI.start(MensagensUtil.BLOCKUI_SALVANDO);
    this.obterRequisicao().pipe(finalize(() => this.blockUI.stop()))
      .subscribe(response => {
        this.fecharModal();
        this.alertaService.sucesso(MensagensUtil.SUCESSO);
      },
        err => {
          const msg = `O Usuario ${this.usuario.nome} já possui cadastro no sistema.`;
          this.alertaService.erro(msg);
        });
  }

  salvar() {
    MensagemValidacaoUtil.validarTodosCamposDoForm(this.form);
    if (this.form.valid && this.confirmacaoSenha()) {
      this.salvarUsuario();
    }
  }

  desabilitarFormulario(): void {
    if (this.ehVisualizar()) {
        this.form.disable();
    }
}

ehVisualizar(): boolean {
  return Acao.VISUALIZAR === this.acao;
}

  reloadPage() {
    window.location.reload();
  }

  fecharModal(value?: any): void {
    this.ddr.close(value);
  }

}
