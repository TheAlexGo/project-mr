import React, { createElement, FC } from 'react';

import { Button } from '@components/Button/Button';
import { useStore } from '@hooks/useStore';
import { FlexPositions, HeaderButtons, HeaderTypes, IHeaderButton } from '@types';
import block from 'bem-cn-custom';
import { observer } from 'mobx-react-lite';

import './Header.styl';

const classnames = block('header');

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
    ({ className, heading, description, buttonsPositions, type = HeaderTypes.H1, needBack = false }) => {
        const { headerButtons } = useStore();

        const Heading = createElement(
            type,
            {
                className: classnames('heading')
            },
            heading
        );

        const buttonsContent = headerButtons.map((button) => {
            switch (button.headerType) {
                case HeaderButtons.MORE:
                    // more
                    return (
                        <Button key={button.headerType} className={classnames('button')}>
                            More
                        </Button>
                    );
                case HeaderButtons.SEARCH:
                    // search
                    return (
                        <Button key={button.headerType} className={classnames('button')}>
                            Search
                        </Button>
                    );
                case HeaderButtons.TRASH:
                    // trash
                    return (
                        <Button key={button.headerType} className={classnames('button')}>
                            Trash
                        </Button>
                    );
                case HeaderButtons.ADD:
                    // plus
                    return (
                        <Button key={button.headerType} className={classnames('button')}>
                            Plus
                        </Button>
                    );
                case HeaderButtons.BELL:
                    // bell
                    return (
                        <Button key={button.headerType} className={classnames('button')}>
                            Bell
                        </Button>
                    );
                default:
                    return null;
            }
        });

        return (
            <div className={classnames({}).mix(className)}>
                <div className={classnames('wrapper')}>
                    <div className={classnames('left')}>
                        {needBack && <Button className={classnames('back')}>Back</Button>}
                        {Heading}
                    </div>
                    <div
                        className={classnames('right')}
                        style={{ justifyContent: buttonsPositions, ...(buttonsPositions ? { flex: 1 } : {}) }}
                    >
                        {buttonsContent}
                    </div>
                </div>
                {description && <div className={classnames('description')}>{description}</div>}
            </div>
        );
    }
);
