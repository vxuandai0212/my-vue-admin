type ServiceEnv = Record<ServiceEnvType, ServiceEnvConfig>

const serviceEnv: ServiceEnv = {
  dev: {
    url: "http://localhost:8080",
  },
  test: {
    url: "http://localhost:8080",
  },
  prod: {
    url: "http://localhost:8080",
  },
}

export function getServiceEnvConfig(
  env: ImportMetaEnv
): ServiceEnvConfigWithProxyPattern {
  const { VITE_SERVICE_ENV = "dev" } = env
  const config = serviceEnv[VITE_SERVICE_ENV]
  return {
    ...config,
    proxyPattern: "/proxy-pattern",
  }
}
