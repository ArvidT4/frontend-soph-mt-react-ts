import {IProperty, IToken} from "../interfaces";

export const getLocalStorage = <T>(key: string): T | null => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
};

export const setLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key: string): void => {
    localStorage.removeItem(key);
};

export const getPropertyArrayFromSessionStorage = (): IProperty[] => {
    const data = sessionStorage.getItem('properties');
    return data ? JSON.parse(data) as IProperty[] : [];
};
export const getTokenFromSessionStorage = (): IToken|undefined => {
    const data = sessionStorage.getItem('token');
    return data ? JSON.parse(data) as IToken : undefined;
};