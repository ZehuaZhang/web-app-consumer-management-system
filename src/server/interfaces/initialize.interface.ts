import { Application } from 'express'

export interface I_MiddlewareHandle {
  (app: Application): void
}
