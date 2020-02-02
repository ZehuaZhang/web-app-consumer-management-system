import {
  I_User, I_UserCollection,
  I_User_GetUsers_Model_Input,
  I_User_DeleteUser_Model_Input,
  I_User_UpdateUser_Model_Input,
  I_User_AddUser_Model_Input,
  I_User_SearchUsers_Model_Input
} from 'server/interfaces/user.interface'
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { DefaultDBPath } from 'server/utils/constants'
import { UserSortType, UserSortOrder } from 'server/utils/constants/user.constant'
import { dateCompare } from 'server/utils/date.util'
import { swap } from 'server/utils/object.util'
import moment = require('moment')
import { getAlphaNumericOnly } from 'server/utils/string.util'
import { dirname } from 'path'

export class UserModel {
  static index = getInitialId()

  constructor() {
    this.getUsers = this.getUsers.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.addUser = this.addUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.searchUsers = this.searchUsers.bind(this)
  }

  getUsers(input: I_User_GetUsers_Model_Input) {
    const { sort, order, limit, offset } = input
    const users = getUserCollection()

    const usersList: I_User[] =
      getUserList(users)
        .sort((userA: I_User, userB: I_User) =>
          sortUsers(userA, userB, sort, order))

    return Promise.resolve(usersList.slice(offset, offset + limit))
  }

  deleteUser(input: I_User_DeleteUser_Model_Input) {
    const { id } = input
    const users = getUserCollection()

    if (users.hasOwnProperty(id)) {
      delete users[id]
      writeUserCollection(users)
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  }

  addUser(input: I_User_AddUser_Model_Input) {
    const users = getUserCollection()

    if (getUserList(users).every(user => (
      user.username !== input.username?.toLowerCase() &&
      user.email !== input.email?.toLowerCase()))) {

      users[UserModel.index++] = {
        ...input,
        lastmodified: moment.now()
      }
      writeUserCollection(users)
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  }

  updateUser(input: I_User_UpdateUser_Model_Input) {
    const { id } = input
    const users = getUserCollection()

    if (
      users.hasOwnProperty(id) &&
      getUserList(users).every(user => (
        user.id === id ||
        (
          user.username.toLowerCase() !== input.username?.toLowerCase() &&
          user.email !== input.email?.toLowerCase()
        )))
    ) {
      delete input.id
      users[id] = {
        ...users[id],
        ...input,
        lastmodified: moment.now()
      }
      writeUserCollection(users)
      return Promise.resolve(true)
    }

    return Promise.resolve(false)
  }

  searchUsers(input: I_User_SearchUsers_Model_Input) {
    const { term, sort, order, limit, offset } = input
    const users = getUserCollection()

    const usersList: I_User[] =
      getUserList(users)
        .filter((user: I_User) => {
          const { id, username, email } = user
          return (
            id.toString().includes(term) ||
            username.toLowerCase().includes(term) ||
            email.toLowerCase().includes(term)
          )
        })
        .sort((userA: I_User, userB: I_User) =>
          sortUsers(userA, userB, sort, order))

    return Promise.resolve(usersList.slice(offset, offset + limit))
  }
}

function sortUsers(userA: I_User, userB: I_User, sort: UserSortType, order: UserSortOrder) {
  switch (sort) {
    case UserSortType.ID:
      {
        const { itemA, itemB } = getCompareItems(userA.id, userB.id, order)
        return itemA - itemB
      }
    case UserSortType.UserName:
      {
        let { itemA, itemB } = getCompareItems(userA.username, userB.username, order)
        itemA = getAlphaNumericOnly(itemA)
        itemB = getAlphaNumericOnly(itemB)
        return itemA.localeCompare(itemB)
      }
    case UserSortType.DateOfBirth:
      {
        const { itemA, itemB } = getCompareItems(userA.dateofbirth, userB.dateofbirth, order)
        return dateCompare(itemA, itemB)
      }
    case UserSortType.Email:
      {
        let { itemA, itemB } = getCompareItems(userA.email, userB.email, order)
        itemA = getAlphaNumericOnly(itemA.substring(0, itemA.indexOf('@')))
        itemB = getAlphaNumericOnly(itemB.substring(0, itemB.indexOf('@')))
        return itemA.localeCompare(itemB)
      }
    case UserSortType.LastModified:
      {
        const { itemA, itemB } = getCompareItems(userA.lastmodified, userB.lastmodified, order)
        return dateCompare(itemA, itemB)
      }
    case UserSortType.Balance:
      {
        const { itemA, itemB } = getCompareItems(userA.balance, userB.balance, order)
        return itemA - itemB
      }
    default:
      throw ('Sort Type Unknown when Fetching from User DB')
  }
}

function getInitialId() {
  const users = getUserCollection()
  const userList = getUserList(users)

  if (userList.length) {
    return userList[userList.length - 1].id + 1
  }

  return 1
}

function getUserList(users: I_UserCollection) {
  return Object.keys(users)
    .map((userId: string) => ({
      id: parseInt(userId),
      ...users[userId]
    }))
}

function getUserCollection(path = DefaultDBPath, content?: object): I_UserCollection {
  initializeUserStore(path, content || {})

  const usersText = readFileSync(DefaultDBPath, 'utf8')
  const users = JSON.parse(usersText)

  return users
}

function initializeUserStore(path: string, content: object) {
  const contentText = JSON.stringify(content, null, 2)
  const directory = dirname(path)

  if (!existsSync(path)) {
    mkdirSync(directory, { recursive: true })
    writeFileSync(path, contentText)
  }
}

function writeUserCollection(users: I_UserCollection) {
  writeFileSync(DefaultDBPath, JSON.stringify(users, null, 2), 'utf8')
}

function getCompareItems<T>(itemA: T, itemB: T, order: UserSortOrder) {
  console.log(order, UserSortOrder.Descending)
  if (order === UserSortOrder.Descending) {
    return swap(itemA, itemB)
  }

  return {
    itemA,
    itemB
  }
}