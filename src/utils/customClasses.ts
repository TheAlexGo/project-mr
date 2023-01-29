import { transliterate as ts } from 'transliteration';

export class CustomString extends String {
    toURL(): string {
        return ts(this.toString()).replace(/[^\w]/g, '_').toLowerCase();
    }
}
