import { mock } from 'mockjs'
import { useDatetime } from '@/composables'

const { now } = useDatetime()

interface VisitModel {
  abroadVisit: number[]
  domesticVisit: number[]
}

const TOTAL_DAY = 100

function generateRecord() {
  const records: number[] = []
  for (let i = 0; i < TOTAL_DAY; i++) {
    const randomVisitor = mock('number|100-1000')
    const randomSecond = mock('number|1-86400')
    for (let j = 0; j < randomVisitor; j++) {
      const datetime = now()
        .subtract(i, 'days')
        .subtract(randomSecond)
        .millisecond()
      records.push(datetime)
    }
  }
  return records
}

export const visitModel: VisitModel = {
  abroadVisit: generateRecord(),
  domesticVisit: generateRecord(),
}
