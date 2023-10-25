export const REQUEST_TIMEOUT = 60 * 1000

export const ERROR_MSG_DURATION = 3 * 1000

export const DEFAULT_REQUEST_ERROR_CODE = 'DEFAULT'

export const DEFAULT_REQUEST_ERROR_MSG = 'Request Error'

export const REQUEST_TIMEOUT_CODE = 'ECONNABORTED'

export const REQUEST_TIMEOUT_MSG = 'Request Timeout'

export const NETWORK_ERROR_CODE = 'NETWORK_ERROR'

export const NETWORK_ERROR_MSG = 'Network Error'

export const ERROR_STATUS = {
  400: '400: A syntax error occurred in the request',
  401: '401: User is not authorized',
  403: '403: Server access denied',
  404: '404: The requested resource does not exist',
  405: '405: Request method is not allowed',
  408: '408: Network request timed out',
  500: '500: Server internal error',
  501: '501: The server does not implement the request function',
  502: '502: Wrong gateway',
  503: '503: Service is unvailable',
  504: '504: Gateway timeout',
  505: '505: The http version does not support this request',
  [DEFAULT_REQUEST_ERROR_CODE]: DEFAULT_REQUEST_ERROR_MSG,
}

export const NO_ERROR_MSG_CODE: (string | number)[] = []

export const REFRESH_TOKEN_CODE: (string | number)[] = [66666]
