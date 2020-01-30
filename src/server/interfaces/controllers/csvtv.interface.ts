import { Query } from '../../utils/constants.util'

export interface I_CSVTV_Metrics_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  business_customer: string
  base_class: string
  base_version: string
  model_experiment_id?: string
  region_type: Query.regionType
  region_values: number
  date_time_start: string
  date_time_end?: string
  duration?: string
  menu_id?: number
  menu_items?: number[]
  aggregation_strategy: Query.aggregationStrategy
  aggregation_units: Query.aggregationUnit
}