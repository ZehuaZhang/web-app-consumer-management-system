import * as React from 'react'
import { UserModel } from '../models'
import { dateUtil } from '../utils'

export namespace Status {
  export interface Props {
    receivedAt: string,
    requestStatus: UserModel.RequestStatus
  }
}

export class Status extends React.Component<Status.Props> {
  render() {
    const { receivedAt, requestStatus } = this.props

    const getImageClassName = () => {
      switch (requestStatus) {
        case UserModel.RequestStatus.Completed:
          return 'status-image-completed'
        case UserModel.RequestStatus.Loading:
          return 'status-image-loading'
        case UserModel.RequestStatus.Retrying:
          return 'status-image-retrying'
        case UserModel.RequestStatus.Failed:
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
            {dateUtil.formatDate(receivedAt, 'llll')}
          </div>
        }
      </div>
    )
  }
}