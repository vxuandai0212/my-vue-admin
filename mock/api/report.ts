import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'
import { Service } from '@/typings/system'
import { useDatetime } from '@/composables'

const { now } = useDatetime()

const apis: MockMethod[] = [
  {
    url: '/mock/reports/latest-update',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.LatestUpdate[]> => {
      const data: ApiReport.LatestUpdate[] = [
        mock({
          id: '@id',
          type: 'item-sale',
          code: '340-00',
          value: 890
        }),
        mock({
          id: '@id',
          type: 'lead-created',
          value: now().subtract(30, 'minutes').unix()
        }),
        mock({
          id: '@id',
          type: 'item-sale',
          code: '360-20',
          value: 940
        }),
        mock({
          id: '@id',
          type: 'item-upload-complete',
          value: now().subtract(45, 'minutes').unix()
        }),
        mock({
          id: '@id',
          type: 'email-notification-sent',
          value: now().subtract(2, 'hours').unix()
        })
      ]
      return {
        code: 200,
        message: 'ok',
        data
      }
    },
  },
  {
    url: '/mock/reports/upcoming-event',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.UpcomingEvent[]> => {
      const data: ApiReport.UpcomingEvent[] = [
        mock({
          id: '@id',
          title: 'Meeting with a client',
          description: 'Tell how to boost website traffic',
          startAt: now().subtract(20, 'minutes').subtract(1, 'hours').unix()
        }),
        mock({
          id: '@id',
          title: 'New project discussion',
          description: 'Business Cards Does Your Business',
          startAt: now().subtract(45, 'minutes').subtract(6, 'hours').unix()
        }),
      ]
      return {
        code: 200,
        message: 'ok',
        data
      }
    },
  },
  {
    url: '/mock/reports/popular-category',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.PopularCategory[]> => {
      const data: ApiReport.PopularCategory[] = [
        {
          type: 'electronic',
          value: 1345
        },
        {
          type: 'accessory',
          value: 1042
        },
        {
          type: 'digital-good',
          value: 980
        },
      ]
      return {
        code: 200,
        message: 'ok',
        data
      }
    },
  },
]

export default apis
