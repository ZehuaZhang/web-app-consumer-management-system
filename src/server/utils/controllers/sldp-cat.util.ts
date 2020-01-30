/**
 * Utility & Helper Functions for SKU Level Demand Prediction using CLDP (SLDP-CAT) Controller
 */

import { Request } from 'express'

import {
  I_SLDPCAT_Metrics_RequestInput, I_SLDPCAT_Model_RequestInput
} from '../../interfaces/controllers/sldp-cat.interface'
import { I_RequestQuery } from '../../interfaces/request.interface'

import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'sldp-cat'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultMetricsName = 'sldp-cat'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getModelInputFromRequest(req: Request): I_SLDPCAT_Model_RequestInput {
  const input: I_SLDPCAT_Model_RequestInput = getModelInputFromQuery(req.query)

  return input
}

function getModelInputFromQuery(query: I_RequestQuery = {}): I_SLDPCAT_Model_RequestInput {
  const input: I_SLDPCAT_Model_RequestInput = {
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
    menu_items: getMenuItemsForInput(query)
  }

  return input
}

export function getMetricsInputFromRequest(req: Request): I_SLDPCAT_Metrics_RequestInput {
  const query = req.query

  const input: I_SLDPCAT_Metrics_RequestInput = {
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
    aggregation_units: query.aggregation_units || Query.defaultAggregationUnit,
    menu_id: query.menu_id,
    menu_items: getMenuItemsForInput(query)
  }

  return input
}

function getMenuItemsForInput(query: I_RequestQuery) {
  if (!query || !query.menu_items) {
    return undefined
  }

  return query.menu_items
    .split(',')
    .map((item: string) => parseInt(item, 10))
}

export const modelMetadata = {
  name: 'SKU Level Demand Prediction Using CLDP (SLDP-CAT) Routes',
  endpoint: `/api/sldp-cat/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
