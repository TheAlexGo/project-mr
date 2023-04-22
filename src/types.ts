import { ReactElement } from 'react';

import { Icons } from '@components/Icon/Icon';
import { Manga } from '@store/manga';

export enum Lang {
    RUSSIAN = 'russian',
    ENGLISH = 'english'
}

/**
 * Для проверки корректности выбранной страницы
 */
export enum Pages {
    CHAPTER = '/chapter',
    MANGA = '/library/manga',
    READLIST = '/library/readlist',
    LIBRARY = '/library',
    PROFILE_SETTINGS_CHANGE_EMAIL = '/profile/settings/change/email',
    PROFILE_SETTINGS_CHANGE_PASSWORD = '/profile/settings/change/password',
    PROFILE_SETTINGS_CHANGE_LANGUAGE = '/profile/settings/change/language',
    PROFILE_SETTINGS = '/profile/settings',
    PROFILE = '/profile',
    NOT_FOUND = '/not_found',
    SEARCH = '/search',
    GENERAL = '/'
}

export enum SourceTypes {
    MANGADEX = 'manga-dex',
    MANGALIB = 'mangalib',
    OTHER = 'other',
    READMANGA = 'readmanga',
    REMANGA = 'remanga'
}

export enum Positions {
    START = 'start',
    CENTER = 'center',
    END = 'end'
}

export enum Justifies {
    START = 'start',
    CENTER = 'center',
    END = 'end',
    SPACE_BETWEEN = 'space-between'
}

export enum Directions {
    ROW = 'row',
    COLUMN = 'column'
}

export enum NavTabs {
    GENERAL = 'general',
    LIBRARY = 'library',
    PROFILE = 'profile'
}

export enum CardTypes {
    MANGA = 'manga',
    READLISTS = 'readlists',
    READLIST = 'readlist',
    FAVORITE = 'favorite',
    RECENT = 'recent',
    SIMILAR = 'similar'
}

export enum LinkThemes {
    DEFAULT = 'default',
    PRIMARY = 'primary',
    WHITE = 'white'
}

export enum CardStates {
    DEFAULT = 'default',
    DELETE = 'delete',
    EDIT = 'edit'
}

export enum QueryParams {
    readlistId = 'readlistId',
    mangaId = 'mangaId',
    chapterId = 'chapterId'
}

export enum Conditions {
    TABS = 'tabs',
    SEARCH = 'search',
    GENERAL = 'general',
    READER = 'reader',
    MODAL = 'modal'
}

export enum Demographics {
    JOSEI = 'JOSEI',
    NOT_FILED = 'NOT_FILED',
    SEINEN = 'SEINEN',
    SHOUJO = 'SHOUJO',
    SHOUNEN = 'SHOUNEN'
}

export enum ContentRating {
    EROTICA = 'EROTICA',
    NOT_FILED = 'NOT_FILED',
    PORNOGRAPHIC = 'PORNOGRAPHIC',
    SAFE = 'SAFE',
    SUGGESTIVE = 'SUGGESTIVE'
}

export enum ChapterType {
    CONTINUOUSLY_VERTICAL = 'CONTINUOUSLY_VERTICAL',
    DEFAULT = 'DEFAULT',
    LEFT_TO_RIGHT = 'LEFT_TO_RIGHT',
    RIGHT_TO_LEFT = 'RIGHT_TO_LEFT',
    VERTICALLY = 'VERTICALLY',
    WEB_COMICS = 'WEB_COMICS'
}

export enum SortMethod {
    ASC = 'asc',
    DESC = 'desc'
}

export enum Themes {
    LIGHT = 'light',
    DARK = 'dark',
    AUTO = 'auto'
}

export enum ModalLinks {
    MAIN = '#',
    WELCOME = '#welcome',
    IN_FAVORITE = '#in-favorite',
    MANGA_DESCRIPTION = '#manga-description',
    MANGA_RATING = '#manga-rating',
    DELETE_ACCOUNT = '#delete-account'
}

