/**
 * Utility & Helper Functions for Sku Level Demand Prediction Controller
 */

import Moment from 'moment'
import { Request } from 'express'
import RedisClient from '../../models/clients/redis.client'
import redis from 'redis'
import {
  I_SLDP_TradeArea_RequestInput, I_SLDP_Model_RequestInput,
  I_SLDP_Model_ResponseOutput, I_SLDP_Model_Prediction, I_SLDP_Model_DistributionBin,
  I_SLDP_TradeArea_AcceptableRisk, I_SLDP_Model_API_Input
} from '../../interfaces/controllers/sldp.interface'
import { I_ErrorResponse } from '../../interfaces/controllers/controller.interface'
import { I_RequestQuery } from '../../interfaces/request.interface'

import BigQueryClient from '../../models/clients/bigQuery.client'
import { isNumber } from '../object.util'
import { Api, Query, Metadata } from '../constants.util'

export module Constants {
  export const DefaultModelName = 'sldp'
  export const DefaultModelVersion = '1.0.0'
  export const DefaultTradeAreaModelName = 'dse-model-sldp-trade-area'
  export const DefaultTradeAreaModelVersion = '2.0.14'
  export const DefaultBufferModelName = 'dse-model-sldp-buffer'
  export const DefaultBufferModelVersion = '0.0.7'
  export const DefaultMetricsName = 'sldp'
  export const DefaultMetricsVersion = '1.0.0'
}

function queryRedisForPredictionInput(keyString: string) {
  const client = RedisClient.getClient()
  

  return RedisClient.getClient().getAsync(keyString)
    .then((response) => {
      if (!response) return response
      return JSON.parse(response)
    })
}

function cachePredictionInput(keyString: string, predictionInput: string) {
  const client = RedisClient.getClient()

  client.set(keyString, predictionInput, redis.print)
}

function queryRedisForSkuMap() {
  const client = RedisClient.getClient()

  return RedisClient.getClient().getAsync(`skuMap`)
    .then((response) => {
      if (!response) return response
      return JSON.parse(response)
    })
}

function cacheSkuMap(skuMap: string) {
  const client = RedisClient.getClient()

  client.set('skuMap', skuMap)
}

function queryOrdersForDate(orderDate: string, tradeArea: number): any {
  const parsedDate = new Date(orderDate.split('T')[0])
  const formattedDate = Moment(parsedDate).format('YYYY-MM-DD')
  const orderDayFourteen = Moment(parsedDate).subtract(14, 'days').format('YYYY-MM-DD')
  const orderDayTwentyOne = Moment(parsedDate).subtract(21, 'days').format('YYYY-MM-DD')

  let input: I_SLDP_Model_API_Input

  return Promise.all([
    queryRedisForSkuMap(),
    queryRedisForPredictionInput(`${formattedDate}+${tradeArea}`)
  ])
    .then(([sku_map, instances]) => {
      input = {
        sku_map,
        instances
      }

      const bigQueryPromiseList = [
        bigQueryForSkuMap(sku_map),
        bigQueryForInstances(instances, orderDayFourteen, orderDayTwentyOne)
      ]
      return Promise.all(bigQueryPromiseList)
    })
    .then(([skuMapResults, predictionInputResults]) => {
      if (skuMapResults) {
        input.sku_map = {}

        let indexCount = 0
        skuMapResults.forEach((order: any) => {
          order.items_ordered = JSON.parse(order.items_ordered)
          Object.keys(order.items_ordered)
            .forEach((sku: string) => {
              if (!input.sku_map[sku]) {
                input.sku_map[sku] = indexCount++
              }
            })
        })
        cacheSkuMap(JSON.stringify(input.sku_map))
      }

      if (predictionInputResults) {
        input.instances = [
          {
            "input_1:0": new Array(Object.keys(input.sku_map).length).fill(0),
            "input_2:0": new Array(Object.keys(input.sku_map).length).fill(0),
          }
        ]
        predictionInputResults.forEach((order: any) => {
          order.items_ordered = JSON.parse(order.items_ordered)
          const itemsOrdered: any = Object.keys(order.items_ordered)
          itemsOrdered.forEach((sku: string) => {
            const index = input.sku_map[sku]
            const orderQty = order.items_ordered[sku]
            const orderDate = order.cust_order.date.value
            const orderTradeArea = order.trade_area.id
            if (orderDate === orderDayFourteen && tradeArea === orderTradeArea) {
              input.instances[0]["input_1:0"][index] += orderQty
            } else if (orderDate === orderDayTwentyOne && tradeArea === orderTradeArea) {
              input.instances[0]["input_2:0"][index] += orderQty
            }
          })
        })
        cachePredictionInput(`${formattedDate}+${tradeArea}`, JSON.stringify(input.instances))
      }

      return Promise.resolve(input)
    })
}

function bigQueryForSkuMap(cachedSkuMap: any) {
  const bigqueryClient = BigQueryClient.getClient()

  if (!cachedSkuMap) {
    const options = {
      query: `SELECT *
      FROM\`zume-data.dev.order_level_data_v_0_4_0\`
      WHERE cust_order.date
      BETWEEN '2017-01-01' AND '2018-12-28'`,
      location: 'US',
    }

    return bigqueryClient.createQueryJob(options)
      .then(([skuMapJob]) =>
        skuMapJob.getQueryResults()
      )
      .then(([skuMapResults]) => skuMapResults)
  }

  return Promise.resolve(undefined)
}

