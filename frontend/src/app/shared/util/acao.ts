export class Acao {
    static CADASTRAR = 'cadastrar';
    static EDITAR = 'editar';
    static VISUALIZAR = 'visualizar';
    static SUCESSO = 'sucesso';
    static CANCELAR = 'cancelar';
    static INCLUIR = 'incluir';

    static options = {
        CADASTRAR: Acao.CADASTRAR,
        VISUALIZAR: Acao.VISUALIZAR,
        EDITAR: Acao.EDITAR,
        SUCESSO: Acao.SUCESSO,
        CANCELAR: Acao.CANCELAR,
    };
}

export class AcoesInfo {
    title: string;
    icon: string;
    id: string;

    constructor(title: string, icon: string, id: string) {
        this.title = title;
        this.icon = icon;
        this.id = id;
    }
}

export enum AcaoOptionsEnum {
    VISUALIZAR, EDITAR, EXCLUIR, SUCESSO, CANCELAR, INCLUIR
}

export const AcaoEnumMapper = {
    [AcaoOptionsEnum.VISUALIZAR]: new AcoesInfo('Detalhar Produto', 'pi pi-eye', 'visualizar'),
    [AcaoOptionsEnum.EDITAR]: new AcoesInfo('Editar Produto', 'pi pi-pencil', 'editar'),
    [AcaoOptionsEnum.EXCLUIR]: new AcoesInfo('Excluir Produto', 'pi pi-trash', 'excluir'),
    [AcaoOptionsEnum.SUCESSO]: new AcoesInfo('Sucesso', 'pi pi-check', 'sucesso'),
    [AcaoOptionsEnum.CANCELAR]: new AcoesInfo('Cancelar', 'pi pi-times', 'cancelar'),
};

