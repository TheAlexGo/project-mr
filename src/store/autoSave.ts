import { autorun, toJS } from 'mobx';

/**
 * Сохранение хранилища mobx в localStorage с указанием сохраняемых ключей
 * @param store - сам объект хранилища
 * @param prefix - префикс хранилища для ключа LS
 * @param keys - список сохраняемых полей
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const makeLocalStorage = <T extends Record<string, any>, K extends keyof T>(
    store: T,
    prefix: string,
    keys: K[]
) => {
    keys.forEach((key) => {
        const localKey = `${prefix}_${key.toString()}`;

        const valueStr = localStorage.getItem(localKey);

        if (!valueStr) {
            return;
        }

        /**
         * Явно сохраняем в существующее хранилище значение из localStorage
         */
        Reflect.set(store, key, JSON.parse(valueStr));
    });

    autorun(() => {
        keys.forEach((key) => {
            const localKey = `${prefix}_${key.toString()}`;

            localStorage.setItem(localKey, JSON.stringify(toJS(store[key])));
        });
    });
};
