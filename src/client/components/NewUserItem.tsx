import * as React from 'react'
import { I_UserModel, UserAddData } from 'client/models'
import { numberUtil, dateUtil, stringUtil } from 'client/utils'

export namespace NewUserItem {
  export interface Props {
    fetchAddUser: (addBody: UserAddData) => Promise<void>
    hideNewUserItem: () => void
  }

  export interface State {
    username: string
    email: string
    dateofbirth: string
    balance: string
  }
}

export class NewUserItem extends React.Component<NewUserItem.Props, NewUserItem.State> {
  private UserNameReference: React.RefObject<HTMLInputElement>
  private EmailReference: React.RefObject<HTMLInputElement>
  private DateOfBirthReference: React.RefObject<HTMLInputElement>
  private BalanceReference: React.RefObject<HTMLInputElement>

  constructor(props: NewUserItem.Props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      dateofbirth: '',
      balance: ''
    }

    this.UserNameReference = React.createRef()
    this.EmailReference = React.createRef()
    this.DateOfBirthReference = React.createRef()
    this.BalanceReference = React.createRef()
  }

  reportCustomError(target: HTMLInputElement, message: string) {
    target.setCustomValidity(message)
    target.reportValidity()
  }

  clearCustomError(target: HTMLInputElement) {
    target.setCustomValidity('')
  }

  checkUserName() {
    const { username } = this.state
    const target = this.UserNameReference.current as HTMLInputElement

    const trimmedValue = (username || '').trim()
    if (trimmedValue.length >= 3 && trimmedValue.length <= 10) {
      return true
    }

    this.reportCustomError(target, "User Name should be of length [3, 10]")
    return false
  }

  checkEmail() {
    const { email } = this.state
    const target = this.EmailReference.current as HTMLInputElement

    const trimmedValue = (email || '').trim().toLowerCase()
    if (trimmedValue && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedValue)) {
      return true
    }

    this.reportCustomError(target, "Email should be a valid address")
    return false
  }

  checkDateOfBirth() {
    const { dateofbirth } = this.state
    const target = this.DateOfBirthReference.current as HTMLInputElement

    const isValidDateOfBirth = (value: string) => {
      return (
        value.split(/\W/).filter(word => word).length === 3 &&
        dateUtil.isValidDate(value)
      )
    }

    if (dateofbirth && isValidDateOfBirth(dateofbirth)) {
      return true
    }

    this.reportCustomError(target, "Date of Birth should be a valid date")
    return false
  }

  checkBalance() {
    const { balance } = this.state
    const target = this.BalanceReference.current as HTMLInputElement

    const trimmedValue = parseFloat(stringUtil.getNumericOnly(balance))
    if (trimmedValue && !isNaN(trimmedValue)) {
      return true
    }

    this.reportCustomError(target, "Balance should be a valid number")
    return false
  }

  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement
    this.clearCustomError(target)
  }

  onChange(event: React.ChangeEvent<HTMLInputElement>, stateName: string) {
    const { value } = event.target

    this.setState({
      [stateName]: value
    } as any)
  }

  onClickSubmitButton() {
    const { fetchAddUser, hideNewUserItem } = this.props
    const { username, email, dateofbirth, balance } = this.state
    if (
      this.checkUserName() &&
      this.checkEmail() &&
      this.checkDateOfBirth() &&
      this.checkBalance()
    ) {
      fetchAddUser({
        username: username.trim(),
        email: email.trim(),
        dateofbirth: dateUtil.toEpochTime(dateofbirth),
        balance: parseFloat(stringUtil.getNumericOnly(balance))
      })
      .then(() => {
        hideNewUserItem()
      })
      .catch(error => {
        const usernameTarget = this.UserNameReference.current as HTMLInputElement
        this.reportCustomError(usernameTarget, error)
      })
    }
  }

  render() {
    const { hideNewUserItem } = this.props
    const { username, email, dateofbirth, balance } = this.state

    return (
      <div className='new user-item-container'>
        <div className='new user-item-content'>
          <button className='new user-submit-button' onClick={() => this.onClickSubmitButton()}>
            ✔
          </button>
          <input
            className='new user-item-username'
            value={username}
            onChange={event => this.onChange(event, 'username')}
            onKeyDown={event => this.onKeyDown(event)}
            ref={this.UserNameReference}
          />
          <input
            className='new user-item-email'
            value={email}
            onChange={event => this.onChange(event, 'email')}
            onKeyDown={event => this.onKeyDown(event)}
            ref={this.EmailReference}
          />
          <input
            className='new user-item-dateofbirth'
            value={dateofbirth}
            onChange={event => this.onChange(event, 'dateofbirth')}
            onKeyDown={event => this.onKeyDown(event)}
            ref={this.DateOfBirthReference}
          />
          <input
            className='new user-item-balance'
            value={balance}
            onChange={event => this.onChange(event, 'balance')}
            onKeyDown={event => this.onKeyDown(event)}
            ref={this.BalanceReference}
          />
          <button className='new user-hide-button' onClick={() => hideNewUserItem()}>
            ✖
          </button>
        </div>

      </div >
    )
  }
}