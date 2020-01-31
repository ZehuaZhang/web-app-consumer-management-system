export enum UserSortType {
    ID = 'ID',
    UserName = 'UserName',
    DateOfBirth = 'DateOfBirth',
    Email = 'Email',
    LastModified = 'LastModified',
    Balance = 'Balance'
}

export enum UserSortOrder {
    Ascending = 'Ascending',
    Descending = 'Descending'
}

export module QueryDefault {
    export const limit = 10
    export const offset = 0
}

export const userSortTypeToQuery = Object.keys(UserSortType).reduce(
    (object: any, type: string) => {
        object[type] = type.toLowerCase()
        return object
    }, {})

export const userSortOrderToQuery = Object.keys(UserSortOrder).reduce(
    (object: any, order: string) => {
        object[order] = order.toLowerCase()
        return object
    }, {})

export const userQueryToSortType = Object.keys(userSortTypeToQuery).reduce(
    (object: any, type: string) => {
        const query = userSortTypeToQuery[type]
        object[query] = type
        return object
    }, {})

export const userQueryToSortOrder = Object.keys(userSortOrderToQuery).reduce(
    (object: any, order: string) => {
        const query = userSortOrderToQuery[order]
        object[query] = order
        return object
    }, {})