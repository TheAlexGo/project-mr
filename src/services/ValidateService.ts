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

    checkEmail = (email: string): string | null => {
        if (email === '') {
            return null;
        }
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return this.locale['error-auth-reg-email'];
        }
        return '';
    };

    checkUnknown = (): string => this.locale['error-validate-unknown'];
}
