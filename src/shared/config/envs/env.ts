const getEnvVar = (key: string) => {
    if (import.meta.env[key] === undefined) {
        throw new Error(`Env ${key} отсутствует`);
    }

    return import.meta.env[key] || '';
};

export const MEDICAL_SYSTEM_HOST = getEnvVar('VITE_MEDICAL_SYSTEM_API_HOST');
