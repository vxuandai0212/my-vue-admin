import type { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store'
import { localStg } from '@/utils'
import { fetchUpdateToken } from '@/service/api'

export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetAuthStore } = useAuthStore()
  const refreshToken = localStg.get('refreshToken') || ''
  const { data } = await fetchUpdateToken(refreshToken)
  if (data) {
    localStg.set('token', data.token)
    localStg.set('refreshToken', data.refreshToken)

    const config = { ...axiosConfig }
    if (config.headers) {
      config.headers.Authorization = data.token
    }
    return config
  }

  resetAuthStore()
  return null
}
