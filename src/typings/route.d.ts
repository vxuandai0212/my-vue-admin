declare namespace AuthRoute {
  type RootRoutePath = '/'

  type NotFoundRoutePath = '/:pathMatch(.*)*'

  type RootRouteKey = PageRoute.RootRouteKey

  type NotFoundRouteKey = PageRoute.NotFoundRouteKey

  type RouteKey = PageRoute.RouteKey

  type LastDegreeRouteKey = PageRoute.LastDegreeRouteKey

  type AllRouteKey = RouteKey | RootRouteKey | NotFoundRouteKey

  type RoutePath<K extends AllRouteKey = AllRouteKey> =
    AuthRouteUtils.GetRoutePath<K>

  type RouteComponentType = 'basic' | 'blank' | 'multi' | 'self'

  interface RouteMeta<K extends AuthRoute.RoutePath> {
    title: string
    i18nTitle?: I18nType.I18nKey
    dynamicPath?: AuthRouteUtils.GetDynamicPath<K>
    singleLayout?: Extract<RouteComponentType, 'basic' | 'blank'>
    requiresAuth?: boolean
    permissions?: Auth.RoleType[]
    keepAlive?: boolean
    icon?: string
    localIcon?: string
    hide?: boolean
    href?: string
    multiTab?: boolean
    order?: number
    activeMenu?: RouteKey
    multi?: boolean
    affix?: boolean
    headerTitle?: string
    i18nHeaderTitle?: string
  }

  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        name: K
        path: AuthRouteUtils.GetRoutePath<K>
        redirect?: AuthRouteUtils.GetRoutePath
        component?: RouteComponentType
        children?: Route[]
        meta: RouteMeta<RoutePath<K>>
      } & Omit<
        import('vue-router').RouteRecordRaw,
        'name' | 'path' | 'redirect' | 'component' | 'children' | 'meta'
      >
    : never

  type RouteModule = Record<string, { default: Route }>
}

declare namespace AuthRouteUtils {
  type RouteKeySplitMark = '_'

  type RoutePathSplitMark = '/'

  type BlankString = ''

  type KeyToPath<K extends string> =
    K extends `${infer _Left}${RouteKeySplitMark}${RouteKeySplitMark}${infer _Right}`
      ? never
      : K extends `${infer Left}${RouteKeySplitMark}${infer Right}`
      ? Left extends BlankString
        ? never
        : Right extends BlankString
        ? never
        : KeyToPath<`${Left}${RoutePathSplitMark}${Right}`>
      : `${RoutePathSplitMark}${K}`

  type GetRoutePath<K extends AuthRoute.AllRouteKey = AuthRoute.AllRouteKey> =
    K extends AuthRoute.AllRouteKey
      ? K extends AuthRoute.RootRouteKey
        ? AuthRoute.RootRoutePath
        : K extends AuthRoute.NotFoundRouteKey
        ? AuthRoute.NotFoundRoutePath
        : KeyToPath<K>
      : never

  type GetFirstDegreeRouteKey<
    K extends AuthRoute.RouteKey = AuthRoute.RouteKey
  > = K extends `${infer _Left}${RouteKeySplitMark}${infer _Right}` ? never : K

  type GetFirstDegreeRouteKeyWithChildren<
    K extends AuthRoute.RouteKey = AuthRoute.RouteKey
  > = K extends `${infer Left}${RouteKeySplitMark}${infer _Right}`
    ? Left
    : never

  type SingleRouteKey = Exclude<
    GetFirstDegreeRouteKey,
    | GetFirstDegreeRouteKeyWithChildren
    | AuthRoute.RootRouteKey
    | AuthRoute.NotFoundRouteKey
  >

  type SingleRouteParentKey = `${SingleRouteKey}-parent`

  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>

  type GetDynamicPath<P extends AuthRoute.RoutePath> =
    | `${P}/:${string}`
    | `${P}/:${string}(${string})`
    | `${P}/:${string}(${string})?`
}
