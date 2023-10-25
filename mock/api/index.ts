import { MockMethod } from 'vite-plugin-mock'
import auth from './auth'
import route from './route'
import management from './management'

export default [...auth, ...route, ...management] as MockMethod[]
