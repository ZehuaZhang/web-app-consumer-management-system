import * as moment from 'moment'

export function isValidDate(date: any) {
    return moment(date).isValid()
}

export function formatDate(date: any, format: string) {
    return moment(date).format(format)
}

export function toEpochTime(date: any) {
    return moment(date).valueOf()
}