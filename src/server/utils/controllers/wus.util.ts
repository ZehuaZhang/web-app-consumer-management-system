/**
 * Utility & Helper Functions for WUS Controller
 */

import { Request } from 'express'
import {
  I_WUS_Metrics_RequestInput
} from '../../interfaces/controllers/wus.interface'

import { Query } from '../constants.util'

export module Constants {
  export const DefaultMetricsName = 'wus'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getMetricsInputFromRequest(req: Request): I_WUS_Metrics_RequestInput {
  const query = req.query

  const input: I_WUS_Metrics_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
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
