import zod, { type ZodError } from 'zod';

export const zod2errors = (
    zodErrors: ZodError<Schema>,
): Record<string, string> => {
    const zodErrorsFormats = zodErrors.format();
    const errors: Record<string, string> = {};

    Object.entries(zodErrorsFormats).forEach(([key, value]) => {
        if ('_errors' in value && value._errors.length > 0) {
            errors[key] = value._errors[0];
        }
    });

    return errors;
};

const getAge = (dateOfBirth: Date): number => {
    const today = new Date();
    const age = today.getFullYear() - dateOfBirth.getFullYear();
    const month = today.getMonth() - dateOfBirth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < dateOfBirth.getDate())) {
        console.log(age - 1);
        return age - 1;
    }

    return age;
};

export const schema = zod.object({
    phone: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine(
            (value) =>
                /^\+[0-9] \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/.test(value),
            {
                message: 'Некорректно набран номер',
            },
        )
        .optional(),

    email: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine((value) => /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), {
            message: 'Некорректно набран email',
        })
        .optional(),

    password: zod
        .string()
        .min(1, 'Поле является обязательным')
        .min(8, 'Пароль должен состоять минимум из 8 символов')
        .refine((value) => /[0-9]/.test(value), {
            message: 'Пароль должен содержать цифры',
        })
        .optional(),

    birthday: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine(
            (value) => {
                const date = new Date(value);
                return getAge(date) >= 18;
            },
            {
                message: 'Возраст должен быть больше 18 лет',
            },
        )
        .optional(),

    patientBirthday: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine(
            (value) => {
                const date = new Date(value);
                return getAge(date) >= 0;
            },
            {
                message: 'День рождения должен быть не позже сегодняшнего дня',
            },
        )
        .optional(),

    name: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine((value) => !/[A-Za-z]/.test(value), {
            message: 'ФИО должно состоять только из русских букв',
        })
        .refine((value) => /^([А-Я][а-я]+ ){2}[А-Я][а-я]+$/.test(value), {
            message: 'Некорректно введены ФИО',
        })
        .optional(),

    speciality: zod.string().min(1, 'Поле является обязательным').optional(),

    gender: zod.string().min(1, 'Поле является обязательным').optional(),
});

export type Schema = zod.infer<typeof schema>;
