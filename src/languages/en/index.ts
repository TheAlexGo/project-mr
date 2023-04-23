import blocks from './packages/blocks.json';
import buttons from './packages/buttons.json';
import comments from './packages/comments.json';
import errors from './packages/errors.json';
import manga from './packages/manga.json';
import modals from './packages/modals.json';
import nav from './packages/nav.json';
import pages from './packages/pages.json';
import placeholders from './packages/placeholders.json';
import profile from './packages/profile.json';
import readlists from './packages/readlists.json';
import success from './packages/success.json';
import systems from './packages/systems.json';
import tabs from './packages/tabs.json';

export default {
    ...systems,
    ...errors,
    ...comments,
    ...modals,
    ...success,
    ...placeholders,
    ...nav,
    ...manga,
    ...pages,
    ...tabs,
    ...readlists,
    ...profile,
    ...blocks,
    ...buttons
};
