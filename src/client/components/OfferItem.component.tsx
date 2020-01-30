import * as React from 'react'
import { JobModel, OfferModel } from '../models'
import { numberUtil } from '../utils'

export namespace Footer {
  export interface Props {
    offer: OfferModel | JobModel,
    isRequested: boolean,
    toggleApplication: (offerId: number) => void
  }
}

export class OfferItem extends React.Component<Footer.Props> {

  handleClickOnOffer(offerId: number) {
    this.props.toggleApplication(offerId)
  }

  renderTimeline(startDateString: string, endDateString: string) {
    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)

    const startDateItem = startDate.toDateString().split(' ')
    const startTimeItem = startDate.toLocaleTimeString().split(" ")
    const endDateItem = endDate.toDateString().split(' ')
    const endTimeItem = endDate.toLocaleTimeString().split(" ")

    if (
      startDate.getFullYear() === endDate.getFullYear() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getDate() === endDate.getDate()
    ) {
      return (
        `${startDateItem[0]} ${startDateItem[1]}/${startDateItem[2]} ` +
        `${startTimeItem[0].slice(0, -3)}${startTimeItem[1].toLowerCase()} - ` +
        `${endTimeItem[0].slice(0, -3)}${endTimeItem[1].toLowerCase()}`
      )
    }

    return (
      `${startDateItem[0]} ${startDateItem[1]}/${startDateItem[2]} ` +
      `${startTimeItem[0].slice(0, -3)}${startTimeItem[1].toLowerCase()} - ` +
      `${endDateItem[0]} ${endDateItem[1]}/${endDateItem[2]} ` +
      `${endTimeItem[0].slice(0, -3)}${endTimeItem[1].toLowerCase()} - `
    )
  }

  render() {
    const { offer, toggleApplication, isRequested } = this.props

    const offerId = typeof offer === 'number' ? offer : offer.offer
    return (
      <div className='offer-item-container' onClick={() => toggleApplication(offerId)}>
        {
          isRequested &&
          <div className='offer-item-title'>
            <span>Requested</span>
          </div>
        }
        {
          typeof offer === 'number' ?
            <div className='offer-item-content'>
              <span> Unable to Retrieve Job Details for Offer ID: {offerId} </span>
            </div>
            :
            <div className='offer-item-content'>
              <div className='offer-item-route-image' />
              <div className='offer-item-destination-source-container'>
                <div className='offer-item-source-container'>
                  <span className='location'>{offer.origin.city}, {offer.origin.state}</span>
                  <span className='time'>{this.renderTimeline(offer.origin.pickup.start, offer.origin.pickup.end)}</span>
                </div>
                <div className='offer-item-destination-container'>
                  <span className='location'>{offer.destination.city}, {offer.destination.state}</span>
                  <span className='time'>{this.renderTimeline(offer.destination.dropoff.start, offer.destination.dropoff.end)}</span>
                </div>
              </div>
              <div className='offer-item-miles-container'>
                {`${numberUtil.getNumberWithCommas(offer.miles)} miles`}
              </div>
            </div>
        }
      </div>
    )
  }
}