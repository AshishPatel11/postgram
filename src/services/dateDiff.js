export default function dateDiff(date) {
    const today = new Date()
    const createdOn = new Date(date);

    const milliSeconds = +today - +createdOn
    const seconds = Math.floor(milliSeconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 31)
    const year = Math.floor(months / 12)

    if (year) {
        if (year === 1) return 'a year ago'
        return year + ' years ago'
    } else if (months) {
        if (months === 1) return 'a month ago'
        return months + ' months ago'
    } else if (days) {
        if (days === 1) return 'a day ago'
        return days + ' days ago'
    } else if (hours) {
        if (hours === 1) return 'an hour ago'
        return hours + ' hours ago'
    } else {
        if (minutes <= 1) return 'less than a minute ago'
        return minutes + ' minutes ago'
    }
}