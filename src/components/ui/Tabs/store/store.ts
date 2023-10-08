import { useContext, useRef, useState } from 'react';

import { Context } from './context';

export const useTabsStore = () => {
    const itemRefs = useRef<HTMLElement[]>([]);
    const [activeItem, setActiveItem] = useState<HTMLElement | null>(null);
    return {
        itemRefs,
        activeItem,
        setActiveItem
    };
};

export const useStore = () => useContext(Context);
