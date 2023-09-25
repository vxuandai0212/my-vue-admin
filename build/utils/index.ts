import path from "path"

export function getRootPath() {
  return path.resolve(process.cwd())
}

export function getSrcPath(srcName = "src") {
  const rootPath = getRootPath()

  return `${rootPath}/${srcName}`
}
