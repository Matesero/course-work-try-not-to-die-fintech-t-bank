type Props = string;

export const englishNameToRussian = (name: Props) => {
    switch (name) {
        case 'ФИО':
            return 'name';
        case 'Email':
            return 'email';
        case 'Телефон':
            return 'phone';
        case 'Дата рождения':
            return 'birthday';
        case 'Пароль':
            return 'password';
        case 'Пол':
            return 'gender';
        case 'Специальность':
            return 'specialty';
        default:
            return undefined;
    }
};
