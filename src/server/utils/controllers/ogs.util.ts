/**
 * Utility & Helper Functions for Order Generation Model (OG-SPACE) Controller
 */

import { Request } from 'express'
import {
  I_OGS_Metrics_RequestInput, I_OGS_Model_RequestInput
} from '../../interfaces/controllers/ogs.interface'

import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'ogs'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultMetricsName = 'ogs'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getModelInputFromRequest(req: Request): I_OGS_Model_RequestInput {

  const input: I_OGS_Model_RequestInput = getModelInputObjectFromRequest(req)

  return input
}

function getModelInputObjectFromRequest(req: any = {}): I_OGS_Model_RequestInput {

  const query = req.query || {}

  const input: I_OGS_Model_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    experiment_id: query.experiment_id,
    business_customer: query.business_customer || Query.defaultBusinessCustomer,
    region_type: query.region_type,
    region_values: query.region_values,
    date_time: query.date_time,
    menu_id: query.menu_id,
    menu_items: getMenuItemsForModelInput(req)
  }

  return input
}

export function getMetricsInputFromRequest(req: Request): I_OGS_Metrics_RequestInput {
  const query = req.query

  const input: I_OGS_Metrics_RequestInput = {
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

function getMenuItemsForModelInput(req: Request) {
  const query = req.query

  if (!query || !query.menu_items) {
    return undefined
  }

  return query.menu_items
    .split(',')
    .map((item: string) => parseInt(item, 10))
}

export const modelMetadata = {
  name: 'Order Generation Model (OG-SPACE) Routes',
  endpoint: `/api/ogs/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputObjectFromRequest()),
}
