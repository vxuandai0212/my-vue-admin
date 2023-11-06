import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'
import { Service } from '@/typings/system'
import { useDatetime } from '@/composables'
import { visitModel } from '~/mock/model'

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
      // nếu hơn 48 tiếng thì hiển thị theo ngày
      // nếu nhỏ hơn hoặc bằng 48 tiếng thì hiển thị theo giờ
      // nếu nhỏ hơn hoặc bằng 1h giờ thì hiển thị theo phút
      // nếu nhỏ hơn hoặc bằng 5 phút thì hiển thị theo giây
      if (!fromDate || !toDate) {
        return {
          code: 1000,
          message: 'Invalid from date and to date',
          data: null,
        }
      }
      const timeDiff = toDate - fromDate

      let timeGroupBy: TimeGroupBy = 'day'

      if (timeDiff <= 5 * 60) {
        timeGroupBy = 'second'
      } else if (timeDiff <= 60 * 60) {
        timeGroupBy = 'minute'
      } else if (timeDiff <= 48 * 60 * 60) {
        timeGroupBy = 'hour'
      } else {
        timeGroupBy = 'day'
      }

      const groupDomesticVisit: {
        [key: string]: number
      } = {}

      const { domesticVisit, abroadVisit } = visitModel
      for (let i = 0; domesticVisit.length; i++) {
        const unix = domesticVisit[i]
        if (!(unix in groupDomesticVisit)) {
          groupDomesticVisit[unix] = 0
        } else {
          groupDomesticVisit[unix]++
        }
      }

      const groupAbroadVisit: {
        [key: string]: number
      } = {}

      for (let i = 0; abroadVisit.length; i++) {
        const unix = abroadVisit[i]
        if (!(unix in groupAbroadVisit)) {
          groupAbroadVisit[unix] = 0
        } else {
          groupAbroadVisit[unix]++
        }
      }

      const domesticVisitSlot: number[] = []
      const abroadVisitSlot: number[] = []

      const timeSlot: string[] = []
      // implement gap later
      if (timeGroupBy === 'second') {
        for (let i = fromDate; i <= toDate; i++) {
          timeSlot.push(datetime(i).format('DD/MM/YYYY HH:mm:ss'))
          if (i in groupDomesticVisit) {
            domesticVisitSlot.push(groupDomesticVisit[i])
          } else {
            domesticVisitSlot.push(0)
          }
          if (i in abroadVisitSlot) {
            abroadVisitSlot.push(groupAbroadVisit[i])
          } else {
            abroadVisitSlot.push(0)
          }
        }
      } else if (timeGroupBy === 'minute') {
        const fromMinute = datetime(
          datetime(fromDate).format('DD/MM/YYYY HH:mm[:00]')
        ).second()
        const toMinute = datetime(
          datetime(toDate).format('DD/MM/YYYY HH:mm[:00]')
        ).second()
        for (let i = fromMinute; i <= toMinute; i += 60) {
          timeSlot.push(datetime(i).format('DD/MM/YYYY HH:mm[:00]'))
          domesticVisitSlot.push(reduceTime(i, i + 59, groupDomesticVisit))
          abroadVisitSlot.push(reduceTime(i, i + 59, groupAbroadVisit))
        }
      } else if (timeGroupBy === 'hour') {
        const fromHour = datetime(
          datetime(fromDate).format('DD/MM/YYYY HH[:00]')
        ).second()
        const toHour = datetime(
          datetime(toDate).format('DD/MM/YYYY HH[:00]')
        ).second()
        for (let i = fromHour; i <= toHour; i += 3600) {
          timeSlot.push(datetime(i).format('DD/MM/YYYY HH[:00]'))
          domesticVisitSlot.push(reduceTime(i, i + 3599, groupDomesticVisit))
          abroadVisitSlot.push(reduceTime(i, i + 3599, groupAbroadVisit))
        }
      } else {
        const fromDay = datetime(
          datetime(fromDate).format('DD/MM/YYYY')
        ).second()
        const toDay = datetime(datetime(toDate).format('DD/MM/YYYY')).second()
        for (let i = fromDay; i <= toDay; i += 86400) {
          timeSlot.push(datetime(i).format('DD/MM/YYYY'))
          domesticVisitSlot.push(reduceTime(i, i + 86399, groupDomesticVisit))
          abroadVisitSlot.push(reduceTime(i, i + 86399, groupAbroadVisit))
        }
      }

      const data = {
        x: timeSlot,
        y: {
          domestic: domesticVisitSlot,
          abroad: abroadVisitSlot,
        },
      }

      return {
        code: 200,
        message: 'ok',
        data,
      }
    },
  },
]

function reduceTime(
  from: number,
  to: number,
  object: {
    [key: string]: number
  } = {}
) {
  let count = 0
  for (let i = from; i <= to; i++) {
    if (i in object) {
      count += object[i]
    }
  }
  return count
}

export default apis
