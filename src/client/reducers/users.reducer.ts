import { ActionName, IAction } from '../actions/users.action'
import { UserModel, I_UserModel } from '../models'

export interface IUserState {
  items: I_UserModel[]
  requestStatus: UserModel.RequestStatus
  sortType: UserModel.SortType
  sortOrder: UserModel.SortOrder
  receivedAt: string
  offset: number
}

const initialState: IUserState = {
  items: [],
  requestStatus: UserModel.RequestStatus.NA,
  sortType: UserModel.SortType.ID,
  sortOrder: UserModel.SortOrder.Ascending,
  offset: 0,
  receivedAt: ''
}

const users = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionName.ReceiveUsers:
      return {
        ...state,
        items: action.items,
        offset: action.offset,
        receivedAt: action.receivedAt,
        requestStatus: action.requestStatus
      }
    case ActionName.RequestUsers:
      return {
        ...state,
        sortType: action.sortType,
        sortOrder: action.sortOrder,
        requestStatus: action.requestStatus
      }
    case ActionName.UpdateUser:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            return ({
              ...item,
              ...action.updateBody
            })
          }
          return item
        }),
        receivedAt: action.receivedAt,
        requestStatus: action.requestStatus
      }
    case ActionName.RetryUserRequest:
      return {
        ...state,
        requestStatus: action.requestStatus
      }
    case ActionName.RevertUsersOnFailedRequests:
      return {
        ...state,
        sortType: action.sortType,
        sortOrder: action.sortOrder,
        requestStatus: action.requestStatus
      }
    case ActionName.UpdateUserFailed:
      return {
        ...state,
        requestStatus: action.requestStatus
      }
    default:
      return state
  }
}

export default users
