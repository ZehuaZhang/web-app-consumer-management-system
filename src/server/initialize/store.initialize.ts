/**
 * Mock Store Initialize
 * 
 * This middlware is to initialize a mock store
 */

import { Application } from 'express'
import { dirname } from 'path'
import { existsSync, writeFileSync, mkdirSync } from 'fs'

export default function initializeStore(path: string, content?: any) {
  content = content || {}
  const contentText = JSON.stringify(content, null, 2)
  const directory = dirname(path)

  return (app: Application) => {
    if (!existsSync(path)) {
      mkdirSync(directory, { recursive: true })
      writeFileSync(path, contentText)
      console.log('store initialized')
    }
  }
}
