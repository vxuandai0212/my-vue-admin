import type { MockMethod } from 'vite-plugin-mock'
import { Service } from '@/typings/system'
import { invoiceModel } from '../model'

const apis: MockMethod[] = [
  {
    url: '/mock/invoices/get-all',
    method: 'post',
    response: (
      options: Service.MockOption
    ): Service.MockServiceResult<ApiInvoice.GetAllInvoice> => {
      const { status, page, limit } = options.body
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      let items
      let filterItems

      if (status && status !== 'all') {
        filterItems = invoiceModel.list.filter((i: ApiInvoice.Invoice) => i.status === status)
        items = filterItems.filter(
          (_i: any, index: number) => index <= endIndex && index >= startIndex
        )
      } else {
        filterItems = invoiceModel.list
        items = filterItems.filter(
          (_i: any, index: number) => index <= endIndex && index >= startIndex
        )
      }

      return {
        code: 200,
        message: 'ok',
        data: {
          total: filterItems.length,
          items,
        },
      }
    },
  },
]

export default apis
