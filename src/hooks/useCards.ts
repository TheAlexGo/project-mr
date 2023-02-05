import React from 'react';

import { CardsContext } from '@store/card';

export const useCards = () => React.useContext(CardsContext);
