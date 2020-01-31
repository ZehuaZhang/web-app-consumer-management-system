import { UserSortType, UserSortOrder } from "server/utils/constants/user.constant"

export interface I_User extends I_UserCollectionData {
  id: number
}

export interface I_UserCollectionData {
  username: string
  dateofbirth: string
  email: string
  lastmodified: number
  balance: number
}

export interface I_UserCollection {
  [id: string]: I_UserCollectionData
}

export interface I_User_GetUsers_Query {
  sort: string
  order: string
  limit: string
  offset: string
}

export interface I_User_GetUsers_Model_Input {
  sort: UserSortType
  order: UserSortOrder
  limit: number
  offset: number
}

export interface I_User_DeleteUser_Model_Input {
  id: number
}

export interface I_User_UpdateUser_RequestBody {
  username?: string
  dateofbirth?: string
  email?: string
  balance?: number
}

export interface I_User_UpdateUser_Model_Input extends I_User_UpdateUser_RequestBody {
  id: number
}

export interface I_User_AddUser_RequestBody {
  username: string
  dateofbirth: string
  email: string
  balance: number
}

export interface I_User_AddUser_Model_Input extends I_User_AddUser_RequestBody {
}

export interface I_User_SearchUsers_Query extends I_User_GetUsers_Query {
  term: string
}

export interface I_User_SearchUsers_Model_Input extends I_User_GetUsers_Model_Input {
  term: string
}