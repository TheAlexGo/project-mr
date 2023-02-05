import { createContext } from 'react';

import { makeAutoObservable } from 'mobx';

export class CardsStore {
    isDeleting = false;
    isEditing = false;

    constructor() {
        makeAutoObservable(this);
    }

    cancelEvent = () => {
        if (this.isDeleting) {
            this.setIsDeleting(false);
        }
        if (this.isEditing) {
            this.setIsEditing(false);
        }
    };

    setIsDeleting = (isDeleting: boolean) => {
        this.isDeleting = isDeleting;
    };

    setIsEditing = (isEditing: boolean) => {
        this.isEditing = isEditing;
    };
}

export const cardsStore = new CardsStore();
export const CardsContext = createContext<CardsStore>(cardsStore);
