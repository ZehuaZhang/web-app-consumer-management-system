export function getLocaleStringFromEpochTime(epochTime: number) {
    const date = new Date(0)
    date.setMilliseconds(epochTime)
    const dateItem = date.toDateString().split(' ')
    const timeItem = date.toLocaleTimeString().split(' ')
    return (
        `${dateItem[0]} ${dateItem[1]}/${dateItem[2]} ` +
        `${timeItem[0]}${timeItem[1].toLowerCase()}`
    )
}