import { Query } from '../../utils/constants.util'

export interface I_OGT_Model_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  experiment_id?: string
  business_customer: string
  region_type: Query.regionType
  region_values: number
  date_time: string
  open_times: I_OGT_Query_OpenTimeData[]
  number_of_orders: number
}

export interface I_OGT_Metrics_RequestInput {
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

interface I_OGT_Query_OpenTimeData {
  open: string
  close: string
}
