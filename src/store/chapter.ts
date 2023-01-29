import { ChapterType, IChapter } from '@types';
import { makeAutoObservable } from 'mobx';

export class Chapter implements IChapter {
    private readonly defaults: IChapter = {
        id: 0,
        title: '',
        date: new Date(),
        nowProgress: 0,
        number: 0,
        pageCount: 0,
        paid: false,
        type: ChapterType.DEFAULT,
        available: false
    };

    id: number;
    title: string;
    date: Date;
    nowProgress: number;
    number: number;
    pageCount: number;
    paid: boolean;
    type: ChapterType;
    available: boolean;

    constructor(chapter?: IChapter) {
        makeAutoObservable(this);

        let chapterData = chapter;

        if (!chapterData) {
            chapterData = this.defaults;
        }

        this.id = chapterData.id;
        this.title = chapterData.title;
        this.date = chapterData.date;
        this.nowProgress = chapterData.nowProgress;
        this.number = chapterData.number;
        this.pageCount = chapterData.pageCount;
        this.paid = chapterData.paid;
        this.type = chapterData.type;
        this.available = chapterData.available;
    }
}
