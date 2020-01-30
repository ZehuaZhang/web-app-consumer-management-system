import { Query } from '../../utils/constants.util'

export interface I_SLDP_TradeArea_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  trade_area_id: number
  prediction_date: string
  menu_id?: number
  menu: number[]
  confidence_threshold: number
  acceptable_risk: object
}

export interface I_SLDP_Model_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  experiment_id?: string
  business_customer: string
  region_type: Query.regionType
  region_values: number
  date_time: string
  menu_id?: number
  menu_items?: number[]
}

export interface I_SLDP_Model_API_Input {
  model_class?: string
  model_version?: string
  instances: any | any[] | void | Promise<any>
  sku_map: any | Promise<any>
}

export interface I_SLDP_Model_DistributionBin {
  lower_edge: number,
  value: number
}

export interface I_SLDP_Model_Prediction {
  type: string,
  id: string,
  attributes: {
    prediction: number
    distribution_bins: I_SLDP_Model_DistributionBin[]
  }
}

export interface I_SLDP_Model_ResponseOutput {
  data: I_SLDP_Model_Prediction[]
}

export type I_SLDP_Buffer_RequestInput = any

export interface I_SLDP_TradeArea_AcceptableRisk {
  [index: number]: number
}
