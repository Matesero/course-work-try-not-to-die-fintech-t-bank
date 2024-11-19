import zod from 'zod';

export const schema = zod
    .object({
        name: zod.string().optional(),
        conclusions: zod
            .string()
            .optional()
            .transform((value) => value?.split(';') || []),
        scheduledVisits: zod.string().optional(),
        onlyMine: zod.string().optional(),
        sorting: zod.string().optional(),
        size: zod.string().optional(),
        grouped: zod.string().optional(),
    })
    .transform((data) => {
        return Object.fromEntries(
            Object.entries(data).filter(
                ([, value]) =>
                    value !== undefined &&
                    value !== '' &&
                    value !== null &&
                    value.length > 0 &&
                    value[0] !== '',
            ),
        );
    });

export type Schema = zod.infer<typeof schema>;
