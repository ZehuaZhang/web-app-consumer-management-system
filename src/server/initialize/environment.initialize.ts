/**
 * Environment Initialize
 * 
 * Initialize other modules, except middlewares and routes, like importing enviroment variables to process.env
 */

import dotenv from 'dotenv'

export default function initializeEnvironment() {
  console.log('Initializing Environment ...')
  console.group()
  initializeDotEnv()
  initializeNewRelic()
  console.groupEnd()
  console.log('Initializing Environment ... Done\n')
}

function initializeDotEnv(): void {
  dotenv.config()
  console.log('dotenv initialized')
}

function initializeNewRelic(): void {
  if (process.env.NEWRELIC_LICENSE_KEY) {
    require('newrelic')
    console.log('newrelic initialized')
  }
}

