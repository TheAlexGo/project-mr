import React, { FC, ReactElement } from 'react';

import { Loader } from '@components/Loader/Loader';

interface ILoading {
    /**
     * Условие, по которому будем проверять статус загрузки
     */
    condition: boolean;
    children: ReactElement;
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
    return children;
};
