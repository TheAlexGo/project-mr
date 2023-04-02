/* eslint-disable @typescript-eslint/no-unused-vars */
import UUID from 'uuid-int';

import Covers from '@images';
import {
    ChapterType,
    ContentRating,
    Demographics,
    IChapter,
    IComment,
    IManga,
    IMangaCard,
    IMangaDescription,
    IMangaGenre,
    IMangaHuman,
    IMangaTitle,
    IUser,
    Lang,
    SourceTypes,
    UserRoles
} from '@types';
import { getRandom, getRandomDate, getRandomInt } from '@utils/numbers';

function generateArray<T>(fn: (index: number) => T, count: number): Array<T> {
    return Array.from(Array(count).keys()).map(fn);
}

const uuidGenerator = UUID(0);
const languages = Object.values(Lang);

interface IMockMangaTitle {
    lang: Lang;
    titles: string[];
}

const mangaTitlesRu = [
    'У коми проблемы с общением',
    'Аюму все равно станет ближе',
    'Магическая битва',
    'Поднятие уровня в одиночку',
    'Начало после конца',
    'Пик боевых искусств',
    'Всеведущий читатель',
    'Пламя бесчисленных невзгод',
    'Ранкер, который живёт второй раз',
    'Прирожденный наёмник',
    'Милый дом',
    'Ублюдок FFF-ранга',
    'Архимаг, который вернулся спустя 4000 лет'
];

const mangaTitlesEn = ['Test 123', 'Abobus test'];

const mangaTitles: IMockMangaTitle[] = languages.map((lang: Lang) => {
    const obj: IMockMangaTitle = {
        titles: [],
        lang
    };
    switch (lang) {
        case Lang.RUSSIAN:
            obj.titles = mangaTitlesRu;
            break;
        case Lang.ENGLISH:
            obj.titles = mangaTitlesEn;
            break;
    }
    return obj;
});

