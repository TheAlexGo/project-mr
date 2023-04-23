import { useMemo, useCallback, useEffect } from 'react';

import throttle from 'lodash.throttle';

export const useScrolledToBottom = (callback: VoidFunction, offset: number) => {
    const scrollHandlerMemo = useMemo(
        () =>
            throttle((e: Event) => {
                const document = e.target as Document;
                const { scrollingElement } = document;
                if (!scrollingElement) {
                    return;
                }
                if (
                    scrollingElement.scrollHeight - scrollingElement.scrollTop + offset <=
                    scrollingElement.clientHeight
                ) {
                    callback();
                }
            }, 300),
        [callback, offset]
    );

    const scrollHandler = useCallback(scrollHandlerMemo, [scrollHandlerMemo]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return () => document.removeEventListener('scroll', scrollHandler);
    }, [scrollHandler]);
};
