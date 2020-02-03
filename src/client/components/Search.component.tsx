import * as React from 'react'
import { UserModel } from '../models'
import search, { ISearchState } from 'client/reducers/search.reducer'

export namespace Search {
  export interface Props {
    fetchUsers: (sortType?: UserModel.SortType, sortOrder?: UserModel.SortOrder) => void
    changeSearchTerm: (term: string) => void,
    search: ISearchState
  }

  export interface State {
    term: string
  }
}

export class Search extends React.Component<Search.Props, Search.State> {
  constructor(props: Search.Props) {
    super(props)

    const { term } = this.props.search

    this.state = {
      term
    }
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target

    this.changeSearchTermHelper(value)
  }

  onClickClearInputButton() {
    this.changeSearchTermHelper('')
  }

  changeSearchTermHelper(value: string) {
    const { search, fetchUsers, changeSearchTerm } = this.props
    const { term } = search

    this.setState({
      term: value
    })

    const trimmedValue = (value || '').trim()

    if (term !== trimmedValue) {
      changeSearchTerm(trimmedValue)
      fetchUsers()
    }
  }

  render() {
    const { term } = this.state
    return (
      <div className='search-container'>
        <div className='search-content'>
          <input className='search-input' value={term} onChange={event => this.onChange(event)} />
          {
            term &&
            <button className='search-clear-input-button' onClick={() => this.onClickClearInputButton()}>
              ✖
            </button>
          }
        </div>
      </div>
    )
  }
}