const mangaDescriptions = [
    'У Ён У был брат-близнец, который исчез пять лет назад. Однажды ему пришла посылка – часы его брата. В них Ён У обнаружил дневник брата... И он начинался со слов «Если ты это читаешь, то я скорее всего уже мёртв...» Обелиск, Башня Бога Солнца, мир, где пересекаются несколько вселенных и измерений. В этом мире его брат стал жертвой предательства во время восхождения на башню. Узнав правду, Ён У решил взобраться на башню вместе с дневником своего брата.',
    'На основе одноименного романа. Путь на вершину боевых искусств - путь одинокий и длинный. Перед лицом невзгод ты должен оставаться сильным и неотступным. Только тогда ты сможешь преодолеть все препятствия и стать по-настоящему сильным. Небесная Башня обучает своих учеников самым суровым образом, чтобы они могли выстоять в мире боевых искусств. Но только из-за одного самого незначительного проступка наш главный герой, Янг Кай, может быть исключен из Небесной Башни.',
    '«Я собираюсь прожить всю оставшуюся жизнь с Айрин!»\n' +
        '«...Что?»\n' +
        '«Я сказала, что не выйду замуж и проведу остаток жизни с Айрин!»\n' +
        'Жаль, мне не послышалось. К сожалению, я не могу остановить Клодию.\n' +
        '«Пока у меня есть Айрин, мне больше ничего не нужно!»\n' +
        'Трое мужчин переглянусь, а затем сердито уставились на меня.\n' +
        'Одержимый до безумия наследник, улыбающийся герцог, таящий в душе нечто злое, и холодные глаза рыцаря, от чьего взгляда мурашки по коже. Они словно считают меня соперницей.\n' +
        '«Твою мать. Как так вышло?»',
    'По стандарту любого фэнтези романа, главная героиня Литтера попадает в мир новеллы. Для того, чтобы обрести счастливую жизнь, она предлагает Великому Герцогу северных земель заключить брак по договору. В представлении Литтеры герцог казался красивым молодым человеком с прекрасным характером, однако... на самом деле у него косматая борода, огромные шрамы по всему телу и яростный взгляд... "Когда фэнтези роман успел превратиться в новеллу о боевых искусствах?!" Интересно, сможет ли Литтера обрести свое счастье в этом непростом романе?\n',
    '«После целой ночи крепкого пьянства я оказалась внутри романа в теле злодейки — Императрицы Юлии, которую через три дня должны были казнить за измену.»\n' +
        '\n' +
        'Эта история о трудоголике, которая живет в теле правительницы и пытается предотвратить все жестокие события. Сможет ли она стать хорошей и мудрой императрицей?\n' +
        '\n' +
        'Так и начинается царствование Императрицы Юлии — кроткой снаружи, но железной внутри.',
    'Эта история создана художником Джемихальтги, она рассказывает про спецназовца Республики Корея Кан И-чана. Во время операции он отвлекает противника, чтобы помочь товарищам. "Прошло несколько дней с тех пор, как я столкнулся с врагом, теперь я не могу нормально спать в ожидании спасения…" Наконец, увидев летящий над холмом снаряд базуки, он понял, что это его конец, и сдался.',
    'Элоиз Вайана, Великая герцогиня Севера, была казнена императором Кайеном Хелисис, после того как стало известно, что в тайне она всё это время была злодейкой…\n' +
        'Так закончился второй сезон популярной веб-новеллы "Корона крови." Будучи одним из заядлых читателей, Ким Дакьюнг с нетерпением ждёт следующего сезона, когда её по пути домой внезапно сбивает грузовик! Но, проснувшись, она обнаруживает себя в теле этой самой Великой герцогини до начала истории, описываемой в новелле. Уже зная, какой путь уготовлен Элоиз, Дакьюнг отчаянно стремится изменить свою судьбу и дожить до третьего сезона. К счастью, молодая версия Кайена падает к ней прямо в руки, и Великая герцогиня Ким сделает всё, что потребуется, чтобы удержать его на своей стороне.',
    'Коми-сан настолько красива и очаровательна, что никто не может отвести от неё взгляд. Почти вся школа считает её холодной красавицей, но Тадано Хитохито знает правду: на самом деле Коми-сан испытывает большие неудобства при общении с людьми. Коми-сан желает избавиться от этой плохой привычки, а Тадано-кун поможет ей в этом.'
];
const mangaTypes = Object.values(SourceTypes);
const mangaCovers = Covers;
const mangaGenres = [
    'В цвете',
    'Демоны',
    'Медицина',
    'Культивация',
    'Магия',
    'Призраки / Духи',
    'Боги',
    'Алхимия',
    'Артефакты',
    'Борьба за власть',
    'Волшебные существа',
    'ГГ мужчина',
    'Ранги силы',
    'Жестокий мир',
    'Завоевание мира',
    'Космос',
    'Навыки / способности',
    'Насилие / жестокость',
    'Подземелья',
    'ГГ имба',
    'Умный ГГ',
    'Прокачка',
    'Боевик',
    'Боевые искусства',
    'Гарем',
    'Элементы юмора',
    'Приключения',
    'Романтика',
    'Сверхъестественное',
    'Фантастика',
    'Фэнтези'
];
const mangaAuthorsFirstnames = ['Александр', 'Николай', 'Дмитрий', 'Глафира', 'Фёдор', 'Марина'];
const mangaAuthorsLastnames = ['Гордеев', 'Никоноров', 'Сохин', 'Зайцева', 'Петров', 'Михайлова'];
const usernames = [
    'Aboba123',
    'TheAlexGo',
    'SuperPivo2007',
    '1337_PapeyGovna_228',
    'MegaDownBreaker',
    'JoPa_VaShEy_MaMi'
];

export const getRandomOfArray = <T>(arr: Array<T>): T => arr[getRandomInt(arr.length - 1)];

export const getFirstnameMock = (): string =>
    mangaAuthorsFirstnames[getRandomInt(mangaAuthorsFirstnames.length - 1)];

export const getLastnameMock = (): string =>
    mangaAuthorsLastnames[getRandomInt(mangaAuthorsLastnames.length - 1)];

export const getHumanMock = (): IMangaHuman =>
    generateArray<IMangaHuman>(
        () => ({
            id: uuidGenerator.uuid(),
            firstname: getFirstnameMock(),
            lastname: getLastnameMock()
        }),
        1
    )[0];

export const getMangaTitleMock = (): string =>
    mangaTitlesRu[getRandomInt(mangaTitlesRu.length - 1)];

