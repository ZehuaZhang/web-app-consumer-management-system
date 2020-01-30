/**
 * Utility & Helper Functions for Buffer Prediction Controller
 */

import { Request } from 'express'
import {
  I_Buffer_Model_RequestInput
} from '../../interfaces/controllers/buffer.interface'


import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'dse-model-buffer'
  export const DefaultModelVersion = '1.0.0'
}

export function getModelInputFromRequest(req: Request): I_Buffer_Model_RequestInput {
  const query = req.query

  const input: I_Buffer_Model_RequestInput = getModelInputFromQuery(query)

  return input
}

function getModelInputFromQuery(query: any = {}): I_Buffer_Model_RequestInput {

  const input: I_Buffer_Model_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    experiment_id: query.experiment_id,
    business_customer: query.business_customer || Query.defaultBusinessCustomer,
    date_time: query.date_time,
    sldp_prediction: query.sldp_prediction
  }

  return input
}
module.exports.modelMetadata = {
  name: 'Buffer Prediction Routes',
  endpoint: `/api/buffer/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
