import { Request, Response } from 'express'
import { UserModel } from 'server/models/user/user.model'
import { OK, CREATED, BAD_REQUEST } from 'http-status-codes'
import { respondOnSuccess, respondOnError } from 'server/utils/controllers/controller.util'
import {
  getModelInputFromGetUsersRequest,
  getModelInputFromDeleteUserRequest,
  getModelInputFromAddUserRequest,
  getModelInputFromUpdateUserRequest
} from 'server/utils/controllers/user.util'
import { I_User, I_User_UpdateUser_Response } from 'server/interfaces/user.interface'

export class UserController {
  private model: UserModel

  constructor() {
    this.model = new UserModel()
    this.getUsers = this.getUsers.bind(this)
    this.deleteUser = this.deleteUser.bind(this)
    this.addUser = this.addUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  getUsers(req: Request, res: Response) {
    const input = getModelInputFromGetUsersRequest(req)

    this.model.getUsers(input)
      .then((response: I_User[]) => {
        respondOnSuccess(OK, response, res)
      })
      .catch(error => respondOnError(BAD_REQUEST, error, res))
  }

  deleteUser(req: Request, res: Response) {
    const input = getModelInputFromDeleteUserRequest(req)

    this.model.deleteUser(input)
      .then((response: boolean) => {
        respondOnSuccess(OK, response, res)
      })
      .catch(error => respondOnError(BAD_REQUEST, error, res))
  }

  addUser(req: Request, res: Response) {
    const input = getModelInputFromAddUserRequest(req)

    this.model.addUser(input)
      .then((response: boolean) => {
        respondOnSuccess(CREATED, response, res)
      })
      .catch(error => respondOnError(BAD_REQUEST, error, res))
  }

  updateUser(req: Request, res: Response) {
    const input = getModelInputFromUpdateUserRequest(req)

    this.model.updateUser(input)
      .then((response: I_User_UpdateUser_Response) => {
        respondOnSuccess(OK, response, res)
      })
      .catch(error => {
        respondOnError(BAD_REQUEST, error, res)
      })
  }
}