function bigQueryForInstances(cachedInstance: any, orderDayFourteen: string, orderDayTwentyOne: string) {
  const bigqueryClient = BigQueryClient.getClient()

  if (!cachedInstance) {
    const options = {
      query: `SELECT *
      FROM\`zume-data.dev.order_level_data_v_0_4_0\`
      WHERE cust_order.date='${orderDayFourteen}'
      OR cust_order.date='${orderDayTwentyOne}'`,
      location: 'US',
    }

    return bigqueryClient.createQueryJob(options)
      .then(([predictionInputJob]) =>
        predictionInputJob.getQueryResults()
      )
      .then(([predictionInputResults]) => predictionInputResults)
  }

  return Promise.resolve(undefined)
}

export function getTradeAreaInputFromRequest(req: Request): I_SLDP_TradeArea_RequestInput {
  const query = req.query
  const params = req.params

  const input: I_SLDP_TradeArea_RequestInput = {
    model_class: query.model_class,
    model_version: query.model_version,
    include: query.include,
    json_api: true,
    trade_area_id: parseInt(params.trade_area_id, 10),
    prediction_date: query.prediction_date,
    confidence_threshold: query.confidence_threshold || Query.defaultConfidenceThreshold,
    menu: getMenuForTradeAreaInput(req),
    acceptable_risk: getAcceptableRiskForTradeAreaInput(req)
  }

  return input
}

export function getModelInputFromRequest(req: Request) {
  const query = req.query || {}

  return queryOrdersForDate(query.date_time, Number(query.region_values))
}

function getModelInputFromQuery(query: I_RequestQuery = {}) {
  const input: I_SLDP_Model_RequestInput = {
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
    menu_items: getMenuItemsForModelInput(query)
  }

  return input
}

export function getResponseFromModelOutput(response: any, input: I_SLDP_Model_API_Input): Promise<any> {
  return Promise.resolve()
    .then(() => {
      console.log('raw: ', response.body)
      let rawResponse = response.body.predictions[0]
      let shapedBody: I_SLDP_Model_ResponseOutput = { data: [] }
      let skuMap = Object.entries(input.sku_map)
      let pred: I_SLDP_Model_Prediction
      let distBin: I_SLDP_Model_DistributionBin
      let numBins: number = rawResponse['lambda_2/Reshape:0'].length

      skuMap.forEach((skuAndIndex) => {
        let sku: string = skuAndIndex[0]
        let skuIndex = skuAndIndex[1] as number

        pred = {
          id: sku,
          type: 'sldp_prediction',
          attributes: {
            prediction: rawResponse['lambda/Ceil:0'][skuIndex],
            distribution_bins: []
          }
        }

        for (let binIndex = 0; binIndex < numBins; binIndex++) {
          distBin = {
            lower_edge: rawResponse['lambda_2/Reshape:0'][binIndex][0][skuIndex],
            value: rawResponse['lambda_1/Select:0'][binIndex][0][skuIndex]
          }
          pred.attributes.distribution_bins.push(distBin)
        }

        shapedBody.data.push(pred)
      })

      response.body = shapedBody
      console.log('shaped: ', response.body)
      return response
    })
}

export function isTradeAreaRequestValid(input: I_SLDP_TradeArea_RequestInput, req: Request) {
  return (
    // currently menu_id is not supported
    !req.query.menu_id &&
    // menu list should not be empty
    input.menu.length > 0
  )
}

export function getTradeAreaError(input: I_SLDP_TradeArea_RequestInput, req: Request) {
  if (req.query.menu_id) {
    return getTradeAreaErrorResponseForNotSupportedMenuID()
  }

  if (input.menu.length === 0) {
    return getTradeAreaErrorResponseForEmptyMenuList()
  }
}

function getTradeAreaErrorResponseForNotSupportedMenuID(): I_ErrorResponse {
  const response = {
    status: 400,
    errors: [{
      source: {
        'parameter': 'menu_id'
      },
      title: 'The backend responded with an error',
      detail: 'menu_id is not currently supported.'
    }]
  }
  return response
}

function getTradeAreaErrorResponseForEmptyMenuList(): I_ErrorResponse {
  const response = {
    status: 400,
    errors: [{
      source: {
        'parameter': 'menu'
      },
      title: 'The backend responded with an error',
      detail: 'menu is required.'
    }]
  }
  return response
}

function getMenuForTradeAreaInput(req: Request) {
  const menu = req.query.menu

  if (Array.isArray(menu)) {
    return menu
  }

  return [menu].filter(entry => isNumber(entry))
}

function getAcceptableRiskForTradeAreaInput(req: Request) {
  const menu = getMenuForTradeAreaInput(req)
  const query = req.query

  let acceptable_risk: I_SLDP_TradeArea_AcceptableRisk = {}
  menu.forEach((entry: number) => {
    if (query.acceptable_risk &&
      isNumber(query.acceptable_risk[entry])) {
      acceptable_risk[entry] = query.acceptable_risk[entry]
    } else {
      acceptable_risk[entry] = Query.defaultAcceptableRisk
    }
  })

  return acceptable_risk
}

function getMenuItemsForModelInput(query: I_RequestQuery) {
  if (!query || !query.menu_items) {
    return undefined
  }

  return query.menu_items
    .split(',')
    .map((item: string) => parseInt(item, 10))
}

export const modelMetadata = {
  name: 'SKU Level Demand Prediction Routes',
  endpoint: `/api/sldp/${Api.version.v1}/`,
  params: Metadata.getParams(getModelInputFromQuery()),
}
