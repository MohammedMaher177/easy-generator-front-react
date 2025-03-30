import { Schema } from 'joi';
import { ITokenDecode } from './interfaces';
import { jwtDecode } from 'jwt-decode';
import { format } from 'date-fns';

type ValidationError = Record<string, string | undefined>;

export const validate = <T>(values: T, schema: Schema): ValidationError | undefined => {
    const { error } = schema.validate(values, { abortEarly: false });

    if (!error) return undefined;

    return error.details.reduce((acc: ValidationError, curr) => {
        acc[curr.path[0] as string] = curr.message;
        return acc;
    }, {});
};

export const getFromLocal = (key: string) => {
    return localStorage.getItem(key);
};

export const setInLocal = async (key: string, value: string) => {
    localStorage.setItem(key, value);
};

export const checkToken = (token: string) => {
    const decode: ITokenDecode = jwtDecode(token);
    return decode;
};

export const deleteFromLocal = async (key: string) => {
    return localStorage.removeItem(key);
};

export const formatedDate = (d: Date | string) => {
    try {
        const date = new Date(d);
        return format(date, "MMMM dd, yyyy 'at' hh:mm:ss a");
    } catch (error) {
        console.log(error);
    }
};

export function generateNumericId(length: number) {
    let result = '';
    const characters = 'abcdefghjklmopqrstwz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

export const rowClasses = [
    'bg-dark-dark-light border-dark-dark-light',
    'bg-primary/20 border-primary/20',
    'bg-secondary/20 border-secondary/20',
    'bg-success/20 border-success/20',
    'bg-danger/20 border-danger/20',
    'bg-info/20 border-info/20',
    'bg-warning/20 border-warning/20',
];

export const beautifyText = (text: string) =>
    text
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space before uppercase letters
        .replace(/[_\-.]+/g, ' ') // Replace underscores, dashes, dots with space
        .replace(/\[(\d+)\]/g, '  ') // Replace [0] with " 0 "
        .replace(/\s+/g, ' ') // Remove extra spaces
        .trim()
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word

export const validateForm = (values: any, schema: Schema, context = {}) => {
    const { error } = schema.validate(values, { abortEarly: false, context });

    if (!error) return {};

    const errors: Record<string, string> = {};
    error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
    });

    return errors;
};
