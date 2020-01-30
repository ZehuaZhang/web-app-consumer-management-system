/**
 * Utility & Helper Functions for Hub Level Manifest Service Controller
 */

import { Request } from 'express'
import {
  I_HLMS_Model_RequestInput,
  I_HLMS_BODY_V1,
  I_HLMS_TRADE_AREA_V1,
  I_HLMS_SKU_V1,
  I_HLMS_HUB_V1,
  I_HLMS_HUB_LOCATION_V1,
  I_HLMS_MODEL_VERSIONS_V1,
  I_HLMS_POLICIES_V1,
  I_HLMS_Metrics_RequestInput,
} from '../../interfaces/controllers/hlms.interface'
import { I_RequestQuery } from '../../interfaces/request.interface'

import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'hlms'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultMetricsName = 'hlms'
  export const DefaultMetricsVersion = '1.0.0'
}

export function getModelInputFromRequest(req: Request): I_HLMS_Model_RequestInput {
  const query = req.query
  const input: I_HLMS_Model_RequestInput = getModelInputFromQuery(query)

  return input
}

function getModelInputFromQuery(query: I_RequestQuery = {}): I_HLMS_Model_RequestInput {
  const input: I_HLMS_Model_RequestInput = {
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

export function getMetricsInputFromRequest(req: Request): I_HLMS_Metrics_RequestInput {
  const query = req.query

  const input: I_HLMS_Metrics_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    experiment_id: query.experiment_id,
    business_customer: query.business_customer || Query.defaultBusinessCustomer,
    region_type: query.region_type,
    region_values: query.region_values,
    hub: query.hub,
    date_time_start: query.date_time_start,
    date_time_end: query.date_time_end,
    duration: query.duration || Query.defaultDuration,
    aggregation_strategy: query.aggregation_strategy || Query.defaultAggregationStrategy,
    aggregation_units: query.aggregation_units || Query.defaultAggregationUnit
  }

  return input
}

export function parseHlmsBodyV1(body: any): I_HLMS_BODY_V1 {
  // returns a I_HLMS_BODY_V1 type object or throws an error
  if(!body) {
    throw new Error('In parseHlmsBodyV1, missing required body')
  }
  if (typeof body.date !== 'string') {
    throw new Error('In parseHlmsBodyV1, body.date must be string')
  }
  const date: string = body.date
  if (!Array.isArray(body.trade_areas)) {
    throw new Error('In parseHlmsBodyV1, body.trade_areas must be an array')
  }
  const trade_areas: I_HLMS_TRADE_AREA_V1[] = body.trade_areas.map(parseTradeAreaV1)
  if (!Array.isArray(body.skus)) {
    throw new Error('In parseHlmsBodyV1, body.skus must be an array')
  }
  const skus: I_HLMS_TRADE_AREA_V1[] = body.skus.map(parseSkuV1)
  if (!Array.isArray(body.hubs)) {
    throw new Error('In parseHlmsBodyV1, body.hubs must be an array')
  }
  const hubs: I_HLMS_HUB_V1[] = body.hubs.map(parseHubV1)
  const parsedBody: I_HLMS_BODY_V1 = {
    date,
    trade_areas,
    skus,
    hubs
  }
  if (body.model_versions) {
    parsedBody.model_versions = parseModelVersionsV1(body.model_versions)
  }
  if (body.policies) {
    parsedBody.policies = parsePoliciesV1(body.policies)
  }
  return parsedBody
}

function parseSkuV1(sku: any): I_HLMS_SKU_V1 {
  // returns a I_HLMS_SKU_V1 type object or throws an error
  if(!sku) {
    throw new Error('In parseSkuV1, missing required sku')
  }
  if (typeof sku.id !== 'string') {
    throw new Error('In parseSkuV1, sku.id must be a string')
  }
  const id: string = sku.id
  const parsedSku: I_HLMS_SKU_V1 = {
    id
  }
  if (sku.name) {
    if (typeof sku.name !== 'string') {
      throw new Error('In parseSkuV1, sku.name must be a string')
    }
    parsedSku.name = sku.name
  }
  if (sku.stockout_tolerance) {
    if (typeof sku.stockout_tolerance !== 'number') {
      throw new Error('In parseSkuV1, sku.stockout_tolerance must be a number')
    }
    parsedSku.stockout_tolerance = sku.stockout_tolerance
  }
  return parsedSku
}

function parseTradeAreaV1(tradeArea: any): I_HLMS_TRADE_AREA_V1 {
  // returns a I_HLMS_TRADE_AREA_V1 type object or throws an error
  if(!tradeArea) {
    throw new Error('In parseTradeAreaV1, missing required tradeArea')
  }
  if (typeof tradeArea.id !== 'string') {
    throw new Error('In parseTradeAreaV1, tradeArea.id must be a string')
  }
  const id: string = tradeArea.id
  //TODO optional properties
  const parsedTradeArea: I_HLMS_TRADE_AREA_V1 = {
    id
  }
  if (tradeArea.name) {
    if (typeof tradeArea.name !== 'string') {
      throw new Error('In parseTradeAreaV1, tradeArea.name must be a string')
    }
    parsedTradeArea.name = tradeArea.name
  }
  if (tradeArea.menu) {
    if (!Array.isArray(tradeArea.menu)) {
      throw new Error('In parseTradeAreaV1, tradeArea.menu must be an array')
    }
    parsedTradeArea.menu = []
    for (const skuID of tradeArea.menu) {
      if (typeof skuID !== 'string') {
        throw new Error('In parseTradeAreaV1, tradeArea.menu items must be strings')
      }
      parsedTradeArea.menu.push(skuID)
    }
  }
  if (tradeArea.hours) {
    if (typeof tradeArea.hours.open !== 'string') {
      throw new Error('In parseTradeAreaV1, tradeArea.hours.open must be an array')
    }
    if (typeof tradeArea.hours.close !== 'string') {
      throw new Error('In parseTradeAreaV1, tradeArea.hours.close must be an array')
    }
    parsedTradeArea.hours = {
      open: tradeArea.hours.open,
      close: tradeArea.hours.close
    }
  }
  return parsedTradeArea
}

function parseHubV1(hub: any): I_HLMS_HUB_V1 {
  // returns a I_HLMS_HUB_V1 type object or throws an error
  if(!hub) {
    throw new Error('In parseHubV1, missing required hub')
  }
  if (typeof hub.location !== 'object') {
    throw new Error('In parseHubV1, hub.location must be an object')
  }
  const location: I_HLMS_HUB_LOCATION_V1 = parseHubLocationV1(hub.location)
  const parsedHub: I_HLMS_HUB_V1 = {
    location
  }
  if (hub.id) {
    if (typeof hub.id !== 'string') {
      throw new Error('In parseHubV1, hub.id must be a string')
    }
    parsedHub.id = hub.id
  }
  if (hub.name) {
    if (typeof hub.name !== 'string') {
      throw new Error('In parseHubV1, hub.name must be a string')
    }
    parsedHub.name = hub.name
  }
  if (hub.start_time) {
    if (typeof hub.start_time !== 'string') {
      throw new Error('In parseHubV1, hub.start_time must be a string')
    }
    parsedHub.start_time = hub.start_time
  }
  if (hub.end_time) {
    if (typeof hub.end_time !== 'string') {
      throw new Error('In parseHubV1, hub.end_time must be a string')
    }
    parsedHub.end_time = hub.end_time
  }
  return parsedHub
}

function parseHubLocationV1(hubLocation: any): I_HLMS_HUB_LOCATION_V1 {
  // returns a I_HLMS_HUB_LOCATION_V1 type object or throws an error
  if(!hubLocation) {
    throw new Error('In parseHubLocationV1, missing required hubLocation')
  }
  const parsedHubLocation: I_HLMS_HUB_LOCATION_V1 = {
  }
  if (hubLocation.id) {
    if (typeof hubLocation.id !== 'string') {
      throw new Error('In parseHubLocationV1, hubLocation.id must be a string')
    }
    parsedHubLocation.id = hubLocation.id
  }
  if (hubLocation.name) {
    if (typeof hubLocation.name !== 'string') {
      throw new Error('In parseHubLocationV1, hubLocation.name must be a string')
    }
    parsedHubLocation.name = hubLocation.name
  }
  if (hubLocation.lat) {
    if (typeof hubLocation.lat !== 'number') {
      throw new Error('In parseHubLocationV1, hubLocation.lat must be a number')
    }
    parsedHubLocation.lat = hubLocation.lat
  }
  if (hubLocation.lon) {
    if (typeof hubLocation.lon !== 'number') {
      throw new Error('In parseHubLocationV1, hubLocation.lon must be a number')
    }
    parsedHubLocation.lon = hubLocation.lon
  }
  if (hubLocation.trade_area_id) {
    if (typeof hubLocation.trade_area_id !== 'string') {
      throw new Error('In parseHubLocationV1, hubLocation.trade_area_id must be a string')
    }
    parsedHubLocation.trade_area_id = hubLocation.trade_area_id
  }

  return parsedHubLocation
}

function parseModelVersionsV1(modelVersions: any): I_HLMS_MODEL_VERSIONS_V1 {
  // returns a I_HLMS_MODEL_VERSIONS_V1 type object or throws an error
  if(typeof modelVersions !== 'object') {
    throw new Error('In parseModelVersionsV1, modelVersions must be an object')
  }
  const parsedModelVersions: I_HLMS_MODEL_VERSIONS_V1 = {}
  for (const modelClass in modelVersions) {
    if(typeof modelVersions[modelClass] !== 'object') {
      throw new Error('In parseModelVersionsV1, modelVersions values must be objects')
    }
    if (typeof modelVersions[modelClass].model_version !== 'string') {
      throw new Error('In parseModelVersionsV1, model_version values must be strings')
    }
    parsedModelVersions[modelClass] = { model_version:  modelVersions[modelClass].model_version }
  }
  return parsedModelVersions
}

function parsePoliciesV1(policies: any): I_HLMS_POLICIES_V1 {
  // returns a I_HLMS_POLICIES_V1 type object or throws an error
  if(typeof policies !== 'object') {
    throw new Error('In parsePoliciesV1, policies must be an object')
  }
  const parsedPolicies: I_HLMS_POLICIES_V1 = {}
  for (const key in policies) {
    parsedPolicies[key] = policies[key]
  }
  return parsedPolicies
}


export const modelMetadata = {
  name: 'Hub Level Manifest Service Routes',
  endpoint: `/api/hlms/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
