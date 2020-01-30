export interface I_ErrorResponseData {
  source?: object
  title?: string
  detail: string
}

export interface I_ErrorResponse {
  status: number
  errors: I_ErrorResponseData[]
}

export interface I_HeaderOptions {
  [name: string]: string
}
