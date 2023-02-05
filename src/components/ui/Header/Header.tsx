import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons, IIcon } from '@components/Icon/Icon';
import { useController } from '@hooks/useController';
import { useStore } from '@hooks/useStore';
import { Pages } from '@types';

import classes from './Header.module.styl';

interface IHeader {
    /** Название заголовка (напр. название страницы) */
    heading?: string;
    /** Описание заголовка (напр. для чего эта страница) */
    description?: string;
    /** Внешний класс */
    className?: string;
    /** Активная страница (по ней будут формироваться кнопки) */
    activePage?: Pages;
    /** Тип заголовка: h1..h6 */
    headingType?: HeadingTypes;
    /** Добавляет кнопку "Назад" */
    needBack?: boolean;
}

export const Header: FC<IHeader> = observer(
    ({
        className,
        heading,
        description,
        activePage,
        headingType = HeadingTypes.H1,
        needBack = false
    }) => {
        const { logger } = useController();
        const { locale } = useStore();
        const navigate = useNavigate();

        const headerButtons: IIcon[] = useMemo(() => {
            const getIconObj = (icon: Icons, onClick: VoidFunction) => ({
                className: classes.button,
                ariaLabel: locale[`button-${icon}-aria-label`],
                onClick,
                icon
            });
            switch (activePage) {
                case Pages.GENERAL:
                    return [
                        getIconObj(Icons.BELL, () => logger('Нажали на колокольчик!')),
                        getIconObj(Icons.SEARCH, () => logger('Нажали на поиск!'))
                    ];
                default:
                    return [];
            }
        }, [activePage, locale, logger]);

        const buttonsContent = useMemo(
            () => headerButtons.map((button) => <Icon key={button.ariaLabel} {...button} />),
            [headerButtons]
        );

        const clickBackHandler = useCallback(() => {
            navigate(-1);
        }, [navigate]);

        const leftComponent = useMemo(() => {
            if (!needBack && !heading) {
                return null;
            }
            return (
                <div className={classes.left}>
                    {needBack && (
                        <Icon
                            className={classes.back}
                            icon={Icons.BACK}
                            ariaLabel={locale['button-back-aria-label']}
                            onClick={clickBackHandler}
                        />
                    )}
                    {heading && (
                        <Heading className={classes.heading} type={headingType} text={heading} />
                    )}
                </div>
            );
        }, [clickBackHandler, heading, headingType, locale, needBack]);

        return (
            <div className={cn(classes.header, className)}>
                <div className={classes.wrapper}>
                    {leftComponent}
                    <div
                        className={cn(classes.right, {
                            [classes['__is-only-buttons']]: !leftComponent
                        })}
                    >
                        {buttonsContent}
                    </div>
                </div>
                {description && <div className={classes.description}>{description}</div>}
            </div>
        );
    }
);
