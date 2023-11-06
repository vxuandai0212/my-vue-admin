import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'
import { Service } from '@/typings/system'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'

dayjs.extend(relativeTime)

export function useDatetime() {
  function datetime(value: any) {
    return dayjs(value).locale('vi')
  }

  function now() {
    return dayjs().locale('vi')
  }

  function timeFromNow(value: any) {
    return dayjs(value).locale('vi').fromNow(true)
  }

  return {
    now,
    datetime,
    timeFromNow,
  }
}

const { now, datetime } = useDatetime()

type TimeGroupBy = 'second' | 'minute' | 'hour' | 'day'

const apis: MockMethod[] = [
  {
    url: '/mock/reports/latest-update',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.LatestUpdate[]> => {
      const data: ApiReport.LatestUpdate[] = [
        {
          id: mock('@id'),
          type: 'item-sale',
          code: '340-00',
          value: 890,
        },
        {
          id: mock('@id'),
          type: 'lead-created',
          value: now().subtract(30, 'minutes').unix(),
        },
        {
          id: mock('@id'),
          type: 'item-sale',
          code: '360-20',
          value: 940,
        },
        {
          id: mock('@id'),
          type: 'item-upload-complete',
          value: now().subtract(45, 'minutes').unix(),
        },
        {
          id: mock('@id'),
          type: 'email-notification-sent',
          value: now().subtract(2, 'hours').unix(),
        },
      ]
      return {
        code: 200,
        message: 'ok',
        data,
      }
    },
  },
  {
    url: '/mock/reports/upcoming-event',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.UpcomingEvent[]> => {
      const data: ApiReport.UpcomingEvent[] = [
        {
          id: mock('@id'),
          title: 'Meeting with a client',
          description: 'Tell how to boost website traffic',
          startAt: now().subtract(20, 'minutes').subtract(1, 'hours').unix(),
        },
        {
          id: mock('@id'),
          title: 'New project discussion',
          description: 'Business Cards Does Your Business',
          startAt: now().subtract(45, 'minutes').subtract(6, 'hours').unix(),
        },
      ]
      return {
        code: 200,
        message: 'ok',
        data,
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
          value: 1345,
        },
        {
          type: 'accessory',
          value: 1042,
        },
        {
          type: 'digital-good',
          value: 980,
        },
      ]
      return {
        code: 200,
        message: 'ok',
        data,
      }
    },
  },
  {
    url: '/mock/reports/overview-stat',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.OverviewStat[]> => {
      const data: ApiReport.OverviewStat[] = [
        {
          type: 'sale',
          duration: 'weekly',
          currentValue: 1345,
          targetValue: 1500,
          previousDurationValue: 1300,
        },
        {
          type: 'lead',
          duration: 'monthly',
          currentValue: 3.82,
          targetValue: 5,
          previousDurationValue: 4,
        },
        {
          type: 'profit',
          duration: 'weekly',
          currentValue: 4690,
          targetValue: 20000,
          previousDurationValue: 4000,
        },
      ]
      return {
        code: 200,
        message: 'ok',
        data,
      }
    },
  },
  {
    url: '/mock/reports/visits',
    method: 'post',
    response: (
      options: Service.MockOption
    ): Service.MockServiceResult<ApiReport.Visit | null> => {
      const fromDate: number = options.body.fromDate
      const toDate: number = options.body.toDate
      // > 48 hours -> group by day
      // <= 48 hours -> group by hour
      // <= 1h hour -> group by minute
      // <= 5 mins -> group by second
      if (!fromDate || !toDate) {
        return {
          code: 1000,
          message: 'Invalid from date and to date',
          data: null,
        }
      }
      const timeDiff = toDate - fromDate

      let timeGroupBy: TimeGroupBy = 'day'

      if (timeDiff <= 5 * 60 * 1000) {
        timeGroupBy = 'second'
      } else if (timeDiff <= 60 * 60 * 1000) {
        timeGroupBy = 'minute'
      } else if (timeDiff <= 48 * 60 * 60 * 1000) {
        timeGroupBy = 'hour'
      } else {
        timeGroupBy = 'day'
      }

      const domesticVisitSlot: number[] = []
      const abroadVisitSlot: number[] = []

      const timeSlot: string[] = []
      // implement gap later
      if (timeGroupBy === 'second') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'seconds', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'seconds').format('DD/MM/YYYY HH:mm:ss')
          )
          domesticVisitSlot.push(mock('@integer(0,10)'))
          abroadVisitSlot.push(mock('@integer(0,10)'))
        }
      } else if (timeGroupBy === 'minute') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'minutes', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'minutes').format('DD/MM/YYYY HH:mm[:00]')
          )
          domesticVisitSlot.push(mock('@integer(10, 100)'))
          abroadVisitSlot.push(mock('@integer(10, 100)'))
        }
      } else if (timeGroupBy === 'hour') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'hours', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'hours').format('DD/MM/YYYY HH[:00]')
          )
          domesticVisitSlot.push(mock('@integer(100,1000)'))
          abroadVisitSlot.push(mock('@integer(100,1000)'))
        }
      } else {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'days', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(datetime(fromDate).add(i, 'days').format('DD/MM/YYYY'))
          domesticVisitSlot.push(mock('@integer(1000,10000)'))
          abroadVisitSlot.push(mock('@integer(1000,10000)'))
        }
      }

      return {
        code: 200,
        message: 'ok',
        data: {
          x: timeSlot,
          y: {
            domestic: domesticVisitSlot,
            abroad: abroadVisitSlot,
          },
        },
      }
    },
  },
]

export default apis
