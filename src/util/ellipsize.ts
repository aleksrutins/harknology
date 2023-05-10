export function ellipsize(str: string, maxLen: number): string {
    return str.slice(0, maxLen) + (str.length > maxLen? '\u2026' : '');
}