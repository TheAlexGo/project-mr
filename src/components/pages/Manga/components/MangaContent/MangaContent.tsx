import React, { FC, memo, useCallback, useMemo } from 'react';

import { To } from 'react-router-dom';

import { Button } from '@components/Button/Button';
import { HeadingTypes, Heading } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { Image } from '@components/Image/Image';
import { Link } from '@components/Link/Link';
import { useStore } from '@hooks/useStore';
import { IManga, Justifies } from '@types';
import { getMangaDescription, getMangaTitle } from '@utils/manga';
import { getSearchPage } from '@utils/routing';

import classes from './MangaContent.module.styl';

type IMangaContent = IManga;

export const MangaContent: FC<IMangaContent> = memo(
    ({ titles, coverUri, genres, rating, author, descriptions }): JSX.Element => {
        const { locale } = useStore();
        const currentTitle = useMemo(() => getMangaTitle(titles), [titles]);
        const currentDescription = useMemo(() => getMangaDescription(descriptions), [descriptions]);

        const coverAlt = useMemo(
            () => `${currentTitle} ${locale['manga-cover']}`,
            [currentTitle, locale]
        );

        const buttonRateAriaLabel = useMemo(
            () => `${locale['manga-button-rate-aria-label']} ${rating}`,
            [locale, rating]
        );

        const renderTags = useCallback(
            () => (
                <ul className={classes['container-genres']}>
                    {genres.map(({ id, title }, index) => {
                        const genreLink: To = {
                            pathname: getSearchPage(),
                            search: `genres=${id}`
                        };

                        const renderDelimiter = () => {
                            if (index === genres.length - 1) {
                                return null;
                            }

                            return <>,&nbsp;</>;
                        };

                        return (
                            <li key={id} className={classes['genre']}>
                                <Link to={genreLink}>{title}</Link>
                                {renderDelimiter()}
                            </li>
                        );
                    })}
                </ul>
            ),
            [genres]
        );

        const renderAuthor = useCallback(() => {
            const authorLink: To = {
                pathname: getSearchPage(),
                search: `author=${author.id}`
            };
            return (
                <Link
                    className={classes['info-author']}
                    to={authorLink}
                >{`${author.firstname} ${author.lastname}`}</Link>
            );
        }, [author.firstname, author.id, author.lastname]);

        return (
            <div>
                <div className={classes['cover']}>
                    <Image src={coverUri} alt={coverAlt} />
                </div>
                <div className={classes['container-info']}>
                    <div className={classes['info-left']}>
                        {renderTags()}
                        <div className={classes['info-heading']}>
                            <Heading type={HeadingTypes.H1}>{currentTitle}</Heading>
                        </div>
                        {renderAuthor()}
                    </div>
                    <div>
                        <Button
                            className={classes['button-rate']}
                            icon={
                                <Icon
                                    className={classes['icon-rate']}
                                    icon={Icons.STAR}
                                    isNotButton
                                    ariaLabel={null}
                                />
                            }
                            contentJustify={Justifies.SPACE_BETWEEN}
                            withRightIcon
                            aria-label={buttonRateAriaLabel}
                        >
                            {rating.toFixed(2)}
                        </Button>
                    </div>
                </div>
                <div className={classes['container-description']}>{currentDescription}</div>
            </div>
        );
    }
);

MangaContent.displayName = 'MangaContent';
