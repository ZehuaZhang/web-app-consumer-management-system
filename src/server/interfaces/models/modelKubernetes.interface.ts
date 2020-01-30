export interface I_CallService_Callback {
  (error: any, data?: any): void
}

export interface I_LiteService {
  ip: string
  ports: {
    http: number | undefined
    https: number | undefined
    lightship: number | undefined
  }
}
