import React, { FC, useCallback, useMemo } from 'react';

import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons, IIcon } from '@components/Icon/Icon';
import { useStore } from '@hooks/useStore';

import classes from './Header.module.styl';

interface IHeader {
    /** Название заголовка (напр. название страницы) */
    heading?: string;
    /** Описание заголовка (напр. для чего эта страница) */
    description?: string;
    /** Тип заголовка: h1..h6 */
    headingType?: HeadingTypes;
    /** Добавляет кнопку "Назад" */
    needBack?: boolean;
    /** Кнопки в шапке */
    buttons: IIcon[];
}

export const Header: FC<IHeader> = ({
    heading,
    description,
    buttons = [],
    headingType = HeadingTypes.H1,
    needBack = false
}) => {
    const { locale } = useStore();
    const navigate = useNavigate();

    const clickBackHandler = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const buttonsContent = useMemo(
        () =>
            buttons.map((button) => (
                <Icon key={button.ariaLabel} {...button} wrapperClassName={classes.button} />
            )),
        [buttons]
    );

    const leftComponent = useMemo(() => {
        if (!needBack && !heading) {
            return null;
        }
        return (
            <div className={classes.left}>
                {needBack && (
                    <Icon
                        wrapperClassName={classes.back}
                        icon={Icons.BACK}
                        ariaLabel={locale['button-back-aria-label']}
                        onClick={clickBackHandler}
                    />
                )}
                {heading && (
                    <Heading className={classes.heading} type={headingType}>
                        {heading}
                    </Heading>
                )}
            </div>
        );
    }, [clickBackHandler, heading, headingType, locale, needBack]);

    return (
        <header className={classes.header}>
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
        </header>
    );
};
