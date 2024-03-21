export default function dateDiff(date) {
    const today = new Date()
    const createdOn = new Date(date);
    const msInDay = 24 * 60 * 60 * 1000;

    createdOn.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0)

    return (+today - +createdOn) / msInDay
}