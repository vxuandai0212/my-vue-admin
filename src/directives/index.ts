import type { App } from 'vue'
import setupNetworkDirective from './network'
import setupLoginDirective from './login'
import setupPermissionDirective from './permission'

export function setupDirectives(app: App) {
  setupNetworkDirective(app)
  setupLoginDirective(app)
  setupPermissionDirective(app)
}
