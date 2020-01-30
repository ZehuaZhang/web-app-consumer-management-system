/**
 * Utility & Helper Functions for Category Level Distribution Prediction Controller
 */

import { Request } from 'express'
import {
  I_CLDP_Metrics_RequestInput, I_CLDP_Model_RequestInput
} from '../../interfaces/controllers/cldp.interface'
import { I_RequestQuery } from '../../interfaces/request.interface'

import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'cldp'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultMetricsName = 'cldp'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getModelInputFromRequest(req: Request): I_CLDP_Model_RequestInput {
  const query = req.query
  const input: I_CLDP_Model_RequestInput = getModelInputFromQuery(query)

  return input
}

function getModelInputFromQuery(query: I_RequestQuery = {}): I_CLDP_Model_RequestInput {
  const input: I_CLDP_Model_RequestInput = {
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

export function getMetricsInputFromRequest(req: Request): I_CLDP_Metrics_RequestInput {
  const query = req.query

  const input: I_CLDP_Metrics_RequestInput = {
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
  name: 'Category Level Distribution Prediction Routes',
  endpoint: `/api/cldp/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
