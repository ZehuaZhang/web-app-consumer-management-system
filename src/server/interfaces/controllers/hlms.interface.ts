import { Query } from '../../utils/constants.util'

export interface I_HLMS_Model_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  experiment_id?: string
  business_customer: string
  region_type: Query.regionType
  region_values: number
  date_time: string
}

export interface I_HLMS_Metrics_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  experiment_id?: string
  business_customer: string
  region_type: Query.regionType
  region_values: number
  hub: string
  date_time_start: string
  date_time_end: string
  duration: number
  aggregation_strategy: Query.aggregationStrategy
  aggregation_units: Query.aggregationUnit
}

export interface I_HLMS_BODY_V1 {
  date: string
  trade_areas: I_HLMS_TRADE_AREA_V1[]
  skus: I_HLMS_SKU_V1[]
  hubs: I_HLMS_HUB_V1[]
  model_versions?: I_HLMS_MODEL_VERSIONS_V1
  policies?: I_HLMS_POLICIES_V1
}

export interface I_HLMS_TRADE_AREA_V1 {
  id: string
  name?: string
  menu?: string[]
  hours?: {
    open: string
    close: string
  }
  oldp_adjustment?: number
}

export interface I_HLMS_SKU_V1 {
  id: string
  name?: string
  stockout_tolerance?: number
}

export interface I_HLMS_HUB_V1 {
  id?: string
  name?: string
  location: I_HLMS_HUB_LOCATION_V1
  start_time?: string
  end_time?: string
}

export interface I_HLMS_HUB_LOCATION_V1 {
  id?: string
  name?: string
  lat?: number
  lon?: number
  trade_area_id?: string
}

export interface I_HLMS_MODEL_VERSIONS_V1 {
  [modelClass: string]: {
    model_version: string
  }
}

export interface I_HLMS_POLICIES_V1 {
  [key: string]: any
}

export interface I_HMLS_RESPONSE_V1 {
  data: {
    type: 'manifests'
    id: string
    attributes: {
      hub_manifests: I_HMLS_HUB_MANIFEST_V1[]
    }
  }
  meta?: {
    request_body?: I_HLMS_BODY_V1
    model_versions?: I_HLMS_MODEL_VERSIONS_V1
  }
}

export interface I_HMLS_HUB_MANIFEST_V1 {
  hub: I_HLMS_HUB_V1
  sku_allocations: I_HMLS_SKU_ALLOCATION_V1[]
}

export interface I_HMLS_SKU_ALLOCATION_V1 {
  id: string
  allocation: number
  prediction: number
}
