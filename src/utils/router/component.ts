import type { RouteComponent } from 'vue-router'
import { BasicLayout, BlankLayout } from '@/layouts'
import { views } from '@/views'
import { isFunction } from '@/utils/common'

type Lazy<T> = () => Promise<T>

interface ModuleComponent {
  default: RouteComponent
}

type LayoutComponent = Record<
  UnionKey.LayoutComponentType,
  Lazy<ModuleComponent>
>

export function getLayoutComponent(layoutType: UnionKey.LayoutComponentType) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout,
  }
  return layoutComponent[layoutType]
}

export function getViewComponent(routeKey: AuthRoute.LastDegreeRouteKey) {
  if (!views[routeKey]) {
    throw new Error(
      `Route "${routeKey}" does not have a corresponding component file!`
    )
  }
  return setViewComponentName(views[routeKey], routeKey)
}

function setViewComponentName(
  component: RouteComponent | Lazy<ModuleComponent>,
  name: string
) {
  if (isAsyncComponent(component)) {
    return async () => {
      const result = await component()
      Object.assign(result.default, { name })
      return result
    }
  }

  Object.assign(component, { name })

  return component
}

function isAsyncComponent(
  component: RouteComponent | Lazy<ModuleComponent>
): component is Lazy<ModuleComponent> {
  return isFunction(component)
}
