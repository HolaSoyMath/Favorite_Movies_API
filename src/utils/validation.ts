import { AppError } from "../errors/AppError";

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function isNumber(fields: { [key: string]: any }) {
    for (const [field, value] of Object.entries(fields)) {
        if (isNaN(Number(value))) {
            throw new AppError(`${field} needs to be a number`);
        }
    }
}

export function validateAndConvertToNumber(fields: { [key: string]: any }): {
    [key: string]: number;
} {
    const result: { [key: string]: number } = {};

    for (const [fieldName, value] of Object.entries(fields)) {
        const numericValue = Number(value);
        if (isNaN(numericValue)) {
            throw new AppError(`${fieldName} needs to be a valid number`);
        }
        result[fieldName] = numericValue;
    }

    return result;
}

export function isString(fields: { [key: string]: any }) {
    for (const [field, value] of Object.entries(fields)) {
        if (isNaN(value)) {
            throw new AppError(`${field} needs to be a valid String`);
        }
    }
}
