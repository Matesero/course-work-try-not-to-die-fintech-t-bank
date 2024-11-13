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

export const schema = zod.object({
    phone: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine((value) => /^[1-9]\d{10}$/.test(value), {
            message: 'Некорректно набран номер',
        })
        .pipe(zod.number({ invalid_type_error: 'Номер должен быть числом' })),

    email: zod
        .string()
        .min(1, 'Поле является обязательным')
        .refine((value) => /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(value), {
            message: 'Некорректно набран email',
        }),

    password: zod.string().min(1, 'Поле является обязательным'),

    birthday: zod.string().min(1, 'Поле является обязательным'),

    name: zod.string().min(1, 'Поле является обязательным'),

    specialty: zod.string().min(1, 'Поле является обязательным'),
});

export type Schema = zod.infer<typeof schema>;
