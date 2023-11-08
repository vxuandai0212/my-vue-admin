import { mock } from 'mockjs'

export const invoiceModel: ApiInvoice.Invoice[] = mock({
  'list|1000': [
    {
      id: '@id',
      code: /^(AA-)(\d{2})(-\d{2})(-\d{4})$/,
      createdAt: '@integer(1696753078000, 1699431478000)',
      customerName: '@name',
      'status|1': [1, 2, 3, 4, 5, 6],
      amount: '@integer(100, 10000)',
    },
  ],
})
