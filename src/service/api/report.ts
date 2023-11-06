import { mockRequest } from '@/service/request'

export function fetchReportVisit(fromDate: number, toDate: number) {
  return mockRequest.post<ApiReport.Visit>('/reports/visits', {
    fromDate,
    toDate,
  })
}
