import { adapter } from '@/utils'
import { mockRequest } from '@/service/request'
import { adapterOfFetchUserList } from './management.adapter'

export const fetchUserList = async () => {
  const data = await mockRequest.post<ApiUserManagement.User[] | null>(
    '/getAllUserList'
  )
  return adapter(adapterOfFetchUserList, data)
}