export enum NotificationTypes {
    PRIMARY = 'primary',
    ERROR = 'error'
}

export enum ProfileLayoutTypes {
    LOGIN = 'login',
    REGISTER = 'register',
    RECOVERY = 'recovery',
    RECOVERY_SUCCESS = 'recovery_success'
}

export enum UserRoles {
    ADMIN,
    GUEST,
    USER
}

export interface IApi {
    getManga: (value: string) => void;
}

export type IApiCallbackResult = 'ok' | 'cancel';
export type IApiMethod = keyof IApi;

export type IApiCallback<T = string> = (
    method: IApiMethod,
    result: IApiCallbackResult,
    data: T
) => void;

export const SQUARE_ELEMENT_SIZES = ['16', '18', '20', '24', '36', '40', '44', '52'] as const;
type SquareElementSizesTuple = typeof SQUARE_ELEMENT_SIZES;
export type SquareElementSizes = SquareElementSizesTuple[number];

export interface IComment {
    id: number;
    content: string;
    createAt: Date;
    userId: number;
    likeCount: number;
    dislikeCount: number;
    isPosted?: boolean;
    isEdited?: boolean;
    isLike?: boolean;
    isDislike?: boolean;
}

export interface ITab {
    id: number;
    title: string;
}

export interface ITabExtends extends ITab {
    component: ReactElement;
}

export interface IResult {
    message: string;
    value: boolean;
}

export interface IMangaGenre {
    id: number;
    title: string;
    description?: string;
}

export interface IMangaHuman {
    id: number;
    firstname: string;
    lastname: string;
}

export interface IMangaCover {
    id: number;
    manga: number;
    uri: string;
    volume: number;
}

export interface IMangaDescription {
    id: number;
    description: string;
    lang: Lang;
}

export interface IMangaTitle {
    id: number;
    title: string;
    lang: Lang;
}

export interface ITitleLink {
    title: string;
    link: string;
}

export interface IMangaCard {
    type: 'manga';
    id: number;
    /** Путь до обложки манги */
    coverUri: string;
    /** Названия манги (на разных языках) */
    titles: IMangaTitle[];
}

export interface IManga extends IMangaCard {
    descriptions: IMangaDescription[];
    genres: IMangaGenre[];
    author: IMangaHuman;
    artist: IMangaHuman;
    rating: number;
    translator?: IMangaHuman;
    demographics: Demographics;
    contentRating: ContentRating;
}

export interface IReadlist {
    type: 'readlist';
    id: number;
    title: string;
    items: Manga[];
    alias?: CardTypes.MANGA | CardTypes.FAVORITE | CardTypes.RECENT;
}

export interface IChapter {
    id: number;
    title: string;
    date: Date;
    number: number;
    pageCount: number;
    paid: boolean;
    type: ChapterType;
    nowProgress: number;
    isAvailable: boolean;
}

export interface IChapterPage {
    id: number;
    chapter: IChapter;
    lang: Lang;
    link: string;
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    role: UserRoles;
}

interface IJWToken {
    access: string;
    accessExpiration: Date;
    refresh: string;
    refreshExpiration: Date;
    user: IUser;
}

export interface ISignInResponse {
    token: IJWToken;
}

export interface IUserModelInput {
    email: string;
    password: string;
    suspend: boolean;
}

export interface IAuthRequestInput {
    password: string;
    email: string;
}

export type TMangaFnCallback = (manga: IMangaCard) => void;

export type TClassNameCallback = (props: {
    isActive: boolean;
    isPending: boolean;
}) => string | undefined;

export interface IPageState {
    positionY: number;
}

export interface IThemeButton {
    theme: Themes;
    icon: Icons;
    text: string;
}

export interface ICatalogItemsRequest {
    items: IMangaCard[];
    hasMore: boolean;
}
