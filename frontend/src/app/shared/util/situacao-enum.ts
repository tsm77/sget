import { SelectItem } from "primeng/api";
export class EnumSituacao{
    static ATIVO = 'ATIVO';
    static INATIVO = 'INATIVO';
}

export const StatusEnumMapper = {
    [EnumSituacao.ATIVO]: 'Ativo',
    [EnumSituacao.INATIVO]: 'Inativo',
};

export const StatusOptions: SelectItem[] = [
    { value: EnumSituacao.ATIVO, label: StatusEnumMapper[EnumSituacao.ATIVO] },
    { value: EnumSituacao.INATIVO, label: StatusEnumMapper[EnumSituacao.INATIVO] },
];
