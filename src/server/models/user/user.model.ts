import { I_Buffer_Model_RequestInput } from '../../interfaces/controllers/user.interface'

import { ModelServices as ModelConstants } from '../../utils/constants.util'

export default class UserModel {
  public train(input: I_Buffer_Model_RequestInput) {
    console.log(`Buffer Model calling train with the following input: `, input)
  }

  public predict(input: I_Buffer_Model_RequestInput) {
    console.log(`Buffer Model calling predict with the following input: `, input)
  }
}