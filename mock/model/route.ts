import calendar from '@/router/modules/calendar'
import contact from '@/router/modules/contact'
import dashboard from '@/router/modules/dashboard'
import fileBrowser from '@/router/modules/file-browser'
import helpCenter from '@/router/modules/help-center'
import invoice from '@/router/modules/invoice'
import kanban from '@/router/modules/kanban'
import message from '@/router/modules/message'
import notification from '@/router/modules/notification'
import product from '@/router/modules/product'
import project from '@/router/modules/project'
import report from '@/router/modules/report'
import task from '@/router/modules/task'

export const homeModel: Record<Auth.RoleType, AuthRoute.LastDegreeRouteKey> = {
  super: 'dashboard',
  admin: 'project',
  user: 'task',
}

export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    calendar,
    contact,
    dashboard,
    fileBrowser,
    helpCenter,
    invoice,
    kanban,
    message,
    notification,
    product,
    project,
    report,
    task,
  ],
  admin: [
    calendar,
    contact,
    fileBrowser,
    helpCenter,
    invoice,
    kanban,
    message,
    notification,
    product,
    project,
    task,
  ],
  user: [
    calendar,
    contact,
    fileBrowser,
    helpCenter,
    invoice,
    kanban,
    message,
    notification,
    product,
    task,
  ],
}
