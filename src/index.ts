export function clone<T>(value: T): T {
    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return cloneArray(value) as T
        }

        if (value !== null) {
            return cloneObject(value) as T
        }
    }

    return value
}

function cloneArray<T extends any[]>(array: T): T {
    return array.map(clone) as T
}

function cloneObject<T extends object>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj)
            .map(clone)
    ) as T
}

type untypedObject = { [key: string]: any }
type PickProperties<T, K extends keyof T> = {
    [P in K]: T[P]
}

type OmitProperties<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P]
}

export function pick<T extends untypedObject, K extends keyof T>(obj: T, props: K[]) {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key]) => props.includes(key as K))
            .map((([key, value]) => [key, clone(value)]))
    ) as PickProperties<T, K>
}

export function pickAllExcept<T extends untypedObject, K extends keyof T>(obj: T, props: K[]) {
    return Object.fromEntries(
        Object.entries(obj)
            .filter(([key]) => !props.includes(key as K))
            .map((([key, value]) => [key, clone(value)]))
    ) as OmitProperties<T, K>
}

export const pickAll = cloneObject