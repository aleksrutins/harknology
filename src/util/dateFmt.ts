export function formatDate(date: Date): string {
    // const msPerDay = 1000 * 60 * 60 * 24;
    // const dateDiff = (Date.now() - date.valueOf());
    // if(dateDiff / msPerDay > 2) {

    // }

    return date.toLocaleDateString() + " " + date.toLocaleTimeString(undefined, {
        timeStyle: "short"
    });
}