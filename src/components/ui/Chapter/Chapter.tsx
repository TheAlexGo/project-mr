import React, { useCallback, useMemo, FC } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { GaugeBar } from '@components/GaugeBar/GaugeBar';
import { Icons, Icon } from '@components/Icon/Icon';
import { Link } from '@components/Link/Link';
import { useStore } from '@hooks/useStore';
import { IChapter } from '@types';
import { getChapterLink } from '@utils/routing';

import classes from './Chapter.module.styl';

interface ChapterProps extends IChapter {
    /** Id манги, к которой относится глава */
    mangaId: number;
}

export const Chapter: FC<ChapterProps> = observer(
    ({ id, title, date, number, isAvailable, mangaId, nowProgress }): JSX.Element => {
        const { locale } = useStore();

        const currentTitle = useMemo(
            () => `${locale['manga-chapter']} ${number}: ${title}`,
            [locale, number, title]
        );

        const showGaugeBar = useMemo(
            () => isAvailable && !!nowProgress,
            [isAvailable, nowProgress]
        );

        const rootClasses = useMemo(
            () =>
                cn(classes['container'], {
                    [classes['__is-in_progress']]: showGaugeBar
                }),
            [showGaugeBar]
        );

        const wrapperClasses = useMemo(
            () =>
                cn(classes['wrapper'], {
                    [classes['__is-not_available']]: !isAvailable
                }),
            [isAvailable]
        );

        const renderIcon = useCallback(() => {
            if (isAvailable) {
                return null;
            }

            return (
                <div>
                    <Icon
                        className={classes['icon']}
                        icon={Icons.BELL}
                        ariaLabel={locale['manga-chapter-notification']}
                    />
                </div>
            );
        }, [isAvailable, locale]);

        return (
            <li className={rootClasses}>
                <div className={classes['container-main']}>
                    <div className={wrapperClasses}>
                        <Link className={classes['link']} to={getChapterLink(mangaId, id)}>
                            <span className={classes['title']}>{currentTitle}</span>
                            <span className={classes['date']}>{date.toLocaleDateString()}</span>
                        </Link>
                    </div>
                    {renderIcon()}
                </div>
                {showGaugeBar && <GaugeBar value={nowProgress} />}
            </li>
        );
    }
);
