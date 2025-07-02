type untypedObject = { [key: string]: any };
type PickProperties<T, K extends keyof T> = {
    [P in K]: T[P];
};

type OmitProperties<T, K extends keyof T> = {
    [P in Exclude<keyof T, K>]: T[P];
};

export function pick<T extends untypedObject, K extends keyof T>(
    obj: T,
    props: K[],
) {
    const pickedObj = {} as T;

    for (const key of props) {
        if (key in obj) {
            pickedObj[key] = clone(obj[key]);
        }
    }

    return pickedObj as PickProperties<T, K>;
}

/**
 * @deprecated This function will be removed in the next version, please use `clone` instead
 */
export const pickAll = cloneObject;

export function omit<T extends untypedObject, K extends keyof T>(
    obj: T,
    props: K[],
) {
    const pickedObj = {} as T;

    for (const key in obj) {
        if (!props.includes(key as unknown as K)) {
            pickedObj[key] = clone(obj[key]);
        }
    }

    return pickedObj as OmitProperties<T, K>;
}

/**
 * @deprecated This function will be removed in the next version, please use `omit` instead
 */
export const pickAllExcept = omit;

export function clone<T>(value: T): T {
    if (typeof value === "object") {
        if (Array.isArray(value)) {
            return cloneArray(value) as T;
        }

        if (value !== null) {
            return cloneObject(value) as T;
        }
    }

    return value;
}

function cloneArray<T extends any[]>(array: T): T {
    return array.map(clone) as T;
}

function cloneObject<T extends object>(obj: T): T {
    if (obj instanceof Date) {
        return new Date(obj) as T;
    }

    const clonedObj = {} as T;

    for (const key in obj) {
        clonedObj[key] = clone(obj[key]);
    }

    return clonedObj;
}

type ValueOf<T> = T extends { valueOf(): infer R } ? R : T;
type PickPrimitives<T, K extends keyof T> = {
    [P in K]: ValueOf<T[P]>;
};

export function pickPrimitives<T extends untypedObject, K extends keyof T>(
    obj: T,
    props: K[],
) {
    const pickedObj = {} as T;

    for (const key of props) {
        if (key in obj) {
            pickedObj[key] = obj[key].valueOf();
        }
    }

    return pickedObj as PickPrimitives<T, K>;
}
