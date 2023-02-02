export const getRandomInt = (max: number, min = 0) => {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

export const getRandom = (max: number, min = 0, rounded = 2) => {
    const minValue = Math.ceil(min);
    const maxValue = Math.floor(max);
    const num = Math.random() * (maxValue - minValue + 1) + minValue;
    if (num > maxValue) {
        return maxValue;
    }
    return +num.toFixed(rounded);
};

export const getRandomDate = (): Date => {
    const today = new Date();
    const newDate = new Date(today);
    newDate.setDate(newDate.getDate() - getRandomInt(100));
    return new Date(newDate);
};
