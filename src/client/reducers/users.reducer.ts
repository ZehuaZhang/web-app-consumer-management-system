import { ActionName, IAction } from '../actions/users.action'
import { UserModel } from '../models'

export interface IUserState {
  items: UserModel[]
  requestStatus: UserModel.RequestStatus
  sortType: UserModel.SortType
  sortOrder: UserModel.SortOrder
  receivedAt: string
  offset: number
}

const initialState: IUserState = {
  items: [],
  requestStatus: UserModel.RequestStatus.NA,
  sortType: UserModel.SortType.PickupDate,
  sortOrder: UserModel.SortOrder.Descending,
  offset: 0,
  receivedAt: ''
}

const users = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionName.ReceiveOffers:
      return {
        ...state,
        items: action.items,
        offset: action.offset,
        receivedAt: action.receivedAt,
        requestStatus: action.requestStatus
      }
    case ActionName.RequestOffers:
      return {
        ...state,
        sortType: action.sortType,
        sortOrder: action.sortOrder,
        requestStatus: action.requestStatus
      }
    case ActionName.RetryOfferRequest:
      return {
        ...state,
        requestStatus: action.requestStatus
      }
    case ActionName.RevertOffersOnFailedRequests:
      return {
        ...state,
        sortType: action.sortType,
        sortOrder: action.sortOrder,
        requestStatus: action.requestStatus
      }
    case ActionName.ChangeSortType:
      return {
        ...state,
        sortType: action.sortType
      }
    case ActionName.ChangeSortOrder:
      return {
        ...state,
        sortOrder: action.sortOrder
      }
    default:
      return state
  }
}

export default offers
