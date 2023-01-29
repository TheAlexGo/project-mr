export class ValidateService {
    locale: Record<string, string> = {};

    setLocale = (locale: Record<string, string>) => {
        this.locale = locale;
    };
}
