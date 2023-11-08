import { LocalIcon } from './icon'

declare namespace Service {
  type RequestErrorType = 'axios' | 'http' | 'backend'

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
    themeColor: string
    themeColorList: string[]
    otherColor: OtherColor
    isCustomizeInfoColor: boolean
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

  type CustomMenuOption = {
    key: string
    label: string
    icon: LocalIcon
    i18nTitle: I18nType.I18nKey
  }

  type GlobalMenuOption = import('naive-ui').MenuOption & {
    key: string
    label: string
    routeName: string
    routePath: string
    icon?: () => import('vue').VNodeChild
    children?: GlobalMenuOption[]
    i18nTitle?: I18nType.I18nKey
  }

  type GlobalBreadcrumb = Omit<import('naive-ui').DropdownOption, 'icon'> & {
    key: string
    label: string
    disabled: boolean
    routeName: string
    hasChildren: boolean
    icon?: import('vue').Component
    i18nTitle?: I18nType.I18nKey
    options?: (import('naive-ui/es/dropdown/src/interface').DropdownMixedOption & {
      i18nTitle?: I18nType.I18nKey
    })[]
  }

  interface GlobalTabRoute
    extends Pick<
      import('vue-router').RouteLocationNormalizedLoaded,
      'name' | 'fullPath' | 'meta'
    > {
    scrollPosition: {
      left: number
      top: number
    }
  }

  interface MessageTab {
    key: number
    name: string
    badgeProps?: import('naive-ui').BadgeProps
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
    tagProps?: import('naive-ui').TagProps
  }
}

declare namespace I18nType {
  type LangType = 'en' | 'vi'

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
      logout: {
        title: string
        content: string
        confirm: string
        cancel: string
      }
      header: {
        search: {
          placeholder: string
        }
        create: {
          project: string
          task: string
          contact: string
          event: string
          product: string
          invoice: string
        }
      }
      language: {
        change: string
      }
      tab: {
        day: string
        week: string
        month: string
      }
    }
    routes: {
      dashboard: {
        _value: string
      }
      document: {
        _value: string
        vue: string
        vite: string
        naive: string
        project: string
        'project-link': string
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
      'auth-demo': {
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
        '403': string
        '404': string
        '500': string
      }
      'multi-menu': {
        _value: string
        first: {
          _value: string
          second: string
          'second-new': {
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
      calendar: {
        _value: string
        list: string
        new: string
      }
      contact: {
        _value: string
        list: string
        new: string
      }
      'file-browser': {
        _value: string
        list: string
        new: string
      }
      'help-center': {
        _value: string
        list: string
        new: string
      }
      invoice: {
        _value: string
        list: string
        new: string
      }
      kanban: {
        _value: string
        list: string
        new: string
      }
      message: {
        _value: string
        list: string
        new: string
      }
      notification: {
        _value: string
        list: string
        new: string
      }
      product: {
        _value: string
        list: string
        new: string
      }
      project: {
        _value: string
        list: string
        new: string
      }
      report: {
        _value: string
        list: string
      }
      task: {
        _value: string
        list: string
        new: string
      }
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
    button: {
      login: string
      signup: string
      send: string
    }
    page: {
      login: {
        common: {
          loginSuccess: string
          welcomeBack: string
        }
        welcome: string
        welcomeDescription: string
        loginWith: string
        form: {
          email: {
            label: string
            placeholder: string
          }
          password: {
            label: string
            placeholder: string
          }
          rememberLogin: {
            label: string
          }
          recoverPassword: {
            label: string
          }
        }
        error: {
          email: {
            required: string
          }
          password: {
            required: string
          }
        }
      }
      signup: {
        welcome: string
        welcomeDescription: string
        loginWith: string
        form: {
          fullname: {
            label: string
            placeholder: string
          }
          email: {
            label: string
            placeholder: string
          }
          password: {
            label: string
            placeholder: string
          }
          agreement: {
            label: string
          }
        }
        error: {
          fullname: {
            required: string
          }
          email: {
            required: string
          }
          password: {
            required: string
          }
        }
      }
      invoice: {
        progress: {
          title: string
          description: string
          all: string
          scheduled: string
          unpaid: string
          paid: string
          sale: string
          lead: string
          income: string
          duration: {
            week: string
            month: string
          }
        }
        tab: {
          all: string
          draft: string
          scheduled: string
          paid: string
        }
        table: {
          header: {
            number: string
            date: string
            customer: string
            status: string
            amount: string
          }
        }
        status: {
          paid: string
          scheduled: string
          unpaid: string
          pending: string
          processing: string
          finished: string
        }
        command: {
          retry: string
          edit: string
          delete: string
          view: string
        }
        detail: {
          label: string
          description: {
            _value: string
            item: string
            hour: string
            rate: string
            amount: string
            from: string
            to: string
            subtotal: string
            tax: string
            total: string
          }
          activity: string
          common: {
            button: {
              saveAndSend: string
              cancel: string
            }
            tab: {
              billTo: {
                title: string
                description: string
              }
              from: {
                title: string
                description: string
              }
              description: {
                title: string
                description: string
              }
              saveAsDraft: {
                title: string
                description: string
              }
              deleteInvoice: {
                title: string
                description: string
              }
            }
          }
          descriptionSection: {
            item: string
            remove: string
            itemDescription: {
              title: string
              placeholder: string
            }
            hour: {
              title: string
              placeholder: string
            }
            rate: {
              title: string
              placeholder: string
            }
            addNewItem: string
            subTotal: string
            tax: string
            total: string
          }
          billTo: {
            uploadImage: string
            invoiceNumber: {
              title: string
              placeholder: string
            }
            template: {
              title: string
              placeholder: string
            }
            companyName: {
              title: string
              placeholder: string
            }
            date: {
              title: string
              placeholder: string
            }
            businessAddress: {
              title: string
              placeholder: string
            }
            country: {
              title: string
              placeholder: string
            }
            city: {
              title: string
              placeholder: string
            }
            phoneNumber: {
              title: string
              placeholder: string
            }
            email: {
              title: string
              placeholder: string
            }
            taxRate: {
              title: string
              placeholder: string
            }
          }
        }
      }
      report: {
        visitChart: {
          title: string
          legend: {
            abroad: string
            domestic: string
          }
          unit: string
        }
        transportationChart: {
          title: string
          car: string
          bicycle: string
          bus: string
          train: string
          walking: string
        }
        spreadConsumptionChart: {
          title: string
          legend: {
            margarine: string
            lowfat: string
            butter: string
          }
          unit: string
        }
        smokingChart: {
          men: string
          women: string
          menSale: string
          womenSale: string
          unit: string
        }
        saleChart: {
          housing: string
          food: string
          clothing: string
          travelOrTransport: string
          entertainment: string
          luxuryGood: string
          title: string
        }
        roadTransportSpendChart: {
          italia: string
          portugal: string
          uk: string
          usa: string
          unit: string
        }
        airPollutantChart: {
          title: string
          legend: {
            transport: string
            industry: string
            airPollutant: string
            household: string
          }
          unit: string
        }
        welcome: string
        latestUpdate: {
          title: string
          itemSale: string
          newLeadCreated: string
          itemUploadComplete: string
          emailNotificationSent: string
        }
        upComingEvent: {
          title: string
        }
        popularCategory: {
          title: string
          description: string
          electronic: string
          accessory: string
          digitalGood: string
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
