declare namespace ApiAuth {
  interface Token {
    token: string
    refreshToken: string
  }

  type UserInfo = Auth.UserInfo
}

declare namespace ApiRoute {
  interface Route {
    routes: AuthRoute.Route[]
    home: AuthRoute.AllRouteKey
  }
}

declare namespace ApiUserManagement {
  interface User {
    id: string
    userName: string | null
    age: number | null
    gender: '0' | '1' | null
    phone: string
    email: string | null
    userStatus: '1' | '2' | '3' | '4' | null
  }
}

declare namespace ApiReport {
  type LatestUpdateType =
    | 'item-sale'
    | 'lead-created'
    | 'item-upload-complete'
    | 'email-notification-sent'

  interface LatestUpdate {
    id: number
    type: LatestUpdateType
    code?: string
    value: string | number
  }

  interface UpcomingEvent {
    id: number
    title: string
    description: string
    startAt: number
  }

  type Category = 'electronic' | 'accessory' | 'digital-good'

  interface PopularCategory {
    type: Category
    value: number
  }

  type Stat = 'sale' | 'lead' | 'profit'

  type Duration = 'weekly' | 'monthly'

  interface OverviewStat {
    type: Stat
    duration: Duration
    currentValue: number
    targetValue: number
    previousDurationValue: number
  }

  type LineChartXAxis = string[] | number[]
  type LineChartYAxis = {
    [key: string]: string[] | number[]
  }

  interface Visit {
    x: LineChartXAxis
    y: LineChartYAxis
  }

  interface SpreadConsumption {
    x: LineChartXAxis
    y: LineChartYAxis
  }

  interface AirPollutant {
    x: LineChartXAxis
    y: LineChartYAxis
  }

  interface Smoking {
    x: LineChartXAxis
    y: LineChartYAxis
    totalMen: number
    totalWomen: number
  }

  type RoadTransportSpendItem = {
    [key: string]: string | number
  }

  interface RoadTransportSpend {
    dimensions: string[]
    source: RoadTransportSpendItem[]
  }

  interface Sale {
    dimensions: string[]
    source: number[]
  }

  interface Transportation {
    name: string
    value: number
  }
}

declare namespace ApiInvoice {
  interface Invoice {
    id: number
    code: string
    createdAt: number
    customerName: string
    status: 1 | 2 | 3 | 4 | 5 | 6
    amount: number
  }

  interface GetAllInvoice {
    total: number
    items: Invoice[]
  }
}
