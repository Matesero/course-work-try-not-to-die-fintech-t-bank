type Props = string;

const russianToEnglishMap: Record<string, string> = {
    ФИО: 'name',
    Имя: 'name',
    Email: 'email',
    Телефон: 'phone',
    'Дата рождения': 'birthday',
    Пароль: 'password',
    Пол: 'gender',
    Специальность: 'specialty',
    'Имеющиеся заключения': 'conclusions',
    'Только мои': 'onlyMine',
    'Есть запланированные визиты': 'scheduledVisits',
    'Число пациентов на странице': 'size',
    'Число консультаций на странице': 'size',
    'Число осмотров на странице': 'size',
    'Сортировка пациентов': 'sorting',
    'Сгруппировать по повторным': 'grouped',
    'Показать все': 'grouped',
};

export const russianToEnglish = (name: Props): string | undefined => {
    return russianToEnglishMap[name];
};
