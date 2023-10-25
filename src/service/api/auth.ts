import { mockRequest } from '../request'

export function fetchSmsCode(phone: string) {
  return mockRequest.post<boolean>('/getSmsCode', { phone })
}

export function fetchLogin(userName: string, password: string) {
  return mockRequest.post<ApiAuth.Token>('/login', { userName, password })
}

export function fetchUserInfo() {
  return mockRequest.get<ApiAuth.UserInfo>('/getUserInfo')
}

export function fetchUserRoutes(userId: string) {
  return mockRequest.post<ApiRoute.Route>('/getUserRoutes', { userId })
}

export function fetchUpdateToken(refreshToken: string) {
  return mockRequest.post<ApiAuth.Token>('/updateToken', { refreshToken })
}
