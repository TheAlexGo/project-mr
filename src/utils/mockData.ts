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
    return Array.from(Array(count).keys()).map<T>(fn);
}

const uuidGenerator = UUID(0);
const languages = Object.values(Lang);

interface IMockMangaTitle {
    lang: Lang;
    titles: string[];
}

interface IMockMangaDescription {
    lang: Lang;
    descriptions: string[];
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

const mangaTitlesEn = [
    'Komi have communication problems',
    'Ayumu will get closer anyway',
    'Magic Battle',
    'Level Up Alone',
    'Beginning after the end',
    'Peak of martial arts',
    'Omniscient Reader',
    'The Flame of Countless Troubles',
    'Ranker who lives a second time',
    'Born Mercenary',
    'Sweet home',
    'FFF-rank bastard',
    'The archmage who returned after 4000 years'
];

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

const mangaDescriptionsRu = [
    'У Ён У был брат-близнец, который исчез пять лет назад. Однажды ему пришла посылка – часы его брата. В них Ён У обнаружил дневник брата... И он начинался со слов «Если ты это читаешь, то я скорее всего уже мёртв...» Обелиск, Башня Бога Солнца, мир, где пересекаются несколько вселенных и измерений. В этом мире его брат стал жертвой предательства во время восхождения на башню. Узнав правду, Ён У решил взобраться на башню вместе с дневником своего брата.',
    'На основе одноименного романа. Путь на вершину боевых искусств - путь одинокий и длинный. Перед лицом невзгод ты должен оставаться сильным и неотступным. Только тогда ты сможешь преодолеть все препятствия и стать по-настоящему сильным. Небесная Башня обучает своих учеников самым суровым образом, чтобы они могли выстоять в мире боевых искусств. Но только из-за одного самого незначительного проступка наш главный герой, Янг Кай, может быть исключен из Небесной Башни.',
    '«Я собираюсь прожить всю оставшуюся жизнь с Айрин!»\n«...Что?»\n«Я сказала, что не выйду замуж и проведу остаток жизни с Айрин!»\nЖаль, мне не послышалось. К сожалению, я не могу остановить Клодию.\n«Пока у меня есть Айрин, мне больше ничего не нужно!»\nТрое мужчин переглянусь, а затем сердито уставились на меня.\nОдержимый до безумия наследник, улыбающийся герцог, таящий в душе нечто злое, и холодные глаза рыцаря, от чьего взгляда мурашки по коже. Они словно считают меня соперницей.\n«Твою мать. Как так вышло?»',
    'По стандарту любого фэнтези романа, главная героиня Литтера попадает в мир новеллы. Для того, чтобы обрести счастливую жизнь, она предлагает Великому Герцогу северных земель заключить брак по договору. В представлении Литтеры герцог казался красивым молодым человеком с прекрасным характером, однако... на самом деле у него косматая борода, огромные шрамы по всему телу и яростный взгляд... "Когда фэнтези роман успел превратиться в новеллу о боевых искусствах?!" Интересно, сможет ли Литтера обрести свое счастье в этом непростом романе?\n',
    '«После целой ночи крепкого пьянства я оказалась внутри романа в теле злодейки — Императрицы Юлии, которую через три дня должны были казнить за измену.»\nЭта история о трудоголике, которая живет в теле правительницы и пытается предотвратить все жестокие события. Сможет ли она стать хорошей и мудрой императрицей?\nТак и начинается царствование Императрицы Юлии — кроткой снаружи, но железной внутри.',
    'Эта история создана художником Джемихальтги, она рассказывает про спецназовца Республики Корея Кан И-чана. Во время операции он отвлекает противника, чтобы помочь товарищам. "Прошло несколько дней с тех пор, как я столкнулся с врагом, теперь я не могу нормально спать в ожидании спасения…" Наконец, увидев летящий над холмом снаряд базуки, он понял, что это его конец, и сдался.',
    'Элоиз Вайана, Великая герцогиня Севера, была казнена императором Кайеном Хелисис, после того как стало известно, что в тайне она всё это время была злодейкой…\nТак закончился второй сезон популярной веб-новеллы "Корона крови." Будучи одним из заядлых читателей, Ким Дакьюнг с нетерпением ждёт следующего сезона, когда её по пути домой внезапно сбивает грузовик! Но, проснувшись, она обнаруживает себя в теле этой самой Великой герцогини до начала истории, описываемой в новелле. Уже зная, какой путь уготовлен Элоиз, Дакьюнг отчаянно стремится изменить свою судьбу и дожить до третьего сезона. К счастью, молодая версия Кайена падает к ней прямо в руки, и Великая герцогиня Ким сделает всё, что потребуется, чтобы удержать его на своей стороне.',
    'Коми-сан настолько красива и очаровательна, что никто не может отвести от неё взгляд. Почти вся школа считает её холодной красавицей, но Тадано Хитохито знает правду: на самом деле Коми-сан испытывает большие неудобства при общении с людьми. Коми-сан желает избавиться от этой плохой привычки, а Тадано-кун поможет ей в этом.'
];

const mangaDescriptionsEn = [
    "Yeon-woo had a twin brother who disappeared five years ago. One day he received a package - his brother's watch. In them, Yeon-woo found his brother's diary... And it began with the words \"If you are reading this, then I'm most likely already dead...\" Obelisk, the Tower of the Sun God, a world where several universes and dimensions intersect. In this world, his brother was betrayed while climbing the tower. Upon learning the truth, Yeon-woo decided to climb the tower along with his brother's diary.",
    'Based on the novel of the same name. The path to the top of martial arts is a lonely and long path. In the face of adversity, you must remain strong and relentless. Only then can you overcome all obstacles and become truly strong. Sky Tower trains its students in the harshest way so that they can endure in the world of martial arts. But just because of one very minor transgression, our protagonist, Yang Kai, can be expelled from the Sky Tower.',
    `"I'm going to live the rest of my life with Irene!"\n"...What?"\n“I said I would not marry and spend the rest of my life with Irene!”\nI'm sorry I didn't hear it. Unfortunately, I can't stop Claudia.\n"As long as I have Irene, I don't need anything else!"\nThe three men look at each other and then glare at me angrily.\nAn heir obsessed to the point of madness, a smiling duke who harbors something evil in his soul, and the cold eyes of a knight, from whose gaze goosebumps. They seem to consider me a rival.\n“Your mother. How did it happen?`,
    'By the standard of any fantasy novel, Litter\'s main character enters the world of the novel. In order to find a happy life, she invites the Grand Duke of the northern lands to enter into an arranged marriage. In Littera\'s imagination, the duke seemed to be a handsome young man with a great personality, however... in fact, he has a shaggy beard, huge scars all over his body and a fierce look... "When did a fantasy novel turn into a martial arts novel?!" I wonder if Littera will be able to find her happiness in this difficult romance?',
    '“After a whole night of heavy drinking, I found myself inside the novel in the body of the villainess - Empress Julia, who was to be executed three days later for treason.”\nThis story is about a workaholic who lives in the body of a ruler and tries to prevent all cruel events. Can she become a good and wise empress?\nThus begins the reign of Empress Julia - meek on the outside, but iron on the inside.',
    'Created by artist Jemikhaltgi, this story is about Kang Yi-chan, a commando of the Republic of Korea. During the operation, he distracts the enemy to help his comrades. "It\'s been a few days since I faced the enemy, now I can\'t sleep properly while waiting for rescue..." Finally, seeing a bazooka projectile flying over the hill, he realized that this was his end and surrendered.',
    'Eloise Vaiana, Grand Duchess of the North, was executed by Emperor Caien Helisis after it was revealed that she had secretly been a villainess all along...\nThus ended the second season of the popular web novel "Crown of Blood." As an avid reader, Kim Dakyung is looking forward to next season when she is suddenly hit by a truck on her way home! But, waking up, she finds herself in the body of this very Grand Duchess before the beginning of the story described in the novel. Already knowing what path Eloise has in store for her, Dakyung is desperate to change his fate and live to see the third season. Luckily, a young version of Cayenne falls right into her arms, and Grand Duchess Kim will do whatever it takes to keep him by her side.',
    'Komi-san is so beautiful and charming that no one can take their eyes off her. Almost the entire school considers her a cold beauty, but Tadano Hitohito knows the truth: in fact, Komi-san is very uncomfortable when communicating with people. Komi-san wants to get rid of this bad habit, and Tadano-kun will help her in this.'
];

const mangaDescriptions: IMockMangaDescription[] = languages.map((lang: Lang) => {
    const obj: IMockMangaDescription = {
        descriptions: [],
        lang
    };
    switch (lang) {
        case Lang.RUSSIAN:
            obj.descriptions = mangaDescriptionsRu;
            break;
        case Lang.ENGLISH:
            obj.descriptions = mangaDescriptionsEn;
            break;
    }
    return obj;
});

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
const usernames = ['TheAlexGo', 'SuperPivo2007', 'MegaDownBreaker'];

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

export const getMangaDescriptionMock = (): string =>
    mangaDescriptionsRu[getRandomInt(mangaTitlesRu.length - 1)];

export const getMangaTitleOfLangMock = (lang: Lang): string => {
    const currentTitles = mangaTitles.find((titles) => titles.lang === lang);
    if (!currentTitles) {
        return getMangaTitleMock();
    }
    return getRandomOfArray(currentTitles.titles);
};

export const getMangaDescriptionOfLangMock = (lang: Lang): string => {
    const currentDescriptions = mangaDescriptions.find((titles) => titles.lang === lang);
    if (!currentDescriptions) {
        return getMangaDescriptionMock();
    }
    return getRandomOfArray(currentDescriptions.descriptions);
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
    mangaTitles.push({
        id: uuidGenerator.uuid(),
        title: getMangaTitleOfLangMock(Lang.ENGLISH),
        lang: Lang.ENGLISH
    });
    return mangaTitles;
};

export const getMangaDescriptionsMock = (count: number): IMangaDescription[] => {
    const mangaDescriptions = generateArray<IMangaDescription>(() => {
        const lang = getRandomOfArray<Lang>(languages);
        return {
            id: uuidGenerator.uuid(),
            description: getMangaDescriptionOfLangMock(lang),
            lang
        };
    }, count);
    mangaDescriptions.push({
        id: uuidGenerator.uuid(),
        description: getMangaDescriptionOfLangMock(Lang.RUSSIAN),
        lang: Lang.RUSSIAN
    });
    mangaDescriptions.push({
        id: uuidGenerator.uuid(),
        description: getMangaDescriptionOfLangMock(Lang.ENGLISH),
        lang: Lang.ENGLISH
    });
    return mangaDescriptions;
};

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
            role: UserRoles.USER
        }),
        count
    );

export const getUserMock = (): IUser => getUsersMock(1)[0];
