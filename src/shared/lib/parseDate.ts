type Props = string;

export const withoutTime = (date: Props) => {
    if (!date) {
        return 'не указана';
    }

    const parts = date.split('T');
    const datePart = parts[0];

    const [year, month, day] = datePart.split('-');

    return `${day}.${month}.${year}`;
};

export const withTime = (date: Props) => {
    if (!date) {
        return 'не указана';
    }

    const parts = date.split('T');
    const datePart = parts[0];
    const timePart = parts[1];

    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart.split(':');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
};
