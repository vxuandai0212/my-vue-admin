declare namespace Service {
  type RequestErrorType = "axios" | "http" | "backend"

  interface RequestError {
    type: RequestErrorType
    code: string | number
    msg: string
  }

  interface BackendResultConfig {
    codeKey: string
    dataKey: string
    msgKey: string
    successCode: number | string
  }

  interface SuccessResult<T = any> {
    error: null
    data: T
  }

  interface FailedResult {
    error: RequestError
    data: null
  }

  type RequestResult<T = any> = SuccessResult<T> | FailedResult

  type MultiRequestResult<T extends any[]> = T extends [
    infer First,
    ...infer Rest
  ]
    ? [First] extends [any]
      ? Rest extends any[]
        ? [Service.RequestResult<First>, ...MultiRequestResult<Rest>]
        : [Service.RequestResult<First>]
      : Rest extends any[]
      ? MultiRequestResult<Rest>
      : []
    : []

  type ServiceAdapter<T = any, A extends any[] = any> = (...args: A) => T

  interface MockServiceResult<T = any> {
    code: string | number
    data: T
    message: string
  }

  interface MockOption {
    url: Record<string, any>
    body: Record<string, any>
    query: Record<string, any>
    headers: Record<string, any>
  }
}

declare namespace Theme {
  interface Setting {
    darkMode: boolean
    followSystemTheme: boolean
    isCustomizeDarkModeTransition: boolean
    layout: Layout
    scrollMode: UnionKey.ThemeScrollMode
    scrollModeList: Common.OptionWithKey<UnionKey.ThemeScrollMode>[]
    themeColor: string
    themeColorList: string[]
    otherColor: OtherColor
    isCustomizeInfoColor: boolean
    fixedHeaderAndTab: boolean
    showReload: boolean
    header: Header
    tab: Tab
    sider: Sider
    menu: Menu
    footer: Footer
    page: Page
  }

  interface Layout {
    minWidth: number
    mode: UnionKey.ThemeLayoutMode
    modeList: Common.OptionWithKey<UnionKey.ThemeLayoutMode>[]
  }

  interface OtherColor {
    info: string
    success: string
    warning: string
    error: string
  }

  interface Header {
    inverted: boolean
    height: number
    crumb: Crumb
  }

  interface Crumb {
    visible: boolean
    showIcon: boolean
  }

  export interface Tab {
    visible: boolean
    height: number
    mode: UnionKey.ThemeTabMode
    modeList: Common.OptionWithKey<UnionKey.ThemeTabMode>[]
    isCache: boolean
  }

  interface Sider {
    inverted: boolean
    width: number
    collapsedWidth: number
    mixWidth: number
    mixCollapsedWidth: number
    mixChildMenuWidth: number
  }

  interface Menu {
    horizontalPosition: UnionKey.ThemeHorizontalMenuPosition
    horizontalPositionList: Common.OptionWithKey<UnionKey.ThemeHorizontalMenuPosition>[]
  }

  interface Footer {
    visible: boolean
    fixed: boolean
    right: boolean
    height: number
    inverted: boolean
  }

  interface Page {
    animate: boolean
    animateMode: UnionKey.ThemeAnimateMode
    animateModeList: Common.OptionWithKey<UnionKey.ThemeAnimateMode>[]
  }
}

declare namespace App {
  interface GlobalHeaderProps {
    showLogo: boolean
    showHeaderMenu: boolean
    showMenuCollapse: boolean
  }

  type GlobalMenuOption = import("naive-ui").MenuOption & {
    key: string
    label: string
    routeName: string
    routePath: string
    icon?: () => import("vue").VNodeChild
    children?: GlobalMenuOption[]
    i18nTitle?: I18nType.I18nKey
  }

  type GlobalBreadcrumb = Omit<import("naive-ui").DropdownOption, "icon"> & {
    key: string
    label: string
    disabled: boolean
    routeName: string
    hasChildren: boolean
    icon?: import("vue").Component
    i18nTitle?: I18nType.I18nKey
    options?: (import("naive-ui/es/dropdown/src/interface").DropdownMixedOption & {
      i18nTitle?: I18nType.I18nKey
    })[]
  }

  interface GlobalTabRoute
    extends Pick<
      import("vue-router").RouteLocationNormalizedLoaded,
      "name" | "fullPath" | "meta"
    > {
    /** 滚动的位置 */
    scrollPosition: {
      left: number
      top: number
    }
  }

