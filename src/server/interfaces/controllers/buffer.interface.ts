export interface I_Buffer_Model_RequestInput {
  model_class: string
  model_version: string
  include: string
  json_api: boolean
  experiment_id?: string
  business_customer: string
  date_time: string
  sldp_prediction: object
}