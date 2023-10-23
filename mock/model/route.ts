import calendar from '~/src/router/modules/calendar'
import contact from '~/src/router/modules/contact'
import dashboard from '~/src/router/modules/dashboard'
import fileBrowser from '~/src/router/modules/file-browser'
import helpCenter from '~/src/router/modules/help-center'
import invoice from '~/src/router/modules/invoice'
import kanban from '~/src/router/modules/kanban'
import message from '~/src/router/modules/message'
import notification from '~/src/router/modules/notification'
import product from '~/src/router/modules/product'
import project from '~/src/router/modules/project'
import report from '~/src/router/modules/report'
import task from '~/src/router/modules/task'

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
