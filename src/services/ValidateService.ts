export enum ValidateTypes {
    PASSWORD = 'password',
    EMAIL = 'email',
    UNKNOWN = 'unknown'
}

export class ValidateService {
    locale: Record<string, string> = {};

    setLocale = (locale: Record<string, string>) => {
        this.locale = locale;
    };

    checkPassword = (password: string): string => {
        if (password.length < 8) {
            return this.locale['error-auth-reg-password-length'];
        }
        return '';
    };

    checkUnknown = (): string => this.locale['error-validate-unknown'];
}
