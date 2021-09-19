export type nil = null | undefined

export function isNil<T>(value: T | nil): value is nil {
    return value === null || typeof value === 'undefined'
}

export function checkNotNil<T>(value: T | nil, msg: string = 'Unexpected nil'): T {
    if (isNil(value)) {
        throw new Error(msg)
    }
    return value
}

export function check(condition: boolean, msg: string, value?: unknown): condition is true {
    if (!condition) {
        if (isNil(value)) {
            throw new Error(msg)
        }
        throw new Error(`${msg}: ${value}`)
    }
    return true
}

export function unreachable(msg: string, value: never): never {
    throw new Error(`Unreachable: ${msg}: ${value}`)
}