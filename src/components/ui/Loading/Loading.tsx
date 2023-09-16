import React, { JSX, PropsWithChildren, FC } from 'react';

import { Loader } from '@components/Loader/Loader';

interface ILoading extends PropsWithChildren {
    /**
     * Условие, по которому будем проверять статус загрузки
     */
    condition: boolean;
}

/**
 * Вспомогательный компонент, который рендерит контент по переданному условию
 * @param condition
 * @param children
 * @constructor
 */
export const Loading: FC<ILoading> = ({ condition, children }): JSX.Element => {
    if (!condition || !children) {
        return <Loader />;
    }
    return children as JSX.Element;
};
