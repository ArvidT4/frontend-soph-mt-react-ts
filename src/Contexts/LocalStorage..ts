import {IToken} from "../interfaces";

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