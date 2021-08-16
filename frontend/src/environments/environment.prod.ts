import { version } from 'package.json';

export const environment = {
    appVersion: version,
    production: true,
    apiUrl: '/api',
    apoioUrl: '/apoio/api',
    comunicacaoUrl: '/comunicacao/api',
    experienciaUrl: '/experiencia/api',
    relatoriosUrl: 'relatorios/api',
    auth: {
        baseUrl: '',
        authUrl: '/login/cas',
        loginUrl: '/login/cas',
        logoutUrl: '/cas/logout',
        detailsUrl: '/api/user/details',
        tokenValidationUrl: '/api/token/validate',
        storage: localStorage,
        tokenStorageIndex: 'token',
        userStorageIndex: 'user',
        loginSuccessRoute: ''
    }
};
