import { mockRequest } from '@/service/request'

export function fetchLatestUpdate() {
  return mockRequest.post<ApiReport.LatestUpdate[]>('/reports/latest-update')
}

export function fetchUpcomingEvent() {
  return mockRequest.post<ApiReport.UpcomingEvent[]>('/reports/upcoming-event')
}

export function fetchPopularCategory() {
  return mockRequest.post<ApiReport.PopularCategory[]>(
    '/reports/popular-category'
  )
}

export function fetchOverviewStat() {
  return mockRequest.post<ApiReport.OverviewStat[]>('/reports/overview-stat')
}

export function fetchReportVisit(fromDate: number, toDate: number) {
  return mockRequest.post<ApiReport.Visit>('/reports/visits', {
    fromDate,
    toDate,
  })
}

export function fetchSpreadConsumption(fromDate: number, toDate: number) {
  return mockRequest.post<ApiReport.SpreadConsumption>(
    '/reports/spread-consumption',
    {
      fromDate,
      toDate,
    }
  )
}

export function fetchAirPollutant(fromDate: number, toDate: number) {
  return mockRequest.post<ApiReport.AirPollutant>('/reports/air-pollutant', {
    fromDate,
    toDate,
  })
}

export function fetchSmoking(fromDate: number, toDate: number) {
  return mockRequest.post<ApiReport.Smoking>('/reports/smoking', {
    fromDate,
    toDate,
  })
}

export function fetchRoadTransportSpend() {
  return mockRequest.post<ApiReport.RoadTransportSpend>(
    '/reports/road-transport-spend'
  )
}

export function fetchSale() {
  return mockRequest.post<ApiReport.Sale>('/reports/sales')
}

export function fetchTransportation() {
  return mockRequest.post<ApiReport.Transportation[]>(
    '/reports/transportations'
  )
}
