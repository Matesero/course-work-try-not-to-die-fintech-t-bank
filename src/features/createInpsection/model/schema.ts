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
        return age - 1;
    }

    return age;
};

const isBeforeOrEqualToday = (date: string | undefined): boolean => {
    if (!date) {
        return true;
    }
    const today = new Date();
    const inputDate = new Date(date);
    return inputDate <= today;
};

const isAfterOrEqualTomorrow = (date: string | undefined): boolean => {
    if (!date) {
        return true;
    }
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const inputDate = new Date(date);
    return inputDate >= tomorrow;
};

export const schema = zod.object({
    date: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine(
            (value) => {
                const date = new Date(value);
                return getAge(date) >= 0;
            },
            {
                message: 'Осмотр не может быть позже сегодняшнего дня',
            },
        )
        .optional(),

    complaints: zod.string().min(1, 'Поле является обязательным').optional(),

    anamnesis: zod.string().min(1, 'Поле является обязательным').optional(),

    treatment: zod.string().min(1, 'Поле является обязательным').optional(),

    nextVisitDate: zod
        .string()
        .min(1, 'Поле является обязательным')
        .optional()
        .refine((value) => isAfterOrEqualTomorrow(value), {
            message: 'Дата следующего осмотра должна быть завтра или позже',
        }),

    deathDate: zod
        .string()
        .min(1, 'Поле является обязательным')
        .optional()
        .refine((value) => isBeforeOrEqualToday(value), {
            message: 'Дата смерти должна быть до сегодняшнего дня включительно',
        }),

    previousInspectionId: zod
        .string()
        .min(1, 'Поле является обязательным')
        .optional(),

    conclusion: zod.string().min(1, 'Поле является обязательным').optional(),
});

export type Schema = zod.infer<typeof schema>;
