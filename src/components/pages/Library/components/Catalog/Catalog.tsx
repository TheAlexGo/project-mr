import React, { useRef, useMemo, useCallback, FC, useState } from 'react';

import { observer } from 'mobx-react-lite';

import { CardList, Axes } from '@components/CardList/CardList';
import { useController } from '@hooks/useController';
import { useScrolledToBottom } from '@hooks/useScrolledToBottom';
import { useStore } from '@hooks/useStore';
import { CARD_MAX_HEIGHT } from '@utils/constants';

/**
 * Делаем смещение на максимальную высоту 4-х карточек
 */
const OFFSET_BY_CARD_HEIGHT = 4;

export const Catalog: FC = observer((): JSX.Element => {
    const { catalogElements } = useStore();
    const { loadMoreInCatalog } = useController();
    const [isLoaded, setIsLoaded] = useState<boolean>(true);
    const [hasMore, setHasMore] = useState<boolean>(true);

    /**
     * Во время установки значения в стейт есть вероятность, что функция не обновится и останется старое значение.
     * Избежать этого можно через useRef
     */
    const isLoading = useRef(false);

    const scrolledToBottomHandler = useCallback(() => {
        if (isLoading.current || !hasMore) {
            return;
        }
        isLoading.current = true;
        setIsLoaded(false);
        loadMoreInCatalog().then((hasMore) => {
            isLoading.current = false;
            setIsLoaded(true);
            setHasMore(hasMore);
        });
    }, [hasMore, loadMoreInCatalog]);

    const offset = useMemo(() => -(CARD_MAX_HEIGHT * OFFSET_BY_CARD_HEIGHT), []);
    useScrolledToBottom(scrolledToBottomHandler, offset);

    return <CardList axis={Axes.Y} cards={[...catalogElements]} isLoading={!isLoaded} />;
});
