import packageEn from '@languages/en';
import packageRu from '@languages/ru';
import { Lang } from '@types';

export class LanguageService {
    private resources = {
        [Lang.RUSSIAN]: packageRu,
        [Lang.ENGLISH]: packageEn
    };

    loadResource(lang: Lang) {
        return this.resources[lang];
    }
}
