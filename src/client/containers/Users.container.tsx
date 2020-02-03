import * as React from 'react'
import { connect } from 'react-redux'
import { fetchUsers, fetchNextUsers, fetchUpdateUser, fetchDeleteUser, fetchAddUser } from 'client/actions/users.action'
import { changeSearchTerm } from 'client/actions/search.action'
import { UserItem, Sort, Status } from 'client/components'
import { UserModel, UserUpdateData, UserAddData } from 'client/models'
import { IUserState } from 'client/reducers/users.reducer'
import { State } from 'client/reducers'
import { ISearchState } from 'client/reducers/search.reducer'
import { Search } from 'client/components/Search.component'
import { NewUserItem } from 'client/components/NewUserItem'

export namespace Users {
  export interface Props {
    users: IUserState,
    search: ISearchState
    fetchUsers: (sortType?: UserModel.SortType, sortOrder?: UserModel.SortOrder) => void
    fetchNextUsers: () => void,
    changeSearchTerm: (term: string) => void,
    fetchDeleteUser: (id: number) => void,
    fetchUpdateUser: (id: number, updateBody: UserUpdateData) => Promise<void>
    fetchAddUser: (addBody: UserAddData) => Promise<void>
  }

  export interface State {
    shouldShowNewUserItem: boolean
  }
}

class Users extends React.Component<Users.Props, Users.State> {
  private epicUserDetailReference: React.RefObject<HTMLDivElement>

  constructor(props: Users.Props) {
    super(props)

    this.state = {
      shouldShowNewUserItem: false
    }

    this.epicUserDetailReference = React.createRef()
    this.handleClickOnCancelAddUser = this.handleClickOnCancelAddUser.bind(this)
  }

  componentDidMount() {
    const { fetchUsers } = this.props
    fetchUsers()
  }

  handleClickOnShowMore() {
    const { fetchNextUsers } = this.props
    fetchNextUsers()
  }

  handleClickOnAddUser() {
    this.setState({
      shouldShowNewUserItem: true
    })
  }

  handleClickOnCancelAddUser() {
    this.setState({
      shouldShowNewUserItem: false
    })
  }

  render() {
    const { users, search, fetchUsers, fetchUpdateUser, changeSearchTerm, fetchDeleteUser, fetchAddUser } = this.props
    const { sortType, sortOrder, receivedAt, requestStatus, } = users
    const { shouldShowNewUserItem } = this.state
    return (
      <div className="epic-user-container">
        <div className="epic-search">
          <Search
            fetchUsers={fetchUsers}
            changeSearchTerm={changeSearchTerm}
            search={search}
          />
        </div>
        <button className='epic-add-user' onClick={() => this.handleClickOnAddUser()}>
          ➕
        </button>
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
                  shouldShowNewUserItem &&
                  <NewUserItem
                    hideNewUserItem={this.handleClickOnCancelAddUser}
                    fetchAddUser={fetchAddUser}
                  />
                }
                {
                  users.items.map(user =>
                    <UserItem
                      user={user}
                      key={user.id}
                      fetchUpdateUser={fetchUpdateUser}
                      fetchDeleteUser={fetchDeleteUser}
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
  fetchDeleteUser: (id: number) => dispatch(fetchDeleteUser(id)),
  fetchUpdateUser: (id: number, updateBody: UserUpdateData) => dispatch(fetchUpdateUser(id, updateBody)),
  fetchAddUser: (addBody: UserAddData) => dispatch(fetchAddUser(addBody))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users)