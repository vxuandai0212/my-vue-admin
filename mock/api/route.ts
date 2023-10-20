import type { MockMethod } from 'vite-plugin-mock'
import { homeModel, routeModel, userModel } from '../model'

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const { userId = undefined } = options.body

      const role =
        userModel.find((item) => item.userId === userId)?.userRole || 'user'

      const home = homeModel[role]

      const filterRoutes = routeModel[role]

      return {
        code: 200,
        message: 'ok',
        data: {
          routes: filterRoutes,
          home,
        },
      }
    },
  },
]

export default apis
