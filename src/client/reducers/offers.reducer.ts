import { ActionName, IAction } from '../actions/offers.action'
import { OfferModel } from '../models'

export interface IOfferState {
  items: OfferModel[]
  requestStatus: OfferModel.RequestStatus
  sortType: OfferModel.SortType
  sortOrder: OfferModel.SortOrder
  receivedAt: string
  offset: number
}

const initialState: IOfferState = {
  items: [],
  requestStatus: OfferModel.RequestStatus.NA,
  sortType: OfferModel.SortType.PickupDate,
  sortOrder: OfferModel.SortOrder.Descending,
  offset: 0,
  receivedAt: ''
}

const offers = (state = initialState, action: IAction) => {
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
