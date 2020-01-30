import { Request, Response } from 'express'
import {
  I_Buffer_Model_RequestInput
} from '../interfaces/controllers/buffer.interface'


import BufferModel from '../models/user/user.model'
import { respondOnErrorWithJsonApi } from '../utils/controllers/controller.util'
import { respondWithSuccess as respondWithSuccessForModel } from '../utils/controllers/model.util'

import {
  Constants,
  getModelInputFromRequest
} from '../utils/controllers/buffer.util'


export default class Buffer {

  static getModel(req: Request, res: Response) {
    const model = new BufferModel(
      Constants.DefaultModelName,
      Constants.DefaultModelVersion
    )

    const input: I_Buffer_Model_RequestInput = getModelInputFromRequest(req)

    model.predict(input)
      .then((response: any) => {
        respondWithSuccessForModel(response, req, res)
      })
      .catch(error => respondOnErrorWithJsonApi(error, req, res))
  }

}
