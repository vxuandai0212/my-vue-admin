import UAParser from 'ua-parser-js'
import { useAuthStore } from '@/store'
import { isArray, isString } from '@/utils'

export function useDeviceInfo() {
  const parser = new UAParser()
  const result = parser.getResult()
  return result
}

export function usePermission() {
  const auth = useAuthStore()

  function hasPermission(permission: Auth.RoleType | Auth.RoleType[]) {
    const { userRole } = auth.userInfo

    let has = userRole === 'super'
    if (!has) {
      if (isArray(permission)) {
        has = (permission as Auth.RoleType[]).includes(userRole)
      }
      if (isString(permission)) {
        has = (permission as Auth.RoleType) === userRole
      }
    }
    return has
  }

  return {
    hasPermission,
  }
}
