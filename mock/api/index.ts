import { MockMethod } from 'vite-plugin-mock'
import auth from './auth'
import route from './route'
import management from './management'
import report from './report'

export default [...auth, ...route, ...management, ...report] as MockMethod[]
