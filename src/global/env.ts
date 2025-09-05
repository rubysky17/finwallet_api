import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const envConfig = dotenv.config();
dotenvExpand.expand(envConfig);

export type BaseType = boolean | number | string | undefined | null;


export const isDev = process.env.NODE_ENV === 'development'

function formatValue<T extends BaseType = string>(
    key: string,
    defaultValue: T,
    callback?: (value: string) => T
) {
    const value: string | undefined = process.env[key]
    if (typeof value === 'undefined')
        return defaultValue

    if (!callback)
        return value as unknown as T

    return callback(value)
}

export function env(key: string, defaultValue?: string) {
    return formatValue(key, defaultValue)
}

export function envNumber(key: string, defaultValue: number = 0) {
    return formatValue(key, defaultValue, (value) => {
        try {
            return Number(value)
        }
        catch {
            throw new Error(`${key} environment variable is not a number`)
        }
    })
}

export function envBoolean(key: string, defaultValue: boolean = false) {
    return formatValue(key, defaultValue, (value) => {
        try {
            return Boolean(JSON.parse(value))
        }
        catch {
            throw new Error(`${key} environment variable is not a boolean`)
        }
    })
}
