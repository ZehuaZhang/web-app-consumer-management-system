/**
 * Utility & Helper Functions for Cart Size Model Controller
 */

import { Request } from 'express'
import {
  I_CSM_Metrics_RequestInput, I_CSM_Model_RequestInput
} from '../../interfaces/controllers/csm.interface'
import { I_RequestQuery } from '../../interfaces/request.interface'

import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'csm'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultMetricsName = 'csm'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getModelInputFromRequest(req: Request): I_CSM_Model_RequestInput {
  const query = req.query
  const input: I_CSM_Model_RequestInput = getModelInputFromQuery(query)

  return input
}

function getModelInputFromQuery(query: I_RequestQuery = {}): I_CSM_Model_RequestInput {
  const input = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    experiment_id: query.experiment_id,
    business_customer: query.business_customer || Query.defaultBusinessCustomer,
    region_type: query.region_type,
    region_values: query.region_values,
    date_time: query.date_time
  }

  return input
}

export function getMetricsInputFromRequest(req: Request): I_CSM_Metrics_RequestInput {
  const query = req.query

  const input: I_CSM_Metrics_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    experiment_id: query.experiment_id,
    business_customer: query.business_customer || Query.defaultBusinessCustomer,
    region_type: query.region_type,
    region_values: query.region_values,
    date_time_start: query.date_time_start,
    date_time_end: query.date_time_end,
    duration: query.duration,
    aggregation_strategy: query.aggregation_strategy,
    aggregation_units: query.aggregation_units || Query.defaultAggregationUnit
  }

  return input
}

export const modelMetadata = {
  name: 'Cart Sized Model Routes',
  endpoint: `/api/csm/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
