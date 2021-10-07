export class DateUtil {

    private static HORA_ZERADA = '00:00:00';

    static toDate = (dateStr): Date => {
        let parts = dateStr.split('T');
        parts = parts[0].split('-');
        return new Date(parts[0], parts[1] - 1, parts[2], 0, 0, 0);;
    }

    static getAnoAtual = (): number => {
        return new Date().getFullYear();
    }

    static construirAno(data : Date) : string{
        const dia = data.getUTCDate().toString();
        const mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
        const ano = data.getUTCFullYear().toString();
        return `${dia}/${mes}/${ano}`;
    }
}
