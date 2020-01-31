/**
 * Utility & Helper Functions for Date-related
 */

import * as moment from 'moment'

export function dateCompare(timeA: string | number, timeB: string | number) {
    const momentA = moment(timeA)
    const momentB = moment(timeB)

    if (momentA > momentB) {
        return 1
    } else if (momentA < momentB) {
        return -1
    }
    return 0
}