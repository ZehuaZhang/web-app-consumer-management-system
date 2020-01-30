import * as React from 'react'
import { OfferModel } from '../models'

export namespace Sort {
  export interface Props {
    sortType: OfferModel.SortType
    sortOrder: OfferModel.SortOrder
    convoyOfferDetailReference: React.RefObject<HTMLDivElement>
    changeSortType: (sortType: OfferModel.SortType) => void
    changeSortOrder: (sortOrder: OfferModel.SortOrder) => void
    fetchOffersIfNeeded: (shouldForceUpdate: boolean) => void
  }
}

type A = OfferModel.SortOrder

export class Sort extends React.Component<Sort.Props> {
  handleClickOnDropdown(target: HTMLSelectElement) {
    const { changeSortType, fetchOffersIfNeeded, convoyOfferDetailReference } = this.props

    changeSortType(target.value as OfferModel.SortType)
    fetchOffersIfNeeded(true)

    // ReactDom.findDOMNode(convoyOfferDetailReference).scrollIntoView();
    if (convoyOfferDetailReference && convoyOfferDetailReference.current) {
      convoyOfferDetailReference.current.scrollTo(0, 0)
    }
  }

  handleClickOnButton() {
    const { changeSortOrder, fetchOffersIfNeeded, sortOrder, convoyOfferDetailReference } = this.props
    const SortOrderValueList = Object.keys(OfferModel.SortOrder)
      .map(typeName => (OfferModel.SortOrder as any)[typeName])
    const nextValue = SortOrderValueList[(SortOrderValueList.indexOf(sortOrder) + 1) % SortOrderValueList.length]

    changeSortOrder(nextValue)
    fetchOffersIfNeeded(true)

    if (convoyOfferDetailReference && convoyOfferDetailReference.current) {
      convoyOfferDetailReference.current.scrollTo(0, 0)
    }
  }

  render() {
    const { sortOrder, sortType } = this.props

    const dropdownOptions = Object.keys(OfferModel.SortType).map(typeName => {
      return ({
        id: typeName,
        value: (OfferModel.SortType as any)[typeName]
      })
    })

    return (
      <div className='sort-container'>
        <span className='sort-type-dropdown-prefix'>
          {`Sort by: `}
        </span>
        <select
          className='sort-type-dropdown'
          value={sortType}
          onChange={event => this.handleClickOnDropdown(event.target)}>
          {
            dropdownOptions.map(option =>
              <option
                key={option.id}
                value={option.value}>
                {option.value}
              </option>
            )
          }
        </select>
        <button onClick={() => this.handleClickOnButton()}>
          {sortOrder === OfferModel.SortOrder.Ascending ? '⇧' : '⇩'}
        </button>
      </div>
    )
  }
}