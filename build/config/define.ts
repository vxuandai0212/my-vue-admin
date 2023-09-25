import dayjs from "dayjs"

const PROJECT_BUILD_TIME = JSON.stringify(dayjs().format("YYYY-MM-DD HH:mm:ss"))

export const viteDefine = {
  PROJECT_BUILD_TIME,
}
