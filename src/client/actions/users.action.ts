import { get, post, del } from 'superagent'
import { I_UserModel, UserModel, UserUpdateData, UserUpdateReducerData, UserAddData } from 'client/models'
import { State } from 'client/reducers'
import { IUserState } from 'client/reducers/users.reducer'

interface I_User_UpdateUser_Response {
  lastmodified: number
}

interface I_User_AddUser_Response {
  id: number
  lastmodified: number
}

export module ActionName {
  export const RequestUsers = 'Request Users'
  export const ReceiveUsers = 'Receive Users'
  export const UpdateUser = 'Update User'
  export const DeleteUser = 'Delete User'
  export const AddUser = 'Add User'
  export const RevertUsersOnFailedRequests = 'Revert Users on Failed Request'
  export const RetryUserRequest = 'Retry User Request'
  export const FailedRequests = 'Failed Requests'
}

namespace Constants {
  export const maxRetryCount = 3
  export const LimitApiQuery = 10
  export const UserEndpoint = `http://localhost:4000/api/users?limit=${LimitApiQuery}`
  export const SearchEndpoint = `http://localhost:4000/api/search?limit=${LimitApiQuery}`
  export const UpdateUserEndpoint = `http://localhost:4000/api/users/`
  export const DeleteUserEndpoint = `http://localhost:4000/api/users/`
  export const AddUserEndpoint = `http://localhost:4000/api/users/`
}

export interface IAction {
  type: string
  [actionItemName: string]: any
}

function requestUsers(sortType: UserModel.SortType, sortOrder: UserModel.SortOrder) {
  return ({
    type: ActionName.RequestUsers,
    sortType,
    sortOrder,
    requestStatus: UserModel.RequestStatus.Loading
  })
}

function receiveUsers(newItems: I_UserModel[], items: I_UserModel[], offset: number) {
  return ({
    type: ActionName.ReceiveUsers,
    items: items.concat(newItems),
    offset,
    receivedAt: Date.now(),
    requestStatus: UserModel.RequestStatus.Completed
  })
}

function updateUser(id: number, updateBody: UserUpdateReducerData) {
  return ({
    type: ActionName.UpdateUser,
    id,
    updateBody,
    receivedAt: Date.now(),
    requestStatus: UserModel.RequestStatus.Completed
  })
}

function deleteUser(id: number) {
  return ({
    type: ActionName.DeleteUser,
    id,
    receivedAt: Date.now(),
    requestStatus: UserModel.RequestStatus.Completed
  })
}

function addUser(user: I_UserModel) {
  return ({
    type: ActionName.AddUser,
    user,
    receivedAt: Date.now(),
    requestStatus: UserModel.RequestStatus.Completed
  })
}

function revertUsersOnFailedRequests(sortType: UserModel.SortType, sortOrder: UserModel.SortOrder) {
  return ({
    type: ActionName.RevertUsersOnFailedRequests,
    sortType,
    sortOrder,
    requestStatus: UserModel.RequestStatus.Failed
  })
}

function setFailedRequest() {
  return ({
    type: ActionName.FailedRequests,
    requestStatus: UserModel.RequestStatus.Failed
  })
}

function retryUserRequest() {
  return ({
    type: ActionName.RetryUserRequest,
    requestStatus: UserModel.RequestStatus.Retrying
  })
}

export function fetchUsers(sortType?: UserModel.SortType, sortOrder?: UserModel.SortOrder) {
  return (dispatch: Function, getState: () => State) => {
    const { sortType: prevSortType, sortOrder: prevSortOrder } = getState().users
    const { term } = getState().search

    sortType = sortType || prevSortType
    sortOrder = sortOrder || prevSortOrder

    dispatch(requestUsers(sortType, sortOrder))
    const endpoint = [
      term ? Constants.SearchEndpoint : Constants.UserEndpoint,
      `sort=${UserModel.SortTypeToSortApiQuery[sortType]}`,
      `order=${UserModel.SortOrderToOrderApiQuery[sortOrder]}`
    ]
      .concat(term ? [`term=${term}`] : [])
      .join('&')

    return get(endpoint)
      .retry(Constants.maxRetryCount, () => dispatch(retryUserRequest()))
      .then(response => {
        dispatch(receiveUsers(
          response.body,
          [],
          Constants.LimitApiQuery))
      })
      .catch(error => {
        console.error('Error on fetchUsers', error)
        dispatch(revertUsersOnFailedRequests(prevSortType, prevSortOrder))
      })
  }
}

