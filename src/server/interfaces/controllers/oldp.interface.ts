import { Query } from '../../utils/constants.util'

export interface I_OLDP_TradeArea_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  trade_area_id: number
  prediction_date: string
  confidence_threshold: number
}

export interface I_OLDP_Model_RequestInput {
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

export interface I_OLDP_Metrics_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  experiment_id?: string
  business_customer: string
  region_type: Query.regionType
  region_values: number
  date_time_start: string
  date_time_end?: string
  duration?: number
  aggregation_strategy: Query.aggregationStrategy
  aggregation_units: Query.aggregationUnit
}
