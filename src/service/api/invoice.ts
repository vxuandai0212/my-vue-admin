import { mockRequest } from '@/service/request'

export function fetchAllInvoice(body) {
  return mockRequest.post<ApiInvoice.GetAllInvoice>('/invoices/get-all', body)
}
