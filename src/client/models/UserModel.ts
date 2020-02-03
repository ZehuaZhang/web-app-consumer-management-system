export interface I_UserModel {
  id: number,
  username: string,
  dateofbirth: number,
  email: string,
  balance: number,
  lastmodified: number
}

export interface UserUpdateData {
  username?: string,
  dateofbirth?: number,
  email?: string,
  balance?: number
}

export interface UserUpdateReducerData extends UserUpdateData {
  lastmodified: number
}

export namespace UserModel {
  export enum SortType {
    ID = 'ID',
    UserName = 'UserName',
    Email = 'Email',
    DateOfBirth = 'DateOfBirth',
    Balance = 'Balance',
    LastModified = 'LastModified'
  }

  export enum SortTypeDisplay {
    ID = 'ID',
    UserName = 'User Name',
    Email = 'Email',
    DateOfBirth = 'Date Of Birth',
    Balance = 'Balance',
    LastModified = 'Last Modified'
  }

  export const SortTypeToSortApiQuery = {
    [SortType.ID]: 'id',
    [SortType.UserName]: 'username',
    [SortType.DateOfBirth]: 'dateofbirth',
    [SortType.Email]: 'email',
    [SortType.LastModified]: 'lastmodified',
    [SortType.Balance]: 'balance'
  }

  export enum SortOrder {
    Ascending = 'Ascending',
    Descending = 'Descending'
  }

  export const SortOrderToOrderApiQuery = {
    [SortOrder.Ascending]: 'ascending',
    [SortOrder.Descending]: 'descending'
  }

  export enum RequestStatus {
    NA = 'NA',
    Completed = 'Completed',
    Failed = 'Failed',
    Loading = 'Loading',
    Retrying = 'Retrying'
  }
}
