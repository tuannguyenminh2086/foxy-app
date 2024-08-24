export interface IResponse<T> {
  status: string,
  data?: T,
  message?: string
}
