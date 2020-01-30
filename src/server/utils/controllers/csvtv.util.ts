/**
 * Utility & Helper Functions for CSVTV Controller
 */

import { Request } from 'express'
import {
  I_CSVTV_Metrics_RequestInput
} from '../../interfaces/controllers/csvtv.interface'

import { Query } from '../constants.util'

export module Constants {
  export const DefaultMetricsName = 'csvtv'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getMetricsInputFromRequest(req: Request): I_CSVTV_Metrics_RequestInput {
  const query = req.query

  const input: I_CSVTV_Metrics_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    business_customer: query.business_customer || Query.defaultBusinessCustomer,
    base_class: query.base_class,
    base_version: query.base_version,
    model_experiment_id: query.model_experiment_id,
    region_type: query.region_type,
    region_values: query.region_values,
    date_time_start: query.date_time_start,
    date_time_end: query.date_time_end,
    duration: query.duration,
    menu_id: query.menu_id,
    menu_items: getMenuItemsForMetricsInput(req),
    aggregation_strategy: query.aggregation_strategy,
    aggregation_units: query.aggregation_units || Query.defaultAggregationUnit
  }

  return input
}

function getMenuItemsForMetricsInput(req: Request) {
  const query = req.query

  if (!query.menu_items) {
    return undefined
  }

  return query.menu_items
    .split(',')
    .map((item: string) => parseInt(item, 10))
}
