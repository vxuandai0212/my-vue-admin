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
    gender: "0" | "1" | null
    phone: string
    email: string | null
    userStatus: "1" | "2" | "3" | "4" | null
  }
}
