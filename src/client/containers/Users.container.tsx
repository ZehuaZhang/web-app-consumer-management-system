import * as React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, fetchNextUsers, fetchUpdateUser } from 'client/actions/users.action'
import { changeSearchTerm } from 'client/actions/search.action'
import { UserItem, Sort, Status } from 'client/components'
import { UserModel, UserUpdateData } from 'client/models'
import { IUserState } from 'client/reducers/users.reducer'
import { State } from 'client/reducers'
import { ISearchState } from 'client/reducers/search.reducer'

export namespace Users {
  export interface Props {
    users: IUserState,
    search: ISearchState
    fetchUsers: (sortType?: UserModel.SortType, sortOrder?: UserModel.SortOrder) => void
    fetchNextUsers: () => void,
    changeSearchTerm: (term: string) => void,
    fetchUpdateUser: (id: number, updateBody: UserUpdateData) => Promise<void>
  }
}

class Users extends React.Component<Users.Props> {
  private epicUserDetailReference: React.RefObject<HTMLDivElement>

  constructor(props: Users.Props) {
    super(props)

    this.epicUserDetailReference = React.createRef()
  }

  componentDidMount() {
    const { fetchUsers } = this.props
    fetchUsers()
  }

  handleClickOnShowMore() {
    const { fetchNextUsers } = this.props
    fetchNextUsers()
  }

  render() {
    const { users, fetchUsers, fetchUpdateUser } = this.props
    const { sortType, sortOrder, receivedAt, requestStatus, } = users
    return (
      <div className="epic-user-container">
        <div className="epic-user">
          <Sort
            fetchUsers={fetchUsers}
            sortOrder={sortOrder}
            sortType={sortType}
            epicUserDetailReference={this.epicUserDetailReference}
          />
          <div className='epic-user-detailed-container-wrapper' >
            <div className='epic-user-detailed-container' ref={this.epicUserDetailReference}>
              <div className='epic-user-gallery-container'>
                {
                  users.items.map(user =>
                    <UserItem
                      user={user}
                      key={user.id}
                      fetchUpdateUser={fetchUpdateUser}
                    />
                  )
                }
              </div>
              <button className="epic-user-show-more-button" onClick={() => this.handleClickOnShowMore()}>
                Show More
              </button>
              <Status
                receivedAt={receivedAt}
                requestStatus={requestStatus}
              />
            </div>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state: State) => {
  const { users, search } = state
  return {
    users,
    search
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  fetchUsers: (sortType?: UserModel.SortType, sortOrder?: UserModel.SortOrder) => dispatch(fetchUsers(sortType, sortOrder)),
  fetchNextUsers: () => dispatch(fetchNextUsers()),
  changeSearchTerm: (term: string) => dispatch(changeSearchTerm(term)),
  fetchUpdateUser: (id: number, updateBody: UserUpdateData) => dispatch(fetchUpdateUser(id, updateBody))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)