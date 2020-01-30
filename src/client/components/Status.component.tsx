import * as React from 'react'
import { OfferModel } from '../models'
import { dateUtil } from '../utils'

export namespace Status {
  export interface Props {
    receivedAt: string,
    requestStatus: OfferModel.RequestStatus
  }
}

export class Status extends React.Component<Status.Props> {
  render() {
    const { receivedAt, requestStatus } = this.props

    const getImageClassName = () => {
      switch (requestStatus) {
        case OfferModel.RequestStatus.Completed:
          return 'status-image-completed'
        case OfferModel.RequestStatus.Loading:
          return 'status-image-loading'
        case OfferModel.RequestStatus.Retrying:
          return 'status-image-retrying'
        case OfferModel.RequestStatus.Failed:
          return 'status-image-failed'
        default:
          return 'status-iamge-na'
      }
    }

    return (
      <div className='status-container'>
        {
          receivedAt &&
          <div>
            <span className={getImageClassName()} />
            {dateUtil.getLocaleStringFromEpochTime(parseInt(receivedAt))}
          </div>
        }
      </div>
    )
  }
}