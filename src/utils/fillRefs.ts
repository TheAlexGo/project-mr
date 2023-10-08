/**
 * Заполняем переданный массив ссылками на html-ноду
 *
 * @author alexander.gordeev (alexander.gordeev@vk.team)
 * @param acc
 */
export const fillRefs = (acc: HTMLElement[]) => (ref: HTMLElement | null) => {
    if (!ref) {
        return;
    }

    if (ref && !acc.includes(ref)) {
        acc.push(ref);
    }
};
