import { IMenu } from '@components/ContextMenu/types';
import { ITabContent } from '@components/Tabs/components/Tab/Tab';
import { IMenuItemCore, TMenuItemSimpleFirstData } from '@hooks/a11y/types';

export interface ITab extends IMenuItemCore {
    content: ITabContent;
}

export type TTabs = IMenu<ITab, unknown, unknown>;

export type ITabItem = TMenuItemSimpleFirstData<ITab>;
