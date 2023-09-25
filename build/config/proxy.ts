import type { ProxyOptions } from "vite"

export function createViteProxy(
  isOpenProxy: boolean,
  envConfig: ServiceEnvConfigWithProxyPattern
) {
  if (!isOpenProxy) return undefined

  const proxy: Record<string, string | ProxyOptions> = {
    [envConfig.proxyPattern]: {
      target: envConfig.url,
      changeOrigin: true,
      rewrite: (path) =>
        path.replace(new RegExp(`^${envConfig.proxyPattern}`), ""),
    },
  }

  return proxy
}
