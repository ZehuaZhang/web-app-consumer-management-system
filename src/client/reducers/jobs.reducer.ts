import { ActionName, IAction } from '../actions/jobs.action'
import { JobModel } from '../models'
import { localStorageUtil } from '../utils'
import { ReducerAction } from 'react'

export type IJobState = JobModel[]

namespace Constants {
  export const LocalStorageName = 'JobList'
}

const initialState: IJobState = []

const jobs = (state = initialState, action: IAction) => {
  switch (action.type) {
    case ActionName.ToggleApplication:
      if (state.includes(action.offerId)) {
        state = state.filter(offerId => offerId !== action.offerId)
      } else {
        state = state.concat([action.offerId])
      }

      localStorageUtil.removeItem(Constants.LocalStorageName)
      localStorageUtil.setItem(Constants.LocalStorageName, JSON.stringify(state))

      return state
    case ActionName.FetchApplications:
      const cachedJobList = JSON.parse(localStorageUtil.getItem(Constants.LocalStorageName) || '[]')
      return state = cachedJobList
    default:
      return state
  }
}

export default jobs
