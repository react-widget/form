export function isEmptyValue(value) {
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
