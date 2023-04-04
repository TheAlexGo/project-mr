import { RefObject, useEffect } from 'react';

const listenerCallbacks = new WeakMap<Element, VoidFunction>();

let observer: IntersectionObserver;
const DEFAULT_CONFIG: IntersectionObserverInit = {
    rootMargin: '100px',
    threshold: 0.15
};

/**
 * Обработчик наблюдения
 * @param entries
 */
function observerHandler(entries: IntersectionObserverEntry[]) {
    entries.forEach((entry) => {
        const { target } = entry;
        if (listenerCallbacks.has(target)) {
            const callback = listenerCallbacks.get(target);
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
                observer.unobserve(target);
                listenerCallbacks.delete(target);
                if (callback) {
                    callback();
                }
            }
        }
    });
}

/**
 * Получить наблюдатель
 */
function getIntersectionObserver(config: IntersectionObserverInit) {
    if (observer === undefined) {
        observer = new IntersectionObserver(observerHandler, config);
    }
    return observer;
}

/**
 * Хук для отслеживания появления элемента во вьюпорте
 * @param {RefObject<Element>} element - отслеживаемый элемент
 * @param {VoidFunction} callback - колбэк после появления элемента во вьюпорте
 * @param {IntersectionObserverInit} config - конфигуратор
 */
export const useIntersection = <T extends Element>(
    element: RefObject<T>,
    callback: VoidFunction,
    config: IntersectionObserverInit = DEFAULT_CONFIG
) => {
    useEffect(() => {
        const target = element.current;
        if (!target) {
            return undefined;
        }
        const observer = getIntersectionObserver(config);
        listenerCallbacks.set(target, callback);
        observer.observe(target);

        return () => {
            listenerCallbacks.delete(target);
            observer.observe(target);
        };
    }, [callback, config, element]);
};
