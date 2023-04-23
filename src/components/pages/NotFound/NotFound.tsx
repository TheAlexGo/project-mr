import React, { useMemo } from 'react';

import { Button, ButtonThemes } from '@components/Button/Button';
import { Image } from '@components/Image/Image';
import { usePage } from '@hooks/usePage';
import { useStore } from '@hooks/useStore';
import { NotFoundIcon } from '@icons';
import { Pages } from '@types';

import { Page } from '../Page/Page';

import classes from './NotFound.module.styl';

const NotFound = () => {
    const { locale } = useStore();

    const headerButtons = useMemo(() => [], []);
    usePage(Pages.NOT_FOUND, headerButtons);

    return (
        <Page className={classes['not-found']}>
            <div className={classes.top}>
                <Image
                    className={classes.image}
                    src={NotFoundIcon}
                    alt={locale['page-not_found-aria-label']}
                />
                <h1 className={classes.heading}>404</h1>
                <p className={classes.description}>{locale['error-404-title']}</p>
            </div>
            <Button theme={ButtonThemes.PRIMARY} href="/" isWide>
                {locale['error-404-button']}
            </Button>
        </Page>
    );
};

export default NotFound;
