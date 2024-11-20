export const setToken = (token: string) => {
    document.cookie = `jwt=${token}; path=/; Secure; HttpsOnly; SaseSite=Strict`;
};

export const removeToken = () => {
    document.cookie = 'jwt=; max-age=0; path=/;';
};

export const getToken = () => {
    const cookies = document.cookie.split('; ').reduce(
        (acc, currentCookie) => {
            const [name, value] = currentCookie.split('=');
            acc[name] = value;
            return acc;
        },
        {} as Record<string, string>,
    );

    return cookies.jwt || null;
};

export const checkToken = () => {
    return !!getToken();
};
