/**
 * General Constants
 */

export module Api {
  export module version {
    export const v1 = "v1"
  }
}

export module ModelServices {
  export module kubernetes {
    export enum action {
        train = 'train',
        predict = 'predict'
    }

    export const serviceStatusExceptionList = [
      'porta-helm'
    ]
  }
}

export module Query {
  export enum aggregationStrategy {
    average = 'average',
    mean = 'mean',
    sum = 'sum'
  }
  export enum regionType {
    trade_area = 'trade_area',
    polygon = 'polygon',
    zip_code = 'zip_code',
    area_code = 'area_code',
    center_point_with_radius = 'center_point_with_radius',
    center_point_with_travel_time = 'center_point_with_travel_time'
  }
  export enum aggregationUnit {
    daily = 'daily', 
    weekly = 'weekly', 
    monthly = 'monthly'
  }

  export const defaultConfidenceThreshold = 0.95
  export const defaultAcceptableRisk = 0.95
  export const defaultBusinessCustomer = 'zume_pizza'
  export const defaultAggregationStrategy = aggregationStrategy.average
  export const defaultAggregationUnit = aggregationUnit.daily
  export const defaultDuration = 28
}

export module HttpHeader {
  export module contentType {
    export const name = 'Content-Type'
    export enum value {
      jsonApi = 'application/vnd.api+json',
      json = 'application/json'
    }
  }
  export module accept {
    export const name = 'Accept'
    export enum value {
      jsonApi = 'application/vnd.api+json',
      json = 'application/json'
    }
  }
  export module Authorization {
    export const name = 'Authorization'
    export enum value {
      prefix = 'Bearer'
    }
  }
}

export module Metadata {
  export function getParams(input: any) {
    return Object.keys(input).filter(item => item !== 'include' && item !== 'json_api')
  }
}
