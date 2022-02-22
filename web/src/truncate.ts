export default function truncate(str: string, length: number): string {
    if(str.length > length) {
        return str.substring(0, length) + '\u2026';
    }
    return str;
}