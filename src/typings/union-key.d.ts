declare namespace UnionKey {
  type ContentType =
    | "application/json"
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"

  type LayoutComponentType = "basic" | "blank"

  type LoginModule =
    | "pwd-login"
    | "code-login"
    | "register"
    | "reset-pwd"
    | "bind-wechat"

  type ThemeLayoutMode =
    | "vertical"
    | "horizontal"
    | "vertical-mix"
    | "horizontal-mix"

  type ThemeScrollMode = "wrapper" | "content"

  type ThemeTabMode = "chrome" | "button"

  type ThemeHorizontalMenuPosition = "flex-start" | "center" | "flex-end"

  type ThemeAnimateMode =
    | "zoom-fade"
    | "zoom-out"
    | "fade-slide"
    | "fade"
    | "fade-bottom"
    | "fade-scale"
}