  interface MessageTab {
    key: number
    name: string
    badgeProps?: import("naive-ui").BadgeProps
    list: MessageList[]
  }

  interface MessageList {
    id: number
    avatar?: string
    icon?: string
    svgIcon?: string
    title: string
    date?: string
    isRead?: boolean
    description?: string
    tagTitle?: string
    tagProps?: import("naive-ui").TagProps
  }
}

declare namespace I18nType {
  type LangType = "en" | "zh-CN" | "km-KH"

  type Schema = {
    system: {
      title: string
    }
    common: {
      add: string
      addSuccess: string
      edit: string
      editSuccess: string
      delete: string
      deleteSuccess: string
      batchDelete: string
      confirm: string
      cancel: string
      pleaseCheckValue: string
      action: string
    }
    routes: {
      dashboard: {
        _value: string
        analysis: string
        workbench: string
      }
      document: {
        _value: string
        vue: string
        vite: string
        naive: string
        project: string
        "project-link": string
      }
      component: {
        _value: string
        button: string
        card: string
        table: string
      }
      plugin: {
        _value: string
        charts: {
          _value: string
          antv: string
          echarts: string
        }
        copy: string
        editor: {
          _value: string
          markdown: string
          quill: string
        }
        icon: string
        map: string
        print: string
        swiper: string
        video: string
      }
      "auth-demo": {
        _value: string
        permission: string
        super: string
      }
      function: {
        _value: string
        tab: string
      }
      exception: {
        _value: string
        "403": string
        "404": string
        "500": string
      }
      "multi-menu": {
        _value: string
        first: {
          _value: string
          second: string
          "second-new": {
            _value: string
            third: string
          }
        }
      }
      management: {
        _value: string
        auth: string
        role: string
        route: string
        user: string
      }
      about: string
    }
    layout: {
      settingDrawer: {
        title: string
        themeModeTitle: string
        darkMode: string
        layoutModelTitle: string
        systemThemeTitle: string
        pageFunctionsTitle: string
        pageViewTitle: string
        followSystemTheme: string
        isCustomizeDarkModeTransition: string
        scrollMode: string
        scrollModeList: {
          wrapper: string
          content: string
        }
        fixedHeaderAndTab: string
        header: {
          inverted: string
          height: string
          crumb: {
            visible: string
            icon: string
          }
        }
        tab: {
          visible: string
          height: string
          modeList: {
            mode: string
            chrome: string
            button: string
          }
          isCache: string
        }
        sider: {
          inverted: string
          width: string
          mixWidth: string
        }
        menu: {
          horizontalPosition: string
          horizontalPositionList: {
            flexStart: string
            center: string
            flexEnd: string
          }
        }
        footer: {
          inverted: string
          visible: string
          fixed: string
          right: string
        }
        page: {
          animate: string
          animateMode: string
          animateModeList: {
            zoomFade: string
            zoomOut: string
            fadeSlide: string
            fade: string
            fadeBottom: string
            fadeScale: string
          }
        }
        systemTheme: {
          moreColors: string
        }
        themeConfiguration: {
          title: string
          copy: string
          reset: string
          resetSuccess: string
          operateSuccess: string
          copySuccess: string
          confirmCopy: string
        }
      }
    }
    page: {
      login: {
        common: {
          userNamePlaceholder: string
          phonePlaceholder: string
          codePlaceholder: string
          passwordPlaceholder: string
          confirmPasswordPlaceholder: string
          codeLogin: string
          confirm: string
          back: string
          validateSuccess: string
          loginSuccess: string
          welcomeBack: string
        }
        pwdLogin: {
          title: string
          rememberMe: string
          forgetPassword: string
          register: string
          otherAccountLogin: string
          otherLoginMode: string
          superAdmin: string
          admin: string
          user: string
        }
        codeLogin: {
          title: string
          getCode: string
          imageCodePlaceholder: string
        }
        register: {
          title: string
          agreement: string
          protocol: string
          policy: string
        }
        resetPwd: {
          title: string
        }
        bindWeChat: {
          title: string
        }
      }
    }
  }

  type GetI18nKey<
    T extends Record<string, unknown>,
    K extends keyof T = keyof T
  > = K extends string
    ? T[K] extends Record<string, unknown>
      ? `${K}.${GetI18nKey<T[K]>}`
      : K
    : never

  type I18nKey = GetI18nKey<Schema>
}