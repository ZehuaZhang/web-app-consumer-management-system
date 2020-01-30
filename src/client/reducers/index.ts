import { combineReducers } from 'redux'
import offers, { IOfferState } from './offers.reducer'
import jobs, { IJobState } from './jobs.reducer'

export interface State {
  offers: IOfferState,
  jobs: IJobState
}

export const reducer = combineReducers<State>({
  offers,
  jobs
})


