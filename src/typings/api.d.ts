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

  interface PlannedIncome {
    x: LineChartXAxis
    y: LineChartYAxis
  }

  type CategorySaleItem = {
    [key: string]: string | number
  }

  interface CategorySale {
    data: CategorySaleItem[]
    totalSale: number
    totalSpend: number
  }

  type BudgetSpendItem = {
    [key: string]: number
  }

  interface BudgetSpend {
    data: BudgetSpendItem[]
    total: number
    totalSale: number
    totalSpend: number
  }

  interface StudyTopic {
    x: LineChartXAxis
    y: LineChartYAxis
    totalSale: number
    totalSpend: number
  }

  interface Sale {
    x: LineChartXAxis
    y: LineChartYAxis
  }

  type CustomerInsideItem = {
    name: string
    value: number
  }

  interface CustomerInside {
    data: CustomerInside[]
  }
}
