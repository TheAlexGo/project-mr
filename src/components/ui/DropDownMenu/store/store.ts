import { useContext, useRef, useState } from 'react';

import { Context } from './context';

export interface IOptions {
    /**
     * Открыть окно после фокуса на кнопку?
     */
    openMenuAfterFocus?: boolean;
    /**
     * Закрыть окно после нажатия на Escape?
     */
    closeByEscape?: boolean;
    /**
     * Закрыть окно, если фокус пропал с элементов, принадлежащих меню?
     */
    closeMenuAfterBlur?: boolean;
    /**
     * Закрыть окно после выбора элемента?
     */
    closeMenuAfterSelect?: boolean;
    /**
     * Сфокусироваться на активный элемент после открытия меню?
     */
    focusToActiveElementAfterOpen?: boolean;
    /**
     * Сфокусироваться на кнопке после закрытия окна?
     */
    focusToButtonAfterClose?: boolean;
    /**
     * Сфокусироваться на кнопке после выбора элемента? По-умолчанию false, так как эту же роль исполняет focusToButtonAfterClose.
     * Но если focusToButtonAfterClose не включен, то смотрится это свойство.
     */
    focusToButtonAfterSelect?: boolean;
}

const defaultOptions: IOptions = {
    openMenuAfterFocus: false,
    closeByEscape: true,
    closeMenuAfterBlur: true,
    closeMenuAfterSelect: true,
    focusToActiveElementAfterOpen: true,
    focusToButtonAfterClose: true,
    focusToButtonAfterSelect: false
};

export const useDropDownStore = (_options = defaultOptions) => {
    const options: IOptions = {
        ...defaultOptions,
        ..._options
    };

    /** Ссылка на корневой контейнер меню (DropDownMenu) */
    const containerRef = useRef<HTMLDivElement | null>(null);
    /** Ссылка на элемент кнопки меню (DropDownMenu.Button) */
    const buttonRef = useRef<HTMLElement | null>(null);
    /** Ссылка на элемент контейнера выпадающего меню (DropDownMenu.Menu) */
    const menuRef = useRef<HTMLElement | null>(null);
    /** Состояние окна: открыто/закрыто */
    const [isOpen, setIsOpen] = useState(false);

    return {
        options,
        containerRef,
        buttonRef,
        menuRef,
        isOpen,
        setIsOpen
    };
};

export const useStore = () => useContext(Context);
