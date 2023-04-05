import { Icons, IIcon } from '@components/Icon/Icon';

export const getIconObj = (
    icon: Icons,
    onClick: VoidFunction,
    locale: Record<string, string>
): IIcon => ({
    ariaLabel: locale[`button-${icon}-aria-label`],
    onClick,
    icon
});
