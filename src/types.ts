import {
    CSSProperties,
    FunctionComponent,
    InputHTMLAttributes,
    MouseEventHandler,
    ReactElement,
    ReactNode
} from 'react';

import { IButton } from '@components/Button/Button';

export enum Lang {
    RUSSIAN = 'RUSSIAN',
    ENGLISH = 'ENGLISH'
}

export enum Links {
    LIBRARY = 'library',
    MANGA = 'manga',
    READLIST = 'readlist',
    PROFILE = 'profile',
    LOGIN = 'login',
    REGISTER = 'register',
    RECOVERY = 'recovery',
    RECOVERY_SUCCESS = 'success',
    CHAPTER = 'chapter',
    READER = 'reader',
    SEARCH = 'search',
    GENERAL = '',
    NOT_FOUND = 'not-found'
}

export enum SourceTypes {
    MANGADEX = 'manga-dex',
    MANGALIB = 'mangalib',
    OTHER = 'other',
    READMANGA = 'readmanga',
    REMANGA = 'remanga'
}

export enum Positions {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center'
}

export enum FlexPositions {
    LEFT = 'left',
    RIGHT = 'right',
    CENTER = 'center',
    SPACE_BETWEEN = 'space-between'
}

export enum Nav {
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

export enum HeaderTypes {
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6'
}

export enum HeaderButtons {
    MORE = 'more',
    SEARCH = 'search',
    ADD = 'add',
    TRASH = 'trash',
    BELL = 'bell'
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
    DARK = 'dark'
}

export enum ModalLinks {
    MAIN = '#',
    WELCOME = '#welcome',
    IN_FAVORITE = '#in-favorite',
    MANGA_DESCRIPTION = '#manga-description',
    MANGA_RATING = '#manga-rating'
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

export type IApiCallback<T = string> = (method: IApiMethod, result: IApiCallbackResult, data: T) => void;

export type VoidFunction = () => void;

export type ButtonSizes = '24' | '36' | '40' | '52' | 'default';

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
    manga: number;
    langEnum: Lang;
}

export interface IMangaTitle {
    id: number;
    title: string;
    manga: number;
    langEnum: Lang;
}

export interface ITitleLink {
    title: string;
    link: string;
}

export interface IMangaCard {
    id: number;
    coverUri: string;
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
    sources?: ITitleLink[];
    whereBuy?: ITitleLink[];
}

export interface INavData {
    id: Nav;
    icon: FunctionComponent | string;
    title: string;
    link: string;
}

export interface IIcon extends IButton {
    onActive?: VoidFunction;
    onInactive?: VoidFunction;
    isComplex?: boolean;
}

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
    /** Функция валидации */
    validator?: (value: string) => IResult;
    /** Функция обратного вызова */
    onNewValue?: (value: string) => void;
    /** Проверяет, прошло ли поле валидацию */
    isCheck?: boolean;
    showErrorBlock?: boolean;
}

export interface IHeaderButton extends IIcon {
    headerType: HeaderButtons;
}

export interface IModal {
    heading?: string;
    children?: ReactNode;
    className?: string;
    showCloseButton?: boolean;
    withEasyClose?: boolean;
    classNameOverlay?: string;
    isFullScreen?: boolean;
    isOpacity?: boolean;
}

export interface ICard {
    link: string;
    title: string;
    image: ReactNode;
    alignCenter?: boolean;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    children?: ReactNode;
    style?: CSSProperties;
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
    available: boolean;
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
    suspend: boolean;
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
