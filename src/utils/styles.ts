export const getSizesClass = (classes: Record<string, string>, size?: string) => ({
    [classes[`__size-s${size}`]]: !!size
});
