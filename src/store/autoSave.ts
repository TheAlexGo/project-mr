/* eslint-disable @typescript-eslint/no-explicit-any */
import { autorun, toJS } from 'mobx';

enum TypeKeys {
    MAP = 'map'
}

const DELIMITER = ':';

const checkDifficultType = (type: TypeKeys, value: string) => value.includes(type + DELIMITER);

const getValueAsStringForComplexType = <T>(type: TypeKeys, value: T): string =>
    type + DELIMITER + JSON.stringify(value);

const getValueForComplexType = <T>(type: TypeKeys, valueString: string): T =>
    JSON.parse(valueString.replace(type + DELIMITER, ''));

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

        let savedValue;

        if (checkDifficultType(TypeKeys.MAP, valueStr)) {
            savedValue = new Map<string, any>(
                getValueForComplexType<[string, any][]>(TypeKeys.MAP, valueStr)
            );
        } else {
            savedValue = JSON.parse(valueStr);
        }

        /**
         * Явно сохраняем в существующее хранилище значение из localStorage
         */
        Reflect.set(store, key, savedValue);
    });

    autorun(() => {
        keys.forEach((key) => {
            const localKey = `${prefix}_${key.toString()}`;
            const currentValue: Record<string, any> = toJS(store[key]);
            let savingValue;

            if (currentValue instanceof Map) {
                savingValue = getValueAsStringForComplexType(TypeKeys.MAP, [
                    ...currentValue.entries()
                ]);
            } else {
                savingValue = JSON.stringify(toJS(currentValue));
            }
            localStorage.setItem(localKey, savingValue);
        });
    });
};
