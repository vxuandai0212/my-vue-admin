declare namespace UnionKey {
  type ContentType =
    | 'application/json'
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'

  type LayoutComponentType = 'basic' | 'blank'

  type LoginModule =
    | 'pwd-login'
    | 'code-login'
    | 'register'
    | 'reset-pwd'
    | 'bind-wechat'
}
