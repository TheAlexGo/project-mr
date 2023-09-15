import { useEffect, type MutableRefObject } from 'react';

import { setFocus } from './dom';

export const useFocus = (target: MutableRefObject<HTMLElement | null>, withFocus: boolean) => {
    useEffect(() => {
        if (withFocus) {
            setFocus(target);
        }
    }, [target, withFocus]);
};
