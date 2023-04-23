import React, { useMemo, FC } from 'react';

import classes from './GaugeBar.module.styl';

interface IProgressBar {
    value: number;
}

/**
 * Показывает уровень преодоления какой-то задачи (например, прогресс прочтения главы)
 * @param value
 * @constructor
 */
export const GaugeBar: FC<IProgressBar> = ({ value }): JSX.Element => {
    const valueStyle = useMemo(() => ({ width: `${value}%` }), [value]);

    return (
        <div className={classes['container']}>
            <meter className={classes['progress']} min="0" max="100" value={value}>
                {`${value} %`}
            </meter>
            <div className={classes['wrapper']}>
                <div className={classes['value']} style={valueStyle} />
            </div>
        </div>
    );
};
