import * as React from 'react'
import { I_UserModel, UserUpdateData } from 'client/models'
import { numberUtil, dateUtil, stringUtil } from 'client/utils'

export namespace UserItem {
  export interface Props {
    user: I_UserModel
    fetchUpdateUser: (id: number, updateBody: UserUpdateData) => Promise<void>
    fetchDeleteUser: (id: number) => void
  }

  export interface State extends I_UserModel {
  }
}

export class UserItem extends React.Component<UserItem.Props> {
  reportCustomError(target: HTMLInputElement, defaultValue: string, message: string) {
    target.value = defaultValue
    target.setCustomValidity(message)
    target.reportValidity()
  }

  clearCustomError(target: HTMLInputElement) {
    target.setCustomValidity('')
  }

  updateInput(target: HTMLInputElement, value: string) {
    target.value = value
    this.clearCustomError(target)
  }

  onChangeUserName(event: React.FocusEvent<HTMLInputElement>) {
    const target: HTMLInputElement = event.target
    const { value } = target
    const { user, fetchUpdateUser } = this.props
    const { username } = user

    const trimmedValue = (value || '').trim()
    if (trimmedValue.length >= 3 && trimmedValue.length <= 10) {
      if (trimmedValue.toLowerCase() !== username.toLowerCase()) {
        fetchUpdateUser(user.id, { username: trimmedValue })
          .then(() => {
            this.updateInput(target, trimmedValue)
          })
          .catch(error => {
            this.reportCustomError(target, username, error)
          })
      } else {
        this.updateInput(target, trimmedValue)
      }
    } else {
      this.reportCustomError(target, username, "User Name should be of length [3, 10]")
    }
  }

  onChangeEmail(event: React.FocusEvent<HTMLInputElement>) {
    const target: HTMLInputElement = event.target
    const { value } = target
    const { user, fetchUpdateUser } = this.props
    const { email } = user

    const trimmedValue = (value || '').trim().toLowerCase()
    if (trimmedValue && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(trimmedValue)) {
      if (trimmedValue !== email) {
        fetchUpdateUser(user.id, { email: trimmedValue })
          .then(() => {
            this.updateInput(target, trimmedValue)
          })
          .catch(error => {
            this.reportCustomError(target, email, error)
          })
      } else {
        this.updateInput(target, trimmedValue)
      }
    } else {
      this.reportCustomError(target, email, "Email should be a valid address")
    }
  }

  onChangeDateOfBirth(event: React.FocusEvent<HTMLInputElement>) {
    const target: HTMLInputElement = event.target
    const { value } = target
    const { user, fetchUpdateUser } = this.props
    const { dateofbirth } = user

    const isValidDateOfBirth = (value: string) => {
      return (
        value.split(/\W/).filter(word => word).length === 3 &&
        dateUtil.isValidDate(value)
      )
    }

    if (value && isValidDateOfBirth(value)) {
      const trimmedValue = dateUtil.toEpochTime(value)
      if (trimmedValue !== dateofbirth) {
        fetchUpdateUser(user.id, { dateofbirth: trimmedValue })
          .then(() => {
            this.updateInput(target, this.formatDateOfBirth(trimmedValue))
          })
          .catch(error => {
            this.reportCustomError(target, this.formatDateOfBirth(dateofbirth), error)
          })
      } else {
        this.updateInput(target, this.formatDateOfBirth(dateofbirth))
      }
    } else {
      this.reportCustomError(target, this.formatDateOfBirth(dateofbirth), "Date of Birth should be a valid date")
    }
  }

  onChangeBalance(event: React.FocusEvent<HTMLInputElement>) {
    const target: HTMLInputElement = event.target
    const { value } = target
    const { user, fetchUpdateUser } = this.props
    const { balance } = user

    const trimmedValue = parseFloat(stringUtil.getNumericOnly(value))
    if (trimmedValue && !isNaN(trimmedValue)) {
      if (trimmedValue !== balance) {
        fetchUpdateUser(user.id, { balance: trimmedValue })
          .then(() => {
            this.updateInput(target, this.formatBalance(trimmedValue))
          })
          .catch(error => {
            this.reportCustomError(target, this.formatBalance(balance), error)
          })
      } else {
        this.updateInput(target, this.formatBalance(balance))
      }
    } else {
      this.reportCustomError(target, this.formatBalance(balance), "Balance should be a valid number")
    }
  }

  onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement
    if (event.key === 'Enter') {
      target.blur()
    } else {
      this.clearCustomError(target)
    }
  }

  formatDateOfBirth(dateofbirth: number) {
    return dateUtil.formatDate(dateofbirth, 'll')
  }

  formatLastModified(lastmodified: number) {
    return dateUtil.formatDate(lastmodified, 'llll')
  }

  formatBalance(balance: number) {
    const integer = numberUtil.getNumberWithCommas(Math.trunc(balance))
    const decimal = balance.toFixed(2).split('.')[1]
    return `$ ${integer}.${decimal}`
  }

  render() {
    const { user, fetchDeleteUser } = this.props
    const { id, username, email, dateofbirth, lastmodified, balance } = user

    return (
      <div className='user-item-container'>
        <div className='user-item-content'>
          <div className='user-item-id' >{id}</div>
          <input
            className='user-item-username'
            defaultValue={username}
            onKeyDown={event => this.onKeyDown(event)}
            onBlur={event => this.onChangeUserName(event)} />
          <input
            className='user-item-email'
            defaultValue={email}
            onKeyDown={event => this.onKeyDown(event)}
            onBlur={event => this.onChangeEmail(event)}
          />
          <input
            className='user-item-dateofbirth'
            defaultValue={this.formatDateOfBirth(dateofbirth)}
            onKeyDown={event => this.onKeyDown(event)}
            onBlur={event => this.onChangeDateOfBirth(event)}
          />
          <input className='user-item-balance'
            defaultValue={this.formatBalance(balance)}
            onKeyDown={event => this.onKeyDown(event)}
            onBlur={event => this.onChangeBalance(event)}
          />
          <div className='user-item-lastmodified'>{this.formatLastModified(lastmodified)}</div>
        </div>
        <button className='user-delete-button' onClick={() => fetchDeleteUser(user.id)}>
          ⓧ
        </button>
      </div >
    )
  }
}