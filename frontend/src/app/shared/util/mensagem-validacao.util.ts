import { AbstractControl, FormGroup } from '@angular/forms';

export class MensagemValidacaoUtil {

  static padrao = 'Campo ';
  static required = ' de preenchimento obrigatório';
  static email = ' com formato inválido';
  static notValid = ' informado é inválido.';
  static foneInvalid = ' informado não corresponde a um formato válido.';
  static dddInvalid = '  o DDD informado é inválido.';
  static maxlength = ' tamanho inválido';

  constructor() { }

  static construirMensagem(campo: string, control: AbstractControl): string {
    const decrementoPosicao = 1;
    let mensagem = '';
    const nome = campo ? campo : this.padrao;
    if (control.dirty || control.touched) {
      if (control.errors) {
        const qtdErros = Object.entries(control.errors).length;
        Object.entries(control.errors).forEach(
          ([chave, _valor], index) => {
            if (index < qtdErros - decrementoPosicao) {
              mensagem += nome + MensagemValidacaoUtil[chave] + `, `;
            } else {
              mensagem += nome + MensagemValidacaoUtil[chave];
            }
          }
        );
      }
    }
    return mensagem;
  }

  static validarTodosCamposDoForm(formGroup: FormGroup): void {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.validarTodosCamposDoForm(control);
      }
    });
  }

}
