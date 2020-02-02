import { get } from 'superagent'
import { UserModel } from '../models'
import { State } from '../reducers'
import { IUserState } from '../reducers/users.reducer'

export module ActionName {
  export const RequestUsers = 'Request Users'
  export const ReceiveUsers = 'Receive Users'
  export const RevertUsersOnFailedRequests = 'Revert Users on Failed Request'
  export const RetryUserRequest = 'Retry User Request'
  export const ChangeSortType = 'Change Sort Type'
  export const ChangeSortOrder = 'Change Sort Order'
}

namespace Constants {
  export const LimitApiQuery = 3
  export const Endpoint = `https://convoy-mock-api.herokuapp.com/offers?`
}

export interface IAction {
  type: string
  [actionItemName: string]: any
  // to be enriched
}

function requestUsers(sortType: UserModel.SortType, sortOrder: UserModel.SortOrder) {
  const requestStatus = UserModel.RequestStatus.Loading
  return {
    type: ActionName.RequestUsers,
    sortType,
    sortOrder,
    requestStatus
  }
}

function receiveUsers(newItems: UserModel[], items: UserModel[], offset: number) {
  const completeUserItems = transformUsers(items.concat(newItems))
  const requestStatus = UserModel.RequestStatus.Completed

  return {
    type: ActionName.ReceiveUsers,
    items: completeUserItems,
    offset,
    receivedAt: Date.now(),
    requestStatus
  }
}

function transformUsers(items: OfferModel[]) {
  const set = new Set()

  return (items || []).filter(item => {
    if (set.has(item.offer)) {
      return false
    }

    set.add(item.offer)
    return true
  })
}

function revertOffersOnFailedRequests(sortType: OfferModel.SortType, sortOrder: OfferModel.SortOrder) {
  const requestStatus = OfferModel.RequestStatus.Failed
  return {
    type: ActionName.RevertOffersOnFailedRequests,
    sortType,
    sortOrder,
    requestStatus
  }
}

function retryOfferRequest() {
  const requestStatus = OfferModel.RequestStatus.Retrying
  return {
    type: ActionName.RetryOfferRequest,
    requestStatus
  }
}

export function changeSortType(sortType: OfferModel.SortType) {
  return {
    type: ActionName.ChangeSortType,
    sortType
  }
}

export function changeSortOrder(sortOrder: OfferModel.SortOrder) {
  return {
    type: ActionName.ChangeSortOrder,
    sortOrder
  }
}

function fetchOffers(sortType: OfferModel.SortType, sortOrder: OfferModel.SortOrder) {
  return (dispatch: Function, getState: () => State) => {
    const { sortType: prevSortType, sortOrder: prevSortOrder } = getState().offers

    dispatch(requestOffers(sortType, sortOrder))
    const endpoint = [
      Constants.Endpoint,
      `limit=${Constants.LimitApiQuery}`,
      `sort=${OfferModel.SortTypeToSortApiQuery[sortType]}`,
      `order=${OfferModel.SortOrderToOrderApiQuery[sortOrder]}`
    ].join('&')

    return get(endpoint)
      .retry(3, () => dispatch(retryOfferRequest()))
      .then(response => {
        dispatch(receiveOffers(
          response.body,
          [],
          Constants.LimitApiQuery))

          fetchExtraUniqueOffers(getState(), dispatch, 0)
      })
      .catch(error => {
        console.error('Error on fetchOffers', error)
        dispatch(revertOffersOnFailedRequests(prevSortType, prevSortOrder))
      })
  }
}

function fetchExtraUniqueOffers(state: State, dispatch: Function, originalLength: number) {
  const lengthDifference = state.offers.items.length - originalLength
  if (lengthDifference < Constants.LimitApiQuery) {
    const nextLimitApiQuery = Constants.LimitApiQuery - lengthDifference
    dispatch(fetchNextOffers(originalLength, nextLimitApiQuery))
  }
}

export function fetchNextOffers(originalLength: number, limit = Constants.LimitApiQuery) {
  return (dispatch: Function, getState: () => State) => {
    const { sortType, sortOrder, offset } = getState().offers

    dispatch(requestOffers(sortType, sortOrder))

    const endpoint = [
      Constants.Endpoint,
      `limit=${limit}`,
      `sort=${OfferModel.SortTypeToSortApiQuery[sortType]}`,
      `order=${OfferModel.SortOrderToOrderApiQuery[sortOrder]}`,
      `offset=${offset}`
    ].join('&')

    return get(endpoint)
      .retry(3, () => dispatch(retryOfferRequest()))
      .then(response => {
        const items = getState().offers.items || []

        dispatch(receiveOffers(
          response.body,
          items,
          getState().offers.offset + limit))

          fetchExtraUniqueOffers(getState(), dispatch, originalLength)
      })
      .catch(error => {
        console.error('Error on fetchNextOffers', error)
        dispatch(revertOffersOnFailedRequests(sortType, sortOrder))
      })
  }
}

function shouldFetchOffers(state: IOfferState, shouldForceUpdate: boolean) {
  if (shouldForceUpdate) {
    return true
  }
  const { requestStatus, items } = state
  return (
    requestStatus !== OfferModel.RequestStatus.Loading &&
    items.length < Constants.LimitApiQuery
  )
}

export function fetchOffersIfNeeded(shouldForceUpdate: boolean) {
  return (dispatch: Function, getState: () => State) => {
    if (shouldFetchOffers(getState().offers, shouldForceUpdate)) {
      const { sortType, sortOrder } = getState().offers
      return dispatch(fetchOffers(sortType, sortOrder))
    }
  }
}

