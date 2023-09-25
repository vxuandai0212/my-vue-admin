import ViteCompression from "vite-plugin-compression"

export const compress = (viteEnv: ImportMetaEnv) => {
  const { VITE_COMPRESS_TYPE = "gzip" } = viteEnv
  return ViteCompression({ algorithm: VITE_COMPRESS_TYPE })
}
