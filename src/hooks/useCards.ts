import React from 'react';

import { CardsContext } from '@store';

export const useCards = () => React.useContext(CardsContext);
