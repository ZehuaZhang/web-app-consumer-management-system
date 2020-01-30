/**
 * Utility & Helper Functions for Order Level Demand Prediction Controller
 */

import { Request } from 'express'
import {
  I_OLDP_TradeArea_RequestInput, I_OLDP_Metrics_RequestInput, I_OLDP_Model_RequestInput
} from '../../interfaces/controllers/oldp.interface'
import { I_RequestQuery } from '../../interfaces/request.interface'

import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'oldp'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultTradeAreaModelName = 'dse-model-oldp-trade-area'
  export const DefaultTradeAreaModelVersion = '1.1.1'
  export const DefaultMetricsName = 'oldp'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getTradeAreaInputFromRequest(req: Request): I_OLDP_TradeArea_RequestInput {
  const query = req.query
  const params = req.params

  const input: I_OLDP_TradeArea_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    trade_area_id: parseInt(params.trade_area_id, 10),
    prediction_date: query.prediction_datetime,
    confidence_threshold: query.confidence_threshold || Query.defaultConfidenceThreshold
  }

  return input
}

export function getModelInputFromRequest(req: Request): I_OLDP_Model_RequestInput {
  const query = req.query
  const input: I_OLDP_Model_RequestInput = getModelInputFromQuery(query)

  return input
}

function getModelInputFromQuery(query: I_RequestQuery = {}): I_OLDP_Model_RequestInput {
  const input: I_OLDP_Model_RequestInput = {
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

export function getMetricsInputFromRequest(req: Request): I_OLDP_Metrics_RequestInput {
  const query = req.query

  const input: I_OLDP_Metrics_RequestInput = {
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

export function getErrorWhenNoPrediction() {
  const error = {
    status: 404,
    errors: [
      {
        message: 'No prediction found!',
        detail: 'No prediction found!'
      }
    ]
  }
  return error
}

export function getErrorWhenNegativeTradeAreaID() {
  const error = {
    status: 400,
    errors: [
      {
        message: 'Bad Request: Negative trade area id! Should be a positive integer',
        detail: 'Bad Request: Negative trade area id! Should be a positive integer'
      }
    ]
  }
  return error
}


export const modelMetadata = {
  name: 'Order Level Demand Prediction Routes',
  endpoint: `/api/oldp/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
