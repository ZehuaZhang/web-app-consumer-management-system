import { Request, Response } from 'express'
import { UserModel } from 'server/models/user/user.model'
import { OK, BAD_REQUEST } from 'http-status-codes'
import { respondOnSuccess, respondOnError } from 'server/utils/controllers/controller.util'
import { getModelInputFromSearchUserRequest } from 'server/utils/controllers/user.util'

export class SearchController {
  private model: UserModel

  constructor() {
    this.model = new UserModel()
    this.searchUsers = this.searchUsers.bind(this)
  }

  searchUsers(req: Request, res: Response) {
    const input = getModelInputFromSearchUserRequest(req)

    this.model.searchUsers(input)
      .then((response: any) => {
        respondOnSuccess(OK, response, res)
      })
      .catch(error => respondOnError(BAD_REQUEST, error, res))
  }
}
