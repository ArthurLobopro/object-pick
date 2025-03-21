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
        pickedObj[key] = clone(obj[key]);
    }

    return pickedObj as PickProperties<T, K>;
}

/**
 * @deprecated This function will be removed in the next version, please use `clone` instead
 */
export const pickAll = cloneObject;

export function pickAllExcept<T extends untypedObject, K extends keyof T>(
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
    const clonedObj = {} as T;

    for (const key in obj) {
        clonedObj[key] = clone(obj[key]);
    }

    return clonedObj;
}
