export function pluralize(count: number, forms: string[]): string {
    count = Math.abs(count) % 100;
    const n1 = count % 10;

    if (count > 10 && count < 20) {
        return forms[2];
    }

    if (n1 > 1 && n1 < 5) {
        return forms[1];
    }

    if (n1 == 1) {
        return forms[0];
    }

    return forms[2];
}
