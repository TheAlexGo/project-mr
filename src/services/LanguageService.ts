import { Lang } from '@types';

import packageEn from '@languages/en';
import packageRu from '@languages/ru';

export class LanguageService {
    private resources = {
        [Lang.RUSSIAN]: packageRu,
        [Lang.ENGLISH]: packageEn
    };

    loadResource(lang: Lang) {
        return this.resources[lang];
    }
}
