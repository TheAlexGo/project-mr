import React, { createElement, FC } from 'react';

import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import { Button } from '@components/Button/Button';
import { useStore } from '@hooks/useStore';
import { FlexPositions, HeaderButtons, HeaderTypes, IHeaderButton } from '@types';

import classes from './Header.module.styl';

interface IHeader {
    heading?: string;
    description?: string;
    className?: string;
    type?: HeaderTypes;
    needBack?: boolean;
    buttons?: IHeaderButton[];
    buttonsPositions?: FlexPositions;
}

export const Header: FC<IHeader> = observer(
    ({
        className,
        heading,
        description,
        buttonsPositions,
        type = HeaderTypes.H1,
        needBack = false
    }) => {
        const { headerButtons } = useStore();

        const Heading = createElement(
            type,
            {
                className: classes.heading
            },
            heading
        );

        const buttonsContent = headerButtons.map((button) => {
            switch (button.headerType) {
                case HeaderButtons.MORE:
                    // more
                    return (
                        <Button key={button.headerType} className={classes.button}>
                            More
                        </Button>
                    );
                case HeaderButtons.SEARCH:
                    // search
                    return (
                        <Button key={button.headerType} className={classes.button}>
                            Search
                        </Button>
                    );
                case HeaderButtons.TRASH:
                    // trash
                    return (
                        <Button key={button.headerType} className={classes.button}>
                            Trash
                        </Button>
                    );
                case HeaderButtons.ADD:
                    // plus
                    return (
                        <Button key={button.headerType} className={classes.button}>
                            Plus
                        </Button>
                    );
                case HeaderButtons.BELL:
                    // bell
                    return (
                        <Button key={button.headerType} className={classes.button}>
                            Bell
                        </Button>
                    );
                default:
                    return null;
            }
        });

        return (
            <div className={cn(classes.header, className)}>
                <div className={classes.wrapper}>
                    <div className={classes.left}>
                        {needBack && <Button className={classes.back}>Back</Button>}
                        {Heading}
                    </div>
                    <div
                        className={classes.right}
                        style={{
                            justifyContent: buttonsPositions,
                            ...(buttonsPositions
                                ? {
                                      flex: 1
                                  }
                                : {})
                        }}
                    >
                        {buttonsContent}
                    </div>
                </div>
                {description && <div className={classes.description}>{description}</div>}
            </div>
        );
    }
);
