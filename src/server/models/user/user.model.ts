import { I_Buffer_Model_RequestInput } from '../../interfaces/controllers/buffer.interface'

import ModelKubernetesService from '../services/modelKubernetes.service'
import { ModelServices as ModelConstants } from '../../utils/constants.util'

export default class Model extends ModelKubernetesService {
  private readonly useOlderServiceQueryMethod = true
  
  constructor(modelName: string, modelVersion: string) {
    super(modelName, modelVersion)
  }

  public train(input: I_Buffer_Model_RequestInput) {
    console.log(`Buffer Model calling train with the following input: `, input)
    return this.callService(input, ModelConstants.kubernetes.action.train, this.useOlderServiceQueryMethod)
  }

  public predict(input: I_Buffer_Model_RequestInput) {
    console.log(`Buffer Model calling predict with the following input: `, input)
    return this.callService(input, ModelConstants.kubernetes.action.predict, this.useOlderServiceQueryMethod)
  }
}