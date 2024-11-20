type Props = string;

const englishToRussianMap: Record<string, string> = {
    Death: 'смерть',
    Recovery: 'выздоровление',
    Disease: 'болезнь',
    Male: 'Мужчина',
    Female: 'Женщина',
    Main: 'Основной',
    Concomitant: 'Сопутствующий',
    Complication: 'Осложнение',
};

export const englishToRussian = (name: Props): string => {
    return englishToRussianMap[name] || 'Нет данных';
};
