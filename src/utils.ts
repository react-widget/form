export function isEmptyValue<T>(value: T) {
    if (value === undefined || value === null) {
        return true;
    }
    if (Array.isArray(value) && !value.length) {
        return true;
    }
    if (typeof value === "string" && !value) {
        return true;
    }

    return false;
}
