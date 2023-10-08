/**
 * Модификатор отключения скролла для всей страницы (устанавливается на body)
 */
export const DISABLED_SCROLL_MODIFIER = '__is-overflow_hidden';

/**
 * Получает все фокусируемые элементы, внутри передаваемого элемента
 * @param {HTMLElement} element - передаваемый элемент
 * @returns {HTMLElement[]} - массив фокусируемых элементов
 */
export const getKeyboardFocusableElements = (element: HTMLElement): HTMLElement[] =>
    [
        ...(element.querySelectorAll<HTMLElement>(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        ) as unknown as HTMLElement[])
    ].filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

/**
 * Проверяем, есть ли у переданного элемента признаки "выбранного"
 * @param element
 */
export const isSelectedElement = (element: HTMLElement): boolean =>
    element.getAttribute('aria-checked') === 'true' ||
    element.getAttribute('aria-selected') === 'true' ||
    element.getAttribute('aria-pressed') === 'true' ||
    element.getAttribute('aria-current') === 'true';

/**
 * Проверяем, есть ли у переданного элемента специальный флаг
 * @param element
 */
export const isSelectedElementByFlag = (element: HTMLElement): boolean =>
    element.getAttribute('data-is-active') === 'true';
