import { KeyboardKeys } from '@utils/constants';

/**
 * Возвращаем false для всех ключей, которые уже имеют свой функиональный смысл
 * @param key
 */
export const isCurrentKey = (key: KeyboardEvent['key']): boolean => {
    switch (key) {
        case KeyboardKeys.ARROW_UP:
        case KeyboardKeys.ARROW_DOWN:
        case KeyboardKeys.ENTER:
        case KeyboardKeys.SPACE:
            return false;
        default:
            return true;
    }
};
