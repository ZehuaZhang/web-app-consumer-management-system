import * as React from 'react'
import { connect } from 'react-redux'
import { toggleApplication } from '../actions/jobs.action'
import { OfferItem } from '../components'
import { OfferModel, JobModel } from '../models'
import { State } from 'client/reducers'

export namespace Jobs {
  export interface Props {
    jobs: [OfferModel | JobModel]
    requestStatus: OfferModel.RequestStatus
    toggleApplication: (offerId: number) => void
  }
}

class Jobs extends React.Component<any> {
  handleClickOnOffer(offerId: number) {
    this.props.toggleApplication(offerId)
  }

  render() {
    const { jobs, toggleApplication } = this.props
    const getkey = (job: OfferModel | JobModel) => typeof job === 'number' ? job : job.offer
    return (
      <div className="convoy-job-container">
        <div className="convoy-job">
          <div className='convoy-job-detailed-container-wrapper' >
            <div className='convoy-job-detailed-container'>
              <div className='convoy-job-gallery-container'>
                {
                  jobs.map((job: OfferModel | JobModel) =>
                    <OfferItem
                      offer={job}
                      key={getkey(job)}
                      toggleApplication={toggleApplication}
                      isRequested={true}
                    />
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: State) => {
  const jobsNotInOfferList = [...state.jobs]
  const jobsInOfferList = state.offers.items
    .filter(item => {
      const isJobInOfferList = state.jobs.includes(item.offer)

      if (isJobInOfferList) {
        jobsNotInOfferList.splice(jobsNotInOfferList.indexOf(item.offer), 1)
      }

      return isJobInOfferList
    })
  const jobs = (jobsInOfferList as [OfferModel | JobModel]).concat(jobsNotInOfferList)

  return {
    jobs
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  toggleApplication: (offerId: number) => dispatch(toggleApplication(offerId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Jobs)