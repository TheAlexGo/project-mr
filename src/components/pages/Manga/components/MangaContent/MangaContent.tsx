import React, { FC, memo, useCallback, useMemo } from 'react';

import { useLocation, To } from 'react-router-dom';

import { ButtonStates, ButtonThemes, Button } from '@components/Button/Button';
import { Heading, HeadingTypes } from '@components/Heading/Heading';
import { Icon, Icons } from '@components/Icon/Icon';
import { Image } from '@components/Image/Image';
import { Link } from '@components/Link/Link';
import { Tabs } from '@components/Tabs/Tabs';
import { ITab } from '@components/Tabs/components/Tab/Tab';
import { useStore } from '@hooks/useStore';
import { IManga, Justifies, ModalLinks } from '@types';
import { getMangaDescription, getMangaTitle } from '@utils/manga';
import { getModalLink, getSearchPage } from '@utils/routing';

import { Chapters } from '../Chapters/Chapters';

import classes from './MangaContent.module.styl';

type IMangaContent = IManga;

export const MangaContent: FC<IMangaContent> = memo(
    ({ titles, coverUri, genres, rating, author, descriptions }): JSX.Element => {
        const { locale } = useStore();
        const currentTitle = useMemo(() => getMangaTitle(titles), [titles]);
        const currentDescription = useMemo(() => getMangaDescription(descriptions), [descriptions]);
        const { hash } = useLocation();

        const coverAlt = useMemo(
            () => `${currentTitle} ${locale['manga-cover']}`,
            [currentTitle, locale]
        );

        const buttonRateAriaLabel = useMemo(
            () => `${locale['manga-button-rate-aria-label']} ${rating}`,
            [locale, rating]
        );

        const tabElements: ITab[] = useMemo(
            () => [
                {
                    id: 'chapters',
                    title: locale['manga-tab-chapters'],
                    content: {
                        id: 'catalog-content',
                        children: <Chapters />
                    }
                },
                {
                    id: 'discussion',
                    title: locale['manga-tab-discussion'],
                    content: {
                        id: 'discussion-content',
                        children: <div>{locale['manga-tab-discussion']}</div>
                    }
                },
                {
                    id: 'similar',
                    title: locale['manga-tab-similar'],
                    content: {
                        id: 'similar-content',
                        children: <div>{locale['manga-tab-similar']}</div>
                    }
                }
            ],
            [locale]
        );

        const activeTab: ITab | null = useMemo(
            () => tabElements.find((tab) => hash.endsWith(tab.content.id)) || null,
            [hash, tabElements]
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
                                    ariaLabel={null}
                                    isNotButton
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
                <div className={classes['container-description_link']}>
                    <Link
                        className={classes['link-description']}
                        to={getModalLink(ModalLinks.MANGA_DESCRIPTION)}
                    >
                        {locale['manga-description-full']}
                        <Icon
                            className={classes['icon-arrow']}
                            icon={Icons.ARROW_RIGHT}
                            size="18"
                            ariaLabel={null}
                            isNotButton
                        />
                    </Link>
                </div>
                <div className={classes['container-buttons']}>
                    <Button theme={ButtonThemes.PRIMARY} isWide>
                        {locale['manga-button-read']}
                    </Button>
                    <Button
                        theme={ButtonThemes.SECONDARY}
                        state={ButtonStates.HOVER}
                        aria-label={locale['manga-button-bookmark']}
                    >
                        <Icon icon={Icons.BOOKMARK} ariaLabel={null} isNotButton />
                    </Button>
                </div>
                <Tabs
                    title={locale['manga-tabs-title']}
                    elements={tabElements}
                    activeTab={activeTab}
                />
            </div>
        );
    }
);

MangaContent.displayName = 'MangaContent';