export const getMangaTitleOfLangMock = (lang: Lang): string => {
    const currentTitles = mangaTitles.find((titles) => titles.lang === lang);
    if (!currentTitles) {
        return getMangaTitleMock();
    }
    return getRandomOfArray(currentTitles.titles);
};

export const getMangaTitlesMock = (count: number): IMangaTitle[] => {
    const mangaTitles = generateArray<IMangaTitle>(() => {
        const lang = getRandomOfArray<Lang>(languages);
        return {
            id: uuidGenerator.uuid(),
            title: getMangaTitleOfLangMock(lang),
            lang
        };
    }, count);
    mangaTitles.push({
        id: uuidGenerator.uuid(),
        title: getMangaTitleOfLangMock(Lang.RUSSIAN),
        lang: Lang.RUSSIAN
    });
    return mangaTitles;
};

export const getMangaDescriptionsMock = (count: number): IMangaDescription[] =>
    generateArray<IMangaDescription>(
        () => ({
            id: uuidGenerator.uuid(),
            description: getMangaTitleMock(),
            lang: Lang.RUSSIAN
        }),
        count
    );

export const getMangaGenresMock = (count: number): IMangaGenre[] =>
    generateArray<IMangaGenre>(
        () => ({
            id: uuidGenerator.uuid(),
            title: mangaGenres[getRandomInt(mangaGenres.length - 1)],
            description: ''
        }),
        count
    );

export const getCoversMock = (): string[] => mangaCovers;

export const getCoverMock = (): string => getRandomOfArray(mangaCovers);

export const getMangaCardsMock = (count: number): IMangaCard[] =>
    generateArray<IMangaCard>(
        () => ({
            type: 'manga',
            id: uuidGenerator.uuid(),
            titles: getMangaTitlesMock(getRandomInt(5, 1)),
            coverUri: getCoverMock()
        }),
        count
    );

export const getMangaCardMock = (): IMangaCard => getMangaCardsMock(1)[0];

export const getMangaListMock = (count: number, id?: number): IManga[] =>
    generateArray<IManga>(
        () => ({
            type: 'manga',
            id: id || uuidGenerator.uuid(),
            titles: getMangaTitlesMock(getRandomInt(5, 1)),
            descriptions: getMangaDescriptionsMock(getRandomInt(5, 1)),
            coverUri: mangaCovers[getRandomInt(mangaCovers.length - 1)],
            genres: getMangaGenresMock(getRandomInt(10, 1)),
            author: getHumanMock(),
            artist: getHumanMock(),
            demographics: Demographics.JOSEI,
            contentRating: ContentRating.EROTICA,
            rating: getRandom(5)
        }),
        count
    );

export const getMangaMock = (id?: number): IManga => getMangaListMock(1, id)[0];

export const getChaptersMock = (
    count: number,
    id?: number,
    pageCount: number = getRandomInt(20)
): IChapter[] =>
    generateArray<IChapter>(
        (index) => ({
            id: id || uuidGenerator.uuid(),
            title: getRandomOfArray(mangaTitlesRu),
            date: new Date(),
            number: index + 1,
            pageCount,
            paid: false,
            type: ChapterType.DEFAULT,
            available: !!getRandomInt(1),
            nowProgress: getRandomInt(pageCount)
        }),
        count
    );
export const getChapterMock = (id?: number, pageCount?: number): IChapter =>
    getChaptersMock(1, id, pageCount)[0];

export const getCommentsMock = (count: number): IComment[] =>
    generateArray<IComment>(
        () => ({
            id: uuidGenerator.uuid(),
            content: getRandomOfArray(mangaTitlesRu),
            createAt: getRandomDate(),
            userId: getRandomInt(100),
            likeCount: getRandomInt(0),
            dislikeCount: getRandomInt(0)
        }),
        count
    );

export const getCommentMock = (): IComment => getCommentsMock(1)[0];

const getReadlistName = (index: number) => `Мой ридлист №${index}`;

export const getUsersMock = (count: number): IUser[] =>
    generateArray<IUser>(
        () => ({
            id: uuidGenerator.uuid(),
            username: getRandomOfArray(usernames),
            email: 'alex280702@mail.ru',
            role: UserRoles.USER,
            suspend: false
        }),
        count
    );

export const getUserMock = (): IUser => getUsersMock(1)[0];
