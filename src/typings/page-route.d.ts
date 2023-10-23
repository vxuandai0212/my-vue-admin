declare namespace PageRoute {
  type RootRouteKey = 'root'

  type NotFoundRouteKey = 'not-found'

  type RouteKey =
    | '403'
    | '404'
    | 'login'
    | 'signup'
    | 'dashboard'
    | 'project'
    | 'project_new'
    | 'task'
    | 'task_new'
    | 'kanban'
    | 'kanban_new'
    | 'calendar'
    | 'calendar_new'
    | 'contact'
    | 'contact_new'
    | 'message'
    | 'message_new'
    | 'product'
    | 'product_new'
    | 'invoice'
    | 'invoice_new'
    | 'file-browser'
    | 'file-browser_new'
    | 'notification'
    | 'notification_new'
    | 'report'
    | 'help-center'
    | 'help-center_new'
    | 'not-found'

  type LastDegreeRouteKey = Extract<
    RouteKey,
    | '403'
    | '404'
    | 'login'
    | 'signup'
    | 'dashboard'
    | 'project'
    | 'project_new'
    | 'task'
    | 'task_new'
    | 'kanban'
    | 'kanban_new'
    | 'calendar'
    | 'calendar_new'
    | 'contact'
    | 'contact_new'
    | 'message'
    | 'message_new'
    | 'product'
    | 'product_new'
    | 'invoice'
    | 'invoice_new'
    | 'file-browser'
    | 'file-browser_new'
    | 'notification'
    | 'notification_new'
    | 'report'
    | 'help-center'
    | 'help-center_new'
    | 'not-found'
  >
}
