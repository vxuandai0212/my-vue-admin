import { MockMethod } from 'vite-plugin-mock'
import auth from './auth'
import route from './route'
import invoice from './invoice'
import report from './report'

export default [...auth, ...route, ...invoice, ...report] as MockMethod[]
