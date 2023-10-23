import type { RouteComponent } from 'vue-router'

export const views: Record<
  PageRoute.LastDegreeRouteKey,
  RouteComponent | (() => Promise<{ default: RouteComponent }>)
> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  login: () => import('@/views/authentication/login/index.vue'),
  signup: () => import('@/views/authentication/signup/index.vue'),
  dashboard: () => import('@/views/report/index.vue'),
  project: () => import('@/views/invoice/list/index.vue'),
  project_new: () => import('@/views/invoice/new/index.vue'),
  task: () => import('@/views/invoice/list/index.vue'),
  task_new: () => import('@/views/invoice/new/index.vue'),
  kanban: () => import('@/views/invoice/list/index.vue'),
  kanban_new: () => import('@/views/invoice/new/index.vue'),
  calendar: () => import('@/views/invoice/list/index.vue'),
  calendar_new: () => import('@/views/invoice/new/index.vue'),
  contact: () => import('@/views/invoice/list/index.vue'),
  contact_new: () => import('@/views/invoice/new/index.vue'),
  message: () => import('@/views/invoice/list/index.vue'),
  message_new: () => import('@/views/invoice/new/index.vue'),
  product: () => import('@/views/invoice/list/index.vue'),
  product_new: () => import('@/views/invoice/new/index.vue'),
  invoice: () => import('@/views/invoice/list/index.vue'),
  invoice_new: () => import('@/views/invoice/new/index.vue'),
  'file-browser': () => import('@/views/invoice/list/index.vue'),
  'file-browser_new': () => import('@/views/invoice/new/index.vue'),
  notification: () => import('@/views/invoice/list/index.vue'),
  notification_new: () => import('@/views/invoice/new/index.vue'),
  report: () => import('@/views/report/index.vue'),
  'help-center': () => import('@/views/invoice/list/index.vue'),
  'help-center_new': () => import('@/views/invoice/new/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
}
