import { ref, reactive } from 'vue'
import type { Ref } from 'vue'
import type {
  PaginationProps,
  DataTableBaseColumn,
  DataTableSelectionColumn,
  DataTableExpandColumn,
} from 'naive-ui'
import type { TableColumnGroup } from 'naive-ui/es/data-table/src/interface'
import { useLoadingEmpty } from '@/hooks/common'
import { Service } from '@/typings/system'

type ApiFn<T = any, R = any> = (args: T) => Promise<Service.RequestResult<R>>

type GetApiFnParameters<T extends ApiFn, R = any> = T extends (
  args: infer P
) => Promise<Service.RequestResult<R>>
  ? P
  : never

type GetApiFnReturnType<T extends ApiFn, P = any> = T extends (
  args: P
) => Promise<Service.RequestResult<infer R>>
  ? R
  : never

type Transformer<TableData, Response> = (response: Response) => {
  data: TableData[]
  pageNum: number
  pageSize: number
  total: number
}

type ApiParamsUpdater<P, R> = (params: P) => R

type PagePropsOfPagination = Pick<PaginationProps, 'page' | 'pageSize'>

type CustomColumnKey<K = never> = K | 'action'

type HookTableColumn<T = Record<string, unknown>> =
  | (Omit<TableColumnGroup<T>, 'key'> & { key: CustomColumnKey<keyof T> })
  | (Omit<DataTableBaseColumn<T>, 'key'> & { key: CustomColumnKey<keyof T> })
  | DataTableSelectionColumn<T>
  | DataTableExpandColumn<T>

type HookTableConfig<TableData, Fn extends ApiFn> = {
  apiParams: GetApiFnParameters<Fn>

  transformer: Transformer<TableData, GetApiFnReturnType<Fn>>

  columns: () => HookTableColumn<TableData>[]

  apiParamsUpdater?: ApiParamsUpdater<
    GetApiFnParameters<Fn> & Partial<PagePropsOfPagination>,
    GetApiFnParameters<Fn>
  >

  pagination?: PaginationProps

  immediate?: boolean
}

export default function useHookTable<TableData, Fn extends ApiFn>(
  apiFn: Fn,
  config: HookTableConfig<TableData, Fn>
) {
  const { loading, startLoading, endLoading, empty, setEmpty } =
    useLoadingEmpty()

  const {
    apiParams,
    transformer,
    apiParamsUpdater = (p) => p,
    immediate = true,
  } = config

  const data: Ref<TableData[]> = ref([])

  function updateData(update: TableData[]) {
    data.value = update
  }

  const columns = ref(config.columns()) as Ref<HookTableColumn<TableData>[]>

  const requestParams = ref(apiParams) as Ref<
    HookTableConfig<TableData, Fn>['apiParams']
  >

  function updateRequestParamsByPagination(p: PagePropsOfPagination) {
    requestParams.value = apiParamsUpdater({ ...requestParams.value, ...p })
  }

  const pagination = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageSizes: [10, 15, 20, 25, 30],
    onChange: (page: number) => {
      pagination.page = page

      updateRequestParamsByPagination({ page })
      getData()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1

      updateRequestParamsByPagination({ pageSize })
      getData()
    },
    ...config.pagination,
  }) as PaginationProps

  function updatePagination(update: Partial<PaginationProps>) {
    Object.assign(pagination, update)

    updateRequestParamsByPagination({
      page: pagination.page,
      pageSize: pagination.pageSize,
    })
  }

  async function getData() {
    startLoading()

    const { data: apiData, error } = await apiFn(requestParams.value)

    if (!error && data) {
      const { data: tableData, pageNum, pageSize, total } = transformer(apiData)

      updateData(tableData)

      setEmpty(tableData.length === 0)

      updatePagination({ page: pageNum, pageSize, itemCount: total })
    }

    endLoading()
  }

  function reloadColumns() {
    columns.value = config.columns()
  }

  if (immediate) {
    getData()
  }

  return {
    data,
    columns,
    loading,
    empty,
    pagination,
    getData,
    updatePagination,
    reloadColumns,
  }
}
