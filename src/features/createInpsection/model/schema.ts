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

    treatment: zod.string().optional(),

    nextVisitDate: zod.string().optional(),

    deathDate: zod.string().optional(),

    previousInspectionId: zod
        .string()
        .min(1, 'Поле является обязательным')
        .optional(),

    conclusion: zod.string().min(1, 'Поле является обязательным').optional(),
});

export type Schema = zod.infer<typeof schema>;
