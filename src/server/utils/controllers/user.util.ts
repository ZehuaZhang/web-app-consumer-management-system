/**
 * Utility & Helper Functions for User Controller
 */

import { Request } from 'express'
import { 
  I_User_GetUsers_Model_Input, I_User_GetUsers_Query,
  I_User_DeleteUser_Model_Input,
  I_User_AddUser_Model_Input, I_User_AddUser_RequestBody,
  I_User_UpdateUser_Model_Input, I_User_UpdateUser_RequestBody,
  I_User_SearchUsers_Model_Input, I_User_SearchUsers_Query
} from '../../interfaces/user.interface'
import { userQueryToSortType, userQueryToSortOrder, UserSortType, UserSortOrder, QueryDefault } from '../constants/user.constant'

export function getModelInputFromGetUsersRequest(req: Request): I_User_GetUsers_Model_Input {
  const { sort, order, limit, offset } = req.query as I_User_GetUsers_Query

  return ({
    sort: sort ? userQueryToSortType[sort.toLowerCase()] : UserSortType.ID,
    order: order ? userQueryToSortOrder[order.toLowerCase()] : UserSortOrder.Ascending,
    limit: limit ? parseInt(limit) : QueryDefault.limit,
    offset: offset ?  parseInt(offset) : QueryDefault.offset
  })
}

export function getModelInputFromDeleteUserRequest(req: Request): I_User_DeleteUser_Model_Input {
  const { id } = req.params

  if (!id) {
    throw "invalid id"
  }

  return ({
    id: parseInt(id)
  })
}

export function getModelInputFromAddUserRequest(req: Request): I_User_AddUser_Model_Input {
  const { username, email, dateofbirth, balance } = req.body as I_User_AddUser_RequestBody
  return ({
    username: username.trim(),
    email: email.trim(),
    dateofbirth: dateofbirth.trim(),
    balance: parseInt(balance as any)
  })
}

export function getModelInputFromUpdateUserRequest(req: Request): I_User_UpdateUser_Model_Input {
  const { id } = req.params
  const body = req.body as I_User_UpdateUser_RequestBody

  if (!id) {
    throw "invalid id"
  }

  if (body.balance) {
    body.balance = parseInt(body.balance as any)
  }

  return ({
    id: parseInt(id),
    ...body
  })
}

export function getModelInputFromSearchUserRequest(req: Request): I_User_SearchUsers_Model_Input {
  const { term, sort, order, limit, offset } = req.query as I_User_SearchUsers_Query

  return ({
    term: term.toLowerCase().trim(),
    sort: sort ? userQueryToSortType[sort.toLowerCase()] : UserSortType.ID,
    order: order ? userQueryToSortOrder[order.toLowerCase()] : UserSortOrder.Ascending,
    limit: limit ? parseInt(limit) : QueryDefault.limit,
    offset: offset ?  parseInt(offset) : QueryDefault.offset
  })
}