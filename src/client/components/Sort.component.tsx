import * as React from 'react'
import { UserModel } from '../models'

export namespace Sort {
  export interface Props {
    sortType: UserModel.SortType
    sortOrder: UserModel.SortOrder
    epicUserDetailReference: React.RefObject<HTMLDivElement>
    fetchUsers: (sortType?: UserModel.SortType, sortOrder?: UserModel.SortOrder) => void
  }
}

export class Sort extends React.Component<Sort.Props> {
  handleClickOnSortItem(sortType: UserModel.SortType) {
    const { fetchUsers, sortOrder, epicUserDetailReference } = this.props
    const SortOrderValueList = Object.keys(UserModel.SortOrder)
      .map(typeName => (UserModel.SortOrder as any)[typeName])
    const nextValue = SortOrderValueList[(SortOrderValueList.indexOf(sortOrder) + 1) % SortOrderValueList.length]

    fetchUsers(sortType, nextValue)

    if (epicUserDetailReference && epicUserDetailReference.current) {
      epicUserDetailReference.current.scrollTo(0, 0)
    }
  }

  getSortTypeLowerCase(type: UserModel.SortType) {
    return UserModel.SortType[type].toLowerCase()
  }

  render() {
    const { sortOrder, sortType } = this.props

    return (
      <div className='sort-container'>
        <div className='sort-content'>
          {
            (Object.keys(UserModel.SortType) as UserModel.SortType[]).map(type => {
              return (
                <div
                  key={this.getSortTypeLowerCase(type)}
                  className={`sort-type-user-item-${this.getSortTypeLowerCase(type)}`}
                  onClick={() => this.handleClickOnSortItem(type)}
                >
                  <span className='sort-item-type'>
                    {UserModel.SortTypeDisplay[type]}
                  </span>
                  <span className='sort-item-order'>
                    {
                      type === sortType ?
                        (sortOrder === UserModel.SortOrder.Ascending ? '⇧' : '⇩') :
                        ' '
                    }
                  </span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}