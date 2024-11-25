import zod from 'zod';

export const schema = zod
    .object({
        start: zod.string().optional(),
        end: zod.string().optional(),
        name: zod.string().optional(),
        conclusions: zod
            .string()
            .optional()
            .transform((value) => value?.split(';') || []),
        icdRoots: zod
            .string()
            .optional()
            .transform((value) => value?.split(';') || []),
        scheduledVisits: zod.string().optional(),
        onlyMine: zod.string().optional(),
        sorting: zod.string().optional(),
        size: zod.string().optional(),
        grouped: zod.string().optional(),
    })

    .refine(
        (data) => {
            if (!data.start || !data.end) {
                return true;
            }
            const startDate = new Date(data.start);
            const endDate = new Date(data.end);

            return endDate >= startDate;
        },
        {
            message: 'End date must be after or equal to start date.',
            path: ['endDate'],
        },
    )

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
