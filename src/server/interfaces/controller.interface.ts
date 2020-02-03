export interface ResponseError {
    message: string
    stack: string
    error: any
    [name: string]: any
}