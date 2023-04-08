import React from 'react';

import { ButtonStates, ButtonThemes } from '@components/Button/Button';
import { Icon, Icons } from '@components/Icon/Icon';
import { Justifies } from '@types';

export const getButtonSecondaryHoverProps = () => ({
    theme: ButtonThemes.SECONDARY,
    state: ButtonStates.HOVER,
    isWide: true
});

export const getButtonWithArrowProps = () => ({
    ...getButtonSecondaryHoverProps(),
    contentJustify: Justifies.SPACE_BETWEEN,
    icon: <Icon icon={Icons.ARROW_RIGHT} ariaLabel={null} isNotButton />,
    withRightIcon: true
});
