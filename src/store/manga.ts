import { store } from './index';

import { makeAutoObservable } from 'mobx';

import { getMangaListMock } from '@mock';
import {
    ContentRating,
    Demographics,
    IManga,
    IMangaDescription,
    IMangaGenre,
    IMangaHuman,
    IMangaTitle
} from '@types';

export class Manga implements IManga {
    private readonly defaults: IManga = {
        id: 0,
        titles: [],
        descriptions: [],
        author: {
            id: 0,
            firstname: '',
            lastname: ''
        },
        artist: {
            id: 0,
            firstname: '',
            lastname: ''
        },
        contentRating: ContentRating.NOT_FILED,
        coverUri: '',
        demographics: Demographics.NOT_FILED,
        genres: [],
        rating: 0
    };

    id: number;
    titles: IMangaTitle[];
    descriptions: IMangaDescription[];
    author: IMangaHuman;
    artist: IMangaHuman;
    translator?: IMangaHuman;
    contentRating: ContentRating;
    coverUri: string;
    demographics: Demographics;
    genres: IMangaGenre[];
    rating: number;

    constructor(manga?: IManga) {
        makeAutoObservable(this);
        let mangaData = manga;

        if (!mangaData) {
            mangaData = this.defaults;
        }

        this.id = mangaData.id;
        this.titles = mangaData.titles;
        this.descriptions = mangaData.descriptions;
        this.author = mangaData.author;
        this.artist = mangaData.artist;
        this.contentRating = mangaData.contentRating;
        this.coverUri = mangaData.coverUri;
        this.demographics = mangaData.demographics;
        this.genres = mangaData.genres;
        this.rating = mangaData.rating;
    }

    init(manga: IManga) {
        Object.assign(this, manga);
    }

    get similar(): Manga[] {
        return getMangaListMock(7).map((manga) => new Manga(manga));
    }
}
