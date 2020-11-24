export function missingField(key) {
    return `Campo faltante: '${key}'`;
}

export function invalidValue(key) {
    return `Valor inválido para campo: '${key}'`;
}

export function maxLength(key, length) {
    return `Longitud inválida para '${key}' (máximo ${length} caracteres)`;
}