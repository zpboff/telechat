const accessTokenKey = "TC_AC";

export const saveToken = (accessToken: string) => {
    localStorage.setItem(accessTokenKey, accessToken);
};

export const removeToken = () => {
    localStorage.removeItem(accessTokenKey);
}

export const getToken = (): string | null => localStorage.getItem(accessTokenKey);