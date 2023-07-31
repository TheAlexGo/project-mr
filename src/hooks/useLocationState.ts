import { useLocation } from 'react-router-dom';

import { IPageState } from '@types';

export const useLocationState = (): IPageState | null => {
    const { state } = useLocation();
    return state as IPageState | null;
};
