import type { MockMethod } from 'vite-plugin-mock'
import { mock } from 'mockjs'
import { Service } from '@/typings/system'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/vi'
import { reduce } from 'lodash-es'

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

function getTimeGroupBy(fromDate: number, toDate: number): TimeGroupBy {
  // >  48 hours -> group by day
  // <= 48 hours -> group by hour
  // <= 1h hour  -> group by minute
  // <= 5 mins   -> group by second

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
  return timeGroupBy
}

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
          value: now().subtract(30, 'minutes').valueOf(),
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
          value: now().subtract(45, 'minutes').valueOf(),
        },
        {
          id: mock('@id'),
          type: 'email-notification-sent',
          value: now().subtract(2, 'hours').valueOf(),
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
          startAt: now().subtract(20, 'minutes').valueOf(),
        },
        {
          id: mock('@id'),
          title: 'New project discussion',
          description: 'Business Cards Does Your Business',
          startAt: now().subtract(45, 'minutes').subtract(6, 'hours').valueOf(),
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
          currentValue: 2,
          targetValue: 5,
          previousDurationValue: 3,
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

      if (!fromDate || !toDate) {
        return {
          code: 1000,
          message: 'Invalid from date and to date',
          data: null,
        }
      }

      const timeGroupBy = getTimeGroupBy(fromDate, toDate)

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
  {
    url: '/mock/reports/spread-consumption',
    method: 'post',
    response: (
      options: Service.MockOption
    ): Service.MockServiceResult<ApiReport.SpreadConsumption | null> => {
      const fromDate: number = options.body.fromDate
      const toDate: number = options.body.toDate

      if (!fromDate || !toDate) {
        return {
          code: 1000,
          message: 'Invalid from date and to date',
          data: null,
        }
      }

      const timeGroupBy = getTimeGroupBy(fromDate, toDate)

      const margarineSlot: number[] = []
      const lowfatSlot: number[] = []
      const butterSlot: number[] = []

      const timeSlot: string[] = []
      // implement gap later
      if (timeGroupBy === 'second') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'seconds', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'seconds').format('DD/MM/YYYY HH:mm:ss')
          )
          margarineSlot.push(mock('@integer(0,180)'))
          lowfatSlot.push(mock('@integer(0,180)'))
          butterSlot.push(mock('@integer(0,180)'))
        }
      } else if (timeGroupBy === 'minute') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'minutes', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'minutes').format('DD/MM/YYYY HH:mm[:00]')
          )
          margarineSlot.push(mock('@integer(0,180)'))
          lowfatSlot.push(mock('@integer(0,180)'))
          butterSlot.push(mock('@integer(0,180)'))
        }
      } else if (timeGroupBy === 'hour') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'hours', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'hours').format('DD/MM/YYYY HH[:00]')
          )
          margarineSlot.push(mock('@integer(0,180)'))
          lowfatSlot.push(mock('@integer(0,180)'))
          butterSlot.push(mock('@integer(0,180)'))
        }
      } else {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'days', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(datetime(fromDate).add(i, 'days').format('DD/MM/YYYY'))
          margarineSlot.push(mock('@integer(0,180)'))
          lowfatSlot.push(mock('@integer(0,180)'))
          butterSlot.push(mock('@integer(0,180)'))
        }
      }

      return {
        code: 200,
        message: 'ok',
        data: {
          x: timeSlot,
          y: {
            margarine: margarineSlot,
            lowfat: lowfatSlot,
            butter: butterSlot,
          },
        },
      }
    },
  },
  {
    url: '/mock/reports/air-pollutant',
    method: 'post',
    response: (
      options: Service.MockOption
    ): Service.MockServiceResult<ApiReport.AirPollutant | null> => {
      const fromDate: number = options.body.fromDate
      const toDate: number = options.body.toDate

      if (!fromDate || !toDate) {
        return {
          code: 1000,
          message: 'Invalid from date and to date',
          data: null,
        }
      }

      const timeGroupBy = getTimeGroupBy(fromDate, toDate)

      const transportSlot: number[] = []
      const industrySlot: number[] = []
      const airPollutantSlot: number[] = []
      const householdSlot: number[] = []

      const timeSlot: string[] = []
      // implement gap later
      if (timeGroupBy === 'second') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'seconds', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'seconds').format('DD/MM/YYYY HH:mm:ss')
          )
          transportSlot.push(mock('@integer(10000,8000000000)'))
          industrySlot.push(mock('@integer(10000,8000000000)'))
          airPollutantSlot.push(mock('@integer(10000,8000000000)'))
          householdSlot.push(mock('@integer(10000,8000000000)'))
        }
      } else if (timeGroupBy === 'minute') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'minutes', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'minutes').format('DD/MM/YYYY HH:mm[:00]')
          )
          transportSlot.push(mock('@integer(10000,8000000000)'))
          industrySlot.push(mock('@integer(10000,8000000000)'))
          airPollutantSlot.push(mock('@integer(10000,8000000000)'))
          householdSlot.push(mock('@integer(10000,8000000000)'))
        }
      } else if (timeGroupBy === 'hour') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'hours', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'hours').format('DD/MM/YYYY HH[:00]')
          )
          transportSlot.push(mock('@integer(10000,8000000000)'))
          industrySlot.push(mock('@integer(10000,8000000000)'))
          airPollutantSlot.push(mock('@integer(10000,8000000000)'))
          householdSlot.push(mock('@integer(10000,8000000000)'))
        }
      } else {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'days', true))
        for (let i = 0; i < diff; i++) {
          transportSlot.push(mock('@integer(10000,8000000000)'))
          industrySlot.push(mock('@integer(10000,8000000000)'))
          airPollutantSlot.push(mock('@integer(10000,8000000000)'))
          householdSlot.push(mock('@integer(10000,8000000000)'))
        }
      }

      return {
        code: 200,
        message: 'ok',
        data: {
          x: timeSlot,
          y: {
            transport: transportSlot,
            industry: industrySlot,
            airPollutant: airPollutantSlot,
            household: householdSlot,
          },
        },
      }
    },
  },
  {
    url: '/mock/reports/smoking',
    method: 'post',
    response: (
      options: Service.MockOption
    ): Service.MockServiceResult<ApiReport.Smoking | null> => {
      const fromDate: number = options.body.fromDate
      const toDate: number = options.body.toDate

      if (!fromDate || !toDate) {
        return {
          code: 1000,
          message: 'Invalid from date and to date',
          data: null,
        }
      }

      const timeGroupBy = getTimeGroupBy(fromDate, toDate)

      const menSlot: number[] = []
      const womenSlot: number[] = []

      const timeSlot: string[] = []
      // implement gap later
      if (timeGroupBy === 'second') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'seconds', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'seconds').format('DD/MM/YYYY HH:mm:ss')
          )
          menSlot.push(mock('@integer(80000,700000)'))
          womenSlot.push(mock('@integer(80000,700000)'))
        }
      } else if (timeGroupBy === 'minute') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'minutes', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'minutes').format('DD/MM/YYYY HH:mm[:00]')
          )
          menSlot.push(mock('@integer(80000,700000)'))
          womenSlot.push(mock('@integer(80000,700000)'))
        }
      } else if (timeGroupBy === 'hour') {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'hours', true))
        for (let i = 0; i < diff; i++) {
          timeSlot.push(
            datetime(fromDate).add(i, 'hours').format('DD/MM/YYYY HH[:00]')
          )
          menSlot.push(mock('@integer(80000,700000)'))
          womenSlot.push(mock('@integer(80000,700000)'))
        }
      } else {
        const diff = Math.ceil(dayjs(toDate).diff(fromDate, 'days', true))
        for (let i = 0; i < diff; i++) {
          menSlot.push(mock('@integer(80000,700000)'))
          womenSlot.push(mock('@integer(80000,700000)'))
        }
      }

      return {
        code: 200,
        message: 'ok',
        data: {
          x: timeSlot,
          y: {
            men: menSlot,
            women: womenSlot,
          },
          totalMen: reduce(menSlot, (sum, n) => sum + n, 0),
          totalWomen: reduce(womenSlot, (sum, n) => sum + n, 0),
        },
      }
    },
  },
  {
    url: '/mock/reports/road-transport-spend',
    method: 'post',
    response:
      (): Service.MockServiceResult<ApiReport.RoadTransportSpend | null> => {
        return {
          code: 200,
          message: 'ok',
          data: {
            dimensions: ['country', '1990', '1995', '2000', '2005'],
            source: [
              { country: 'italia', 1990: 22, 1995: 20, 2000: 23, 2005: 19 },
              { country: 'portugal', 1990: 27, 1995: 24, 2000: 22, 2005: 20 },
              { country: 'uk', 1990: 10, 1995: 9, 2000: 12, 2005: 7 },
              { country: 'usa', 1990: 11, 1995: 10, 2000: 13, 2005: 15 },
            ],
          },
        }
      },
  },
  {
    url: '/mock/reports/sales',
    method: 'post',
    response: (): Service.MockServiceResult<ApiReport.Sale | null> => {
      const housing = mock('@integer(20,30)')
      const food = mock('@integer(20,25)')
      const clothing = mock('@integer(10,20)')
      const travelOrTransport = mock('@integer(5,15)')
      const entertainment = mock('@integer(5,10)')
      const luxuryGood =
        100 - housing - food - clothing - travelOrTransport - entertainment
      return {
        code: 200,
        message: 'ok',
        data: {
          dimensions: [
            'housing',
            'food',
            'clothing',
            'travelOrTransport',
            'entertainment',
            'luxuryGood',
          ],
          source: [
            housing,
            food,
            clothing,
            travelOrTransport,
            entertainment,
            luxuryGood,
          ],
        },
      }
    },
  },
  {
    url: '/mock/reports/transportations',
    method: 'post',
    response: (): Service.MockServiceResult<
      ApiReport.Transportation[] | null
    > => {
      const car = mock('@integer(20,30)')
      const bicycle = mock('@integer(20,25)')
      const bus = mock('@integer(10,20)')
      const train = mock('@integer(5,15)')
      const walking = 100 - car - bicycle - bus - train
      return {
        code: 200,
        message: 'ok',
        data: [
          { name: 'car', value: car },
          { name: 'bicycle', value: bicycle },
          { name: 'bus', value: bus },
          { name: 'train', value: train },
          { name: 'walking', value: walking },
        ],
      }
    },
  },
]

export default apis
