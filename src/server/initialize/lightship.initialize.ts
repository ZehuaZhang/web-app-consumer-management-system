/**
 * Lightship Initialize
 * 
 * This middleware checks for liveness of services in Kubenetes and also could gracefully shut down services
 */

const { createLightship } = require('lightship')

export default function initializeLightship(port?: string): any {
  const lightship = createLightship({
    port
  })

  console.log('lightship initialized')

  return lightship
}