export function fetchNextUsers() {
  return (dispatch: Function, getState: () => State) => {
    const { sortType, sortOrder, offset } = getState().users
    const { term } = getState().search

    dispatch(requestUsers(sortType, sortOrder))

    const endpoint = [
      term ? Constants.SearchEndpoint : Constants.UserEndpoint,
      `sort=${UserModel.SortTypeToSortApiQuery[sortType]}`,
      `order=${UserModel.SortOrderToOrderApiQuery[sortOrder]}`,
      `offset=${offset}`
    ]
      .concat(term ? [`term=${term}`] : [])
      .join('&')

    return get(endpoint)
      .retry(Constants.maxRetryCount, () => dispatch(retryUserRequest()))
      .then(response => {
        const items = getState().users.items || []

        dispatch(receiveUsers(
          response.body,
          items,
          offset + Constants.LimitApiQuery))
      })
      .catch(error => {
        console.error('Error on fetchNextUsers', error)
        dispatch(revertUsersOnFailedRequests(sortType, sortOrder))
      })
  }
}

export function fetchUpdateUser(id: number, updateBody: UserUpdateData) {
  return (dispatch: Function, getState: () => State) => {
    const endpoint = Constants.UpdateUserEndpoint + id

    return post(endpoint)
      .send({ ...updateBody })
      .retry(Constants.maxRetryCount, () => dispatch(retryUserRequest()))
      .then(response => {
        const { lastmodified } = response.body as I_User_UpdateUser_Response
        dispatch(updateUser(id, { ...updateBody, lastmodified }))
      })
      .catch(error => {
        const { message } = error.response.body
        console.error('Error on fetchUpdateUser', error.response.body)
        dispatch(setFailedRequest())
        throw message
      })
  }
}

export function fetchAddUser(addBody: UserAddData) {
  return (dispatch: Function, getState: () => State) => {
    const endpoint = Constants.AddUserEndpoint

    return post(endpoint)
      .send({ ...addBody })
      .retry(Constants.maxRetryCount, () => dispatch(retryUserRequest()))
      .then(response => {
        const { id, lastmodified } = response.body as I_User_AddUser_Response
        dispatch(addUser({ ...addBody, id, lastmodified }))
      })
      .catch(error => {
        const { message } = error.response.body
        console.error('Error on fetchAddUser', error.response.body)
        dispatch(setFailedRequest())
        throw message
      })
  }
}

export function fetchDeleteUser(id: number) {
  return (dispatch: Function, getState: () => State) => {
    const endpoint = Constants.DeleteUserEndpoint + id

    return del(endpoint)
      .retry(Constants.maxRetryCount, () => dispatch(retryUserRequest()))
      .then(() => {
        dispatch(deleteUser(id))
      })
      .catch(error => {
        const { message } = error.response.body
        console.error('Error on fetchDeleteUser', error.response.body)
        dispatch(setFailedRequest())
        throw message
      })
  }
}

function shouldFetchUsers(state: IUserState, shouldForceUpdate: boolean) {
  if (shouldForceUpdate) {
    return true
  }
  const { requestStatus, items } = state
  return (
    requestStatus !== UserModel.RequestStatus.Loading &&
    items.length < Constants.LimitApiQuery
  )
}

function fetchUsersIfNeeded(shouldForceUpdate: boolean) {
  return (dispatch: Function, getState: () => State) => {
    if (shouldFetchUsers(getState().users, shouldForceUpdate)) {
      const { sortType, sortOrder } = getState().users
      return dispatch(fetchUsers(sortType, sortOrder))
    }
  }
}